from app.schemas.agent_outputs import ResearchPlan, IdeaAnalysis
from app.utils.llm_utils import invoke_structured_llm


def generate_research_plan(
    startup_idea: str,
    idea_analysis: IdeaAnalysis | dict,
    target_country: str,
    target_region: str,
) -> ResearchPlan:
    """
    Creates a customized, business-model-specific research agenda.
    Marketplaces query supply/demand/liquidity.
    SaaS queries CAC/LTV/churn/competitors.
    D2C queries COGS/margins/repeat purchase.
    Fintech queries regulatory/KYC/trust.
    """
    if isinstance(idea_analysis, dict):
        idea_dict = idea_analysis
    else:
        idea_dict = idea_analysis.model_dump()

    primary_category = idea_dict.get("primary_category", "SaaS")
    problem = idea_dict.get("problem_statement", "")
    solution = idea_dict.get("proposed_solution", "")
    customer = idea_dict.get("target_customer", "")
    business_model = idea_dict.get("business_model", "")

    country = target_country.strip() or "Global"
    if country.lower() == "global":
        location = "Global"
    else:
        location = country
        if target_region.strip():
            location += f", {target_region.strip()}"

    system_prompt = (
        "You are an expert startup research strategist. "
        "Create a rigorous, model-specific research plan tailored to this startup concept. "
        "Never generate generic identical questions for every startup. "
        "Return ONLY valid structured JSON."
    )

    user_prompt = f"""
STARTUP CONCEPT:
{startup_idea}

LOCATION:
{location}

BUSINESS MODEL ARCHETYPE:
{primary_category} ({business_model})

PROBLEM:
{problem}

PROPOSED SOLUTION:
{solution}

TARGET CUSTOMER:
{customer}

TASK:
Develop a tailored Research Plan covering:
- business_model_type (e.g. Marketplace, B2B SaaS, D2C, Consumer App, Fintech, AI Tool, etc.)
- required_information (5-7 model-specific topics, e.g. liquidity/take-rate for marketplaces, CAC/LTV for SaaS, COGS/gross-margin for D2C)
- key_questions_to_answer (4-5 crucial business questions)
- market_queries (3 targeted search queries for market size & demand)
- competitor_queries (3 search queries to find direct competitors, indirect alternatives, and manual substitutes)
- pricing_queries (2 search queries for pricing & monetizability)
- regulatory_queries (2 search queries for legal/regulatory/compliance risks, or 'None' if non-regulated)

RULES:
- Make queries specific to {location} and the specific startup domain.
- Do not use generic placeholder text.
- Include query keywords for direct competitors, indirect competitors, and substitutes.
- Return ONLY valid structured output.
"""

    return invoke_structured_llm(
        model_cls=ResearchPlan,
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        max_tokens=1536,
        response_mode="json_object",
    )
