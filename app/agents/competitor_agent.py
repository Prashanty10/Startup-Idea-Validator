from app.schemas.agent_outputs import CompetitorAnalysis
from app.tools.web_search import search_web
from app.utils.llm_utils import invoke_structured_llm


def analyze_competitors(
    startup_idea: str,
    idea_analysis: dict,
    market_research: dict,
    target_country: str,
    target_region: str,
    research_plan: dict | None = None,
) -> CompetitorAnalysis:

    country = target_country.strip() or "Global"
    is_global = country.lower() == "global"
    if is_global:
        location = "Global"
    else:
        location = country
        if target_region.strip():
            location += f", {target_region.strip()}"

    # -----------------------------------------------------
    # 1. Web research for direct competitors, indirect competitors, and substitutes
    # -----------------------------------------------------

    competitor_queries = []
    if research_plan and isinstance(research_plan, dict):
        competitor_queries = research_plan.get("competitor_queries", [])

    if not competitor_queries:
        if is_global:
            competitor_queries = [
                f"{startup_idea} direct competitors companies global market",
                f"{idea_analysis.get('problem_statement', startup_idea)} software alternatives substitutes global market"
            ]
        else:
            competitor_queries = [
                f"{startup_idea} direct competitors companies {location}",
                f"{idea_analysis.get('problem_statement', startup_idea)} software alternatives substitutes {location}"
            ]

    search_results = []
    for query in competitor_queries[:3]:
        try:
            res = search_web(query, max_results=2)
            search_results.extend(res)
        except Exception as exc:
            print(f"[COMPETITOR SEARCH ERROR] {query}: {exc}")

    research_items = []
    seen_urls = set()

    for result in search_results:
        url = str(result.get("url", "")).strip()
        if url in seen_urls:
            continue
        seen_urls.add(url)

        title = str(result.get("title", "")).strip()
        content = str(result.get("content", "")).strip()
        if len(content) > 500:
            content = content[:500]

        research_items.append(
            f"TITLE: {title}\n"
            f"URL: {url}\n"
            f"CONTENT: {content}"
        )

    research_context = "\n\n".join(research_items)

    # -----------------------------------------------------
    # 2. Previous agent context
    # -----------------------------------------------------

    target_customer = idea_analysis.get("target_customer", "")
    target_industry = idea_analysis.get("target_industry", "")
    business_model = idea_analysis.get("business_model", "")
    target_market = market_research.get("target_market", "")

    # -----------------------------------------------------
    # 3. Structured LLM call
    # -----------------------------------------------------

    system_prompt = (
        "You are a senior competitive intelligence analyst. "
        "Categorize competitors strictly into DIRECT, INDIRECT, and SUBSTITUTES. "
        "Use ONLY real companies present in the supplied research or widely verified. "
        "NEVER invent competitors, fake URLs, or fake pricing. "
        "If pricing is not explicitly stated in research, set pricing to 'Unknown / insufficient evidence'. "
        "Return ONLY valid JSON."
    )

    user_prompt = f"""
STARTUP CONCEPT:
{startup_idea}

LOCATION:
{location}

TARGET CUSTOMER:
{target_customer}

INDUSTRY:
{target_industry}

BUSINESS MODEL:
{business_model}

TARGET MARKET:
{target_market}

WEB RESEARCH:
{research_context}

TASK:
Analyze competitors and return a CompetitorAnalysis object:

1. direct_competitors (List of Competitor objects):
   - name: Real competitor name supported by research.
   - competitor_type: "DIRECT"
   - product: Product description.
   - pricing: Exact pricing if known, else "Unknown / insufficient evidence".
   - target_customer: Customer segment.
   - strengths: List of strengths.
   - weaknesses: List of weaknesses.
   - differentiation: How the startup differentiates.
   - evidence: Reference URL or quote snippet.

2. indirect_competitors (List of Competitor objects with competitor_type: "INDIRECT"):
   - Competitors offering a different product that solves a similar problem.

3. substitutes (List of Competitor objects with competitor_type: "SUBSTITUTE"):
   - Existing status-quo workarounds, manual processes, spreadsheets, or traditional methods.

4. competitor_list: Combined list of all identified direct, indirect, and substitute competitors.

5. market_gaps: Concise list of unserved market gaps.

6. competitive_risks: Major competitive risks.

7. differentiation_clarity: High, Moderate, or Weak.

RULES:
- Do NOT invent fake competitors or fake pricing.
- If no direct competitors are found in research, return an empty direct_competitors list and rely on substitutes. State 'No direct competitors found in research' rather than inventing one.
- Return ONLY valid structured output.
"""

    return invoke_structured_llm(
        model_cls=CompetitorAnalysis,
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        max_tokens=4096,
        response_mode="json_object",
    )