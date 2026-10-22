from app.schemas.agent_outputs import PricingAnalysis

from app.rag.retriever import (
    retrieve_documents,
    format_retrieved_documents,
)

from app.utils.llm_utils import invoke_structured_llm


def recommend_pricing(
    startup_idea: str,
    idea_analysis: dict,
    market_research: dict,
    competitor_analysis: dict,
    persona_analysis: dict,
    target_country: str,
    target_region: str,
) -> PricingAnalysis:

    # --------------------------------------------------
    # 1. Target location
    # --------------------------------------------------

    country = target_country.strip() or "Global"
    is_global = country.lower() == "global"
    if is_global:
        location = "Global"
    else:
        location = country
        if target_region.strip():
            location += f", {target_region.strip()}"

    # --------------------------------------------------
    # 2. Retrieve pricing research
    # --------------------------------------------------

    pricing_documents = retrieve_documents(
        query=f"""
Pricing strategy for {startup_idea}
in {location}.

Focus on:
- pricing models
- subscription pricing
- willingness to pay
- pricing tiers
""",
        k=2,
        category="pricing",
    )

    pricing_context = format_retrieved_documents(
        pricing_documents
    )

    # --------------------------------------------------
    # 3. Extract compact context
    # --------------------------------------------------

    business_model = idea_analysis.get(
        "business_model",
        "",
    )

    target_customer = idea_analysis.get(
        "target_customer",
        "",
    )

    target_market = market_research.get(
        "target_market",
        "",
    )

    competitors = [
        {
            "name": item.get(
                "name",
                "",
            ),
            "pricing": item.get(
                "pricing",
                "Not publicly available",
            ),
        }
        for item in competitor_analysis.get(
            "competitor_list",
            [],
        )[:3]
    ]

    willingness_to_pay = [
        {
            "role": persona.get(
                "role",
                "",
            ),
            "willingness_to_pay": persona.get(
                "willingness_to_pay",
                "",
            ),
        }
        for persona in persona_analysis.get(
            "personas",
            [],
        )[:3]
    ]

    # --------------------------------------------------
    # 4. System prompt
    # --------------------------------------------------

    system_prompt = (
        "You are a startup pricing strategist. "
        "Create a realistic pricing strategy from the "
        "supplied startup information. "
        "Do not invent competitor pricing or statistics. "
        "Return only valid structured output."
    )

    # --------------------------------------------------
    # 5. User prompt
    # --------------------------------------------------

    user_prompt = f"""
STARTUP:
{startup_idea}

LOCATION:
{location}

BUSINESS MODEL:
{business_model}

TARGET CUSTOMER:
{target_customer}

TARGET MARKET:
{target_market}

COMPETITORS:
{competitors}

CUSTOMER WILLINGNESS TO PAY:
{willingness_to_pay}

PRICING RESEARCH:
{pricing_context}

TASK:
Create a practical pricing strategy for this startup.

RETURN EXACT JSON STRUCTURE:
{{
  "pricing_model": "string",
  "recommended_price": "string",
  "pricing_tiers": [
    {{
      "name": "string",
      "price": "string",
      "target_customer": "string",
      "included_features": ["string", "string", "string"]
    }},
    {{
      "name": "string",
      "price": "string",
      "target_customer": "string",
      "included_features": ["string", "string", "string"]
    }},
    {{
      "name": "string",
      "price": "string",
      "target_customer": "string",
      "included_features": ["string", "string", "string"]
    }}
  ],
  "pricing_rationale": ["string", "string"],
  "pricing_risks": ["string", "string"]
}}

PRICING RULES:
- Use valid JSON only. No markdown, no commentary, no extra keys.
- pricing_model must be a string.
- recommended_price must be a string.
- Each pricing tier must be an object with exactly these keys: name, price, target_customer, included_features.
- Create exactly 3 pricing_tiers.
- Each included_features array must contain 2 to 4 concise strings.
- pricing_rationale must contain exactly 2 concise strings.
- pricing_risks must contain exactly 2 concise strings.
- Use INR (₹) for India.
- Use one consistent billing unit.
- Make higher-priced tiers more valuable.
- Keep prices realistic for the target customer.
- Use willingness-to-pay information when available.
- If willingness-to-pay information is unavailable, treat the pricing as an estimate.
- Never invent competitor pricing. If competitor pricing is unavailable, use: "Not publicly available".
- Do not invent market statistics.
- Do not leave required fields empty.
"""

    # --------------------------------------------------
    # 6. Generate structured pricing analysis
    # --------------------------------------------------

    return invoke_structured_llm(
        model_cls=PricingAnalysis,
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        max_tokens=2048,
        response_mode="json_schema",
    )