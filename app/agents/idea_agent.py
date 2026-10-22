from app.schemas.agent_outputs import IdeaAnalysis
from app.utils.llm_utils import invoke_structured_llm


def analyze_startup_idea(
    startup_idea: str,
) -> IdeaAnalysis:
    """
    Transforms raw startup idea text into a structured, model-classified representation.
    Extracts name, one-liner, problem, solution, user vs buyer, geography, category,
    business model, revenue model, assumptions, and critical unknowns.
    """
    system_prompt = (
        "You are an expert startup analyst. "
        "Analyze the provided startup concept and convert it into a structured business model representation. "
        "Do not force an incorrect category. Identify the primary category accurately (SaaS, marketplace, consumer app, B2B, B2C, D2C, fintech, healthtech, edtech, hardware, services, AI startup, platform, etc.). "
        "Never invent details not present in the concept. If a detail is missing, state 'Not specified'. "
        "Return ONLY valid structured output."
    )

    user_prompt = f"""
STARTUP IDEA:
{startup_idea}

Extract and structure:
- startup_name (Concise brand or project name)
- one_line_description (One clear sentence summary)
- problem_statement (Specific problem being solved)
- proposed_solution (Core product/service offering)
- target_industry (Domain or industry sector)
- target_customer (Overall target customer segment)
- primary_user (The end user of the product)
- buyer (The decision maker who pays for the product)
- beneficiary (Who ultimately benefits)
- geography (Target city/state/country)
- primary_category (Choose the best fit: SaaS, marketplace, consumer app, B2B, B2C, D2C, fintech, healthtech, edtech, hardware, services, AI startup, platform)
- secondary_categories (List of up to 2 other applicable model types)
- business_model (Core business model pattern, e.g. Subscription, Commission, Pay-per-use)
- revenue_model (How money is earned)
- key_value_proposition (Primary customer benefit)
- acquisition_channels (1-3 likely channels to reach buyers)
- key_assumptions (Top 3 unproven assumptions required for success)
- critical_unknowns (Top 3 unanswered questions at this early stage)

RULES:
- Be concise and objective.
- Return ONLY valid structured output.
"""

    return invoke_structured_llm(
        model_cls=IdeaAnalysis,
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        max_tokens=1536,
        response_mode="json_object",
    )