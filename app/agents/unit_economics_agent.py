from app.schemas.agent_outputs import UnitEconomics
from app.utils.llm_utils import invoke_structured_llm


def analyze_unit_economics(
    startup_idea: str,
    idea_analysis: dict,
    pricing_analysis: dict,
    competitor_analysis: dict,
    target_country: str,
) -> UnitEconomics:
    """
    Evaluates unit economics for the startup.
    When inputs (CAC, LTV, Gross Margin, Churn) are unavailable, IT MUST NOT INVENT THEM.
    It returns 'Unknown — requires validation' and provides actionable validation steps.
    """
    primary_category = idea_analysis.get("primary_category", "SaaS")
    business_model = idea_analysis.get("business_model", "")
    price = pricing_analysis.get("recommended_price", "")

    system_prompt = (
        "You are a startup financial modeling analyst. "
        "Calculate or estimate unit economics framework metrics based STRICTLY on available data. "
        "CRITICAL RULE: If a metric (such as exact CAC, LTV, payback period, gross margin) cannot be proven from evidence, "
        "set its string value to 'Unknown — requires validation'. NEVER hardcode fake numbers or pretend you know exact CAC/LTV without proof. "
        "Return ONLY valid JSON."
    )

    user_prompt = f"""
STARTUP CONCEPT:
{startup_idea}

CATEGORY:
{primary_category}

BUSINESS MODEL:
{business_model}

RECOMMENDED PRICING:
{price}

PRICING TIERS:
{pricing_analysis.get('pricing_tiers', [])}

COUNTRY:
{target_country}

TASK:
Produce a UnitEconomics evaluation:
- is_applicable (true/false)
- business_model_type (e.g. SaaS, Marketplace, D2C, B2B, Consumer App)
- revenue_per_customer (State price estimate or 'Unknown — requires validation')
- variable_cost (State variable cost estimate or 'Unknown — requires validation')
- contribution_margin (State contribution margin estimate or 'Unknown — requires validation')
- gross_margin_estimate (State industry benchmark range or 'Unknown — requires validation')
- estimated_cac ('Unknown — requires validation')
- estimated_ltv ('Unknown — requires validation')
- ltv_cac_ratio ('Unknown — requires validation')
- cac_payback_months ('Unknown — requires validation')
- aov_estimate (Average order value if applicable, else 'N/A' or 'Unknown — requires validation')
- repeat_purchase_rate (Repeat rate if applicable, else 'N/A' or 'Unknown — requires validation')
- unproven_financial_assumptions (List 3-4 key unproven financial assumptions)
- how_to_validate_unit_economics (List 3 concrete steps to measure CAC, margins, and LTV)

RULES:
- Unless direct customer acquisition data was established, set estimated_cac, estimated_ltv, and ltv_cac_ratio to 'Unknown — requires validation'.
- Explain clearly in how_to_validate_unit_economics how the founder can measure these metrics.
- Return ONLY valid structured output.
"""

    return invoke_structured_llm(
        model_cls=UnitEconomics,
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        max_tokens=1536,
        response_mode="json_object",
    )
