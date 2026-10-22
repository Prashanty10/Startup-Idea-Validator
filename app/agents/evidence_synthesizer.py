from app.schemas.agent_outputs import EvidenceLedger, ClaimEvidence
from app.utils.llm_utils import invoke_structured_llm


def _extract_claim_text(item):
    if isinstance(item, dict):
        return item.get("claim", str(item))
    return getattr(item, "claim", str(item))


def synthesize_evidence(
    startup_idea: str,
    idea_analysis: dict,
    market_research: dict,
    competitor_analysis: dict,
    persona_analysis: dict,
    pricing_analysis: dict,
) -> EvidenceLedger:
    """
    Centralized Evidence Synthesis stage after research.
    Strictly categorizes claims into SUPPORTED, INFERRED, ASSUMPTION, UNKNOWN, CONTRADICTED.
    Assigns confidence ratings (HIGH, MEDIUM, LOW) and explicit founder validation actions.
    """
    raw_evidence_items = market_research.get("evidence", [])[:8]
    evidence_claims = [_extract_claim_text(item) for item in raw_evidence_items]

    competitors_list = competitor_analysis.get("competitor_list", [])[:8]
    competitor_names = [c.get("name", "") if isinstance(c, dict) else getattr(c, "name", "") for c in competitors_list]

    personas_list = persona_analysis.get("personas", [])[:5]
    wtp_claims = [p.get("willingness_to_pay", "") if isinstance(p, dict) else getattr(p, "willingness_to_pay", "") for p in personas_list]

    system_prompt = (
        "You are an objective startup evidence auditor. "
        "Your task is to classify key claims about the startup idea into strict evidence categories. "
        "Never convert an unproven assumption or estimate into a supported fact. "
        "If evidence is lacking, label it as ASSUMPTION or UNKNOWN with LOW confidence. "
        "Return ONLY valid JSON."
    )

    user_prompt = f"""
STARTUP IDEA:
{startup_idea}

FOUNDER ASSUMPTIONS:
{idea_analysis.get('key_assumptions', [])[:5]}

MARKET RESEARCH FINDINGS:
- Demand: {market_research.get('market_demand', '')}
- Trends: {market_research.get('industry_trends', [])[:5]}
- Problems: {market_research.get('customer_problems', [])[:5]}
- Evidence: {evidence_claims}

COMPETITOR LANDSCAPE:
- Competitors: {competitor_names}
- Market Gaps: {competitor_analysis.get('market_gaps', [])[:5]}
- Risks: {competitor_analysis.get('competitive_risks', [])[:5]}

PERSONA & PRICING CLAIMS:
- Willingness to Pay Claims: {wtp_claims}
- Recommended Price: {pricing_analysis.get('recommended_price', '')}
- Pricing Model: {pricing_analysis.get('pricing_model', '')}

TASK:
Build a comprehensive Evidence Ledger containing:
1. supported_claims: Claims supported by empirical web data or RAG references (Status: SUPPORTED, Confidence: HIGH/MEDIUM).
2. inferred_claims: Logical inferences derived from broader market context (Status: INFERRED, Confidence: MEDIUM).
3. assumptions: Unproven founder assumptions lacking direct proof (Status: ASSUMPTION, Confidence: LOW/MEDIUM).
4. unknowns: Critical missing information (Status: UNKNOWN, Confidence: LOW).
5. overall_confidence: HIGH, MEDIUM, or LOW overall evidence rating.

RULES:
- Limit entries to top 3-5 most critical items per list (supported_claims, inferred_claims, assumptions, unknowns).
- Keep each claim description, evidence snippet, and validation_action concise (1-2 sentences max).
- Pricing willingness to pay claims without real customer transaction evidence MUST be classified as ASSUMPTION or UNKNOWN.
- For each claim, provide a concrete validation_action explaining how the founder can test it.
- Never fake citations or URLs.
- Return ONLY valid structured output.
"""

    return invoke_structured_llm(
        model_cls=EvidenceLedger,
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        max_tokens=4096,
        response_mode="json_object",
    )
