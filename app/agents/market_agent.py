from app.schemas.agent_outputs import MarketResearch
from app.tools.web_search import search_web
from app.rag.retriever import (
    retrieve_documents,
    format_retrieved_documents,
)
from app.utils.llm_utils import invoke_structured_llm


def research_market(
    startup_idea: str,
    idea_analysis: dict,
    target_country: str,
    target_region: str,
    research_plan: dict | None = None,
) -> MarketResearch:

    country = target_country.strip() or "Global"
    is_global = country.lower() == "global"
    if is_global:
        location = "Global"
    else:
        location = country
        if target_region.strip():
            location += f", {target_region.strip()}"

    # -----------------------------------------------------
    # 1. RAG research
    # -----------------------------------------------------

    rag_query = f"""
Evaluate the market opportunity for:

{startup_idea}

Target market: {location}

Focus on:
market demand, customer need, market opportunity,
industry trends, and growth drivers.
"""

    rag_documents = retrieve_documents(
        query=rag_query,
        k=3,
    )

    rag_context = format_retrieved_documents(
        rag_documents
    )

    rag_context = rag_context[:2500]

    # -----------------------------------------------------
    # 2. Current web research using research plan queries if available
    # -----------------------------------------------------

    market_queries = []
    if research_plan and isinstance(research_plan, dict):
        market_queries = research_plan.get("market_queries", [])

    if not market_queries:
        if is_global:
            market_queries = [
                f"{startup_idea} global market demand industry trends",
                f"{idea_analysis.get('problem_statement', startup_idea)} global market size growth"
            ]
        else:
            market_queries = [
                f"{startup_idea} market demand industry trends in {location}",
                f"{idea_analysis.get('problem_statement', startup_idea)} customer demand growth in {location}"
            ]

    search_results = []
    for query in market_queries[:2]:
        try:
            res = search_web(query, max_results=2)
            search_results.extend(res)
        except Exception as exc:
            print(f"[MARKET SEARCH ERROR] {query}: {exc}")

    web_items = []
    seen_urls = set()
    for result in search_results:
        url = result.get("url", "")
        if url in seen_urls:
            continue
        seen_urls.add(url)
        web_items.append(
            f"Title: {result.get('title', '')}\n"
            f"URL: {url}\n"
            f"Content: {result.get('content', '')[:700]}"
        )

    web_context = "\n\n".join(web_items)

    # -----------------------------------------------------
    # 3. Compact previous-agent context
    # -----------------------------------------------------

    idea_context = {
        "problem": idea_analysis.get("problem_statement", idea_analysis.get("problem", "")),
        "solution": idea_analysis.get("proposed_solution", ""),
        "industry": idea_analysis.get("target_industry", ""),
        "customer": idea_analysis.get("target_customer", ""),
        "business_model": idea_analysis.get("business_model", ""),
        "value_proposition": idea_analysis.get("key_value_proposition", ""),
    }

    # -----------------------------------------------------
    # 4. Structured LLM prompt
    # -----------------------------------------------------

    system_prompt = (
        "You are a startup market research expert. "
        "Analyze the target market using the supplied startup information and research. "
        "NEVER invent market statistics, facts, or fake citations. "
        "If evidence is unavailable, state 'Insufficient evidence'. "
        "Return ONLY valid JSON."
    )

    user_prompt = f"""
STARTUP:
{startup_idea}

TARGET MARKET:
{location}

IDEA ANALYSIS:
{idea_context}

RAG RESEARCH:
{rag_context}

WEB RESEARCH:
{web_context}

Return these seven fields:

market_demand
industry_trends
target_market
growth_drivers
customer_problems
opportunities
evidence

Rules:
- market_demand must be a concise assessment based strictly on supplied research.
- industry_trends must be a short list.
- target_market must describe the target customers.
- growth_drivers must be a short list.
- customer_problems must be a short list.
- opportunities must be a short list.
- evidence must contain concise claims and genuine sources from the research.
- Use only information supported by the supplied research.
- Do not invent statistics. Do not invent companies. Do not invent sources.
- Return ALL seven fields.
"""

    return invoke_structured_llm(
        model_cls=MarketResearch,
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        max_tokens=4096,
    )