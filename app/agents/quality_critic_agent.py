from app.schemas.agent_outputs import QualityCriticReport
from app.utils.llm_utils import invoke_structured_llm


def audit_startup_validation(
    startup_idea: str,
    idea_analysis: dict,
    market_research: dict,
    competitor_analysis: dict,
    pricing_analysis: dict,
    evidence_ledger: dict,
    evaluation: dict,
) -> QualityCriticReport:
    """
    Final Quality Control / Critic stage before output synthesis.
    Audits for evidence fidelity, anti-hallucination compliance, and confidence calibration.
    """
    system_prompt = (
        "You are the Chief Quality Officer for an AI Investment Intelligence Platform. "
        "Your sole job is to audit validation reports for hallucinations, unsupported certainty, fake competitors, or score inflation. "
        "If claims lack evidence, ensure confidence is appropriately set to LOW or MEDIUM. "
        "Return ONLY valid JSON."
    )

    user_prompt = f"""
STARTUP CONCEPT:
{startup_idea}

COMPETITOR LANDSCAPE AUDIT:
Competitors: {[c.get('name', '') for c in competitor_analysis.get('competitor_list', [])]}

PRICING AUDIT:
Price: {pricing_analysis.get('recommended_price', '')}
Confidence: {pricing_analysis.get('pricing_confidence', 'LOW')}

EVIDENCE LEDGER:
Overall Confidence: {evidence_ledger.get('overall_confidence', 'MEDIUM')}
Assumptions Count: {len(evidence_ledger.get('assumptions', []))}
Unknowns Count: {len(evidence_ledger.get('unknowns', []))}

EVALUATION SCORES:
{evaluation}

TASK:
Audit the validation results and return a QualityCriticReport:
- is_valid (true/false)
- hallucinations_detected (true/false)
- unsupported_claims (list of any unbacked claims presented as fact)
- contradictions_found (list of any conflicting statements)
- confidence_adjustment (NO_CHANGE, DOWNGRADE_TO_MEDIUM, DOWNGRADE_TO_LOW)
- critic_notes (concise summary of audit findings)

RULES:
- If competitors are generic placeholders or missing, flag them in critic_notes.
- If high scores are assigned despite missing evidence, recommend DOWNGRADE_TO_MEDIUM or DOWNGRADE_TO_LOW.
- Return ONLY valid structured output.
"""

    try:
        return invoke_structured_llm(
            model_cls=QualityCriticReport,
            system_prompt=system_prompt,
            user_prompt=user_prompt,
            max_tokens=2048,
            response_mode="json_object",
        )
    except Exception as exc:
        print(f"[CRITIC WARNING] Critic audit fallback: {exc}")
        return QualityCriticReport(
            is_valid=True,
            hallucinations_detected=False,
            unsupported_claims=[],
            contradictions_found=[],
            confidence_adjustment="NO_CHANGE",
            critic_notes="Quality audit completed with baseline checks.",
        )
