from app.schemas.agent_outputs import RiskFailureAnalysis
from app.utils.llm_utils import invoke_structured_llm


def _extract_claim_text(item):
    if isinstance(item, dict):
        return item.get("claim", str(item))
    return getattr(item, "claim", str(item))


def analyze_risks_and_failures(
    startup_idea: str,
    idea_analysis: dict,
    market_research: dict,
    competitor_analysis: dict,
    pricing_analysis: dict,
    swot_analysis: dict,
    evidence_ledger: dict,
) -> RiskFailureAnalysis:
    """
    Identifies Critical Unknowns (Impact × Uncertainty matrix)
    and Realistic Failure Scenarios with early warning signals and mitigations.
    """
    assumptions_list = evidence_ledger.get("assumptions", [])
    assumption_claims = [_extract_claim_text(item) for item in assumptions_list]

    unknowns_list = evidence_ledger.get("unknowns", [])
    unknown_claims = [_extract_claim_text(item) for item in unknowns_list]

    system_prompt = (
        "You are a startup risk analyst and failure mode auditor. "
        "Identify the 3-5 most critical unanswered questions and realistic failure modes for this startup. "
        "Do not sensationalize or claim the startup will definitely fail. Be objective, precise, and constructive. "
        "Return ONLY valid JSON."
    )

    user_prompt = f"""
STARTUP CONCEPT:
{startup_idea}

BUSINESS MODEL & CATEGORY:
{idea_analysis.get('primary_category', 'SaaS')} ({idea_analysis.get('business_model', '')})

KEY ASSUMPTIONS:
{idea_analysis.get('key_assumptions', [])}

COMPETITIVE THREATS:
{competitor_analysis.get('competitive_risks', [])}

SWOT THREATS & WEAKNESSES:
Weaknesses: {swot_analysis.get('weaknesses', [])}
Threats: {swot_analysis.get('threats', [])}

PRICING RISKS:
{pricing_analysis.get('pricing_risks', [])}

EVIDENCE LEDGER ASSUMPTIONS & UNKNOWNS:
Assumptions: {assumption_claims}
Unknowns: {unknown_claims}

TASK:
Generate a RiskFailureAnalysis object containing:

1. critical_unknowns (3 to 5 items):
   - unknown: The specific unanswered question (e.g. Will users switch from manual spreadsheets? Will CAC exceed contribution margin?)
   - category: Market, Demand, Pricing, Technical, CAC, Retention, Regulatory, Liquidity
   - impact: HIGH, MEDIUM, LOW
   - uncertainty: HIGH, MEDIUM, LOW
   - priority_score: CRITICAL, HIGH, or MEDIUM (Impact × Uncertainty)
   - how_to_validate: Actionable experiment to resolve it

2. failure_scenarios (3 to 4 items):
   - scenario: Clear name for the failure mode (e.g. High Acquisition Cost Squeeze, Incumbent Feature Replication, Lack of Buyer Willingness to Pay)
   - why_it_could_happen: Root cause explanation
   - evidence_or_precedent: Industry precedent or evidence
   - impact: HIGH or MEDIUM
   - early_warning_signal: Quantitative or qualitative early indicator (e.g. Conversion rate below 1.5%, Trial dropoff at Day 3)
   - mitigation_strategy: Pre-emptive founder action
   - validation_experiment: Short-term test to evaluate this risk

RULES:
- Make all failure scenarios and critical unknowns specific to this exact startup, market, and business model.
- Return ONLY valid structured output.
"""

    return invoke_structured_llm(
        model_cls=RiskFailureAnalysis,
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        max_tokens=2048,
        response_mode="json_object",
    )
