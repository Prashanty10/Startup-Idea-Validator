from app.agents.idea_agent import analyze_startup_idea
from app.agents.research_planner import generate_research_plan
from app.agents.market_agent import research_market
from app.agents.competitor_agent import analyze_competitors
from app.agents.persona_agent import generate_customer_personas
from app.agents.swot_agent import analyze_swot
from app.agents.pricing_agent import recommend_pricing
from app.agents.evidence_synthesizer import synthesize_evidence
from app.agents.unit_economics_agent import analyze_unit_economics
from app.agents.risk_failure_agent import analyze_risks_and_failures
from app.agents.validation_experiment_agent import generate_validation_experiments_and_plan
from app.agents.mvp_agent import recommend_mvp
from app.agents.evaluation_agent import evaluate_startup
from app.agents.quality_critic_agent import audit_startup_validation
from app.agents.report_synthesis_agent import synthesize_narrative_report
from app.scoring.scoring_engine import calculate_validation_score
from app.graph.state import StartupState


def idea_node(state: StartupState) -> dict:
    result = analyze_startup_idea(state["startup_idea"])
    return {"idea_analysis": result.model_dump()}


def invalid_idea_node(state: StartupState) -> dict:
    message = state.get("idea_quality_message", "Startup idea is too vague to evaluate reliably.")
    return {
        "scoring_result": {
            "overall_score": 0,
            "overall_confidence": "LOW",
            "verdict": "Insufficient Information",
            "summary": message,
            "key_strengths": [],
            "key_weaknesses": [
                "Problem is not clearly specified.",
                "Proposed solution is not clearly specified.",
                "Target customer is not clearly specified.",
            ],
            "opportunities": [],
            "threats": [],
        }
    }


def _extract_location(state: StartupState) -> tuple[str, str]:
    country = (state.get("target_country") or "").strip() or "Global"
    if country.lower() == "global":
        return "Global", ""
    region = (state.get("target_region") or "").strip()
    return country, region


def research_planner_node(state: StartupState) -> dict:
    country, region = _extract_location(state)
    result = generate_research_plan(
        state["startup_idea"],
        state["idea_analysis"],
        country,
        region,
    )
    return {"research_plan": result.model_dump()}


def market_node(state: StartupState) -> dict:
    country, region = _extract_location(state)
    result = research_market(
        state["startup_idea"],
        state["idea_analysis"],
        country,
        region,
        state.get("research_plan"),
    )
    return {"market_research": result.model_dump()}


def competitor_node(state: StartupState) -> dict:
    country, region = _extract_location(state)
    result = analyze_competitors(
        state["startup_idea"],
        state["idea_analysis"],
        state["market_research"],
        country,
        region,
        state.get("research_plan"),
    )
    return {"competitor_analysis": result.model_dump()}


def persona_node(state: StartupState) -> dict:
    result = generate_customer_personas(
        state["startup_idea"],
        state["idea_analysis"],
        state["market_research"],
        state["competitor_analysis"],
    )
    return {"persona_analysis": result.model_dump()}


def pricing_node(state: StartupState) -> dict:
    country, region = _extract_location(state)
    result = recommend_pricing(
        state["startup_idea"],
        state["idea_analysis"],
        state["market_research"],
        state["competitor_analysis"],
        state["persona_analysis"],
        country,
        region,
    )
    return {"pricing_analysis": result.model_dump()}


def evidence_synthesizer_node(state: StartupState) -> dict:
    result = synthesize_evidence(
        state["startup_idea"],
        state["idea_analysis"],
        state["market_research"],
        state["competitor_analysis"],
        state["persona_analysis"],
        state["pricing_analysis"],
    )
    return {"evidence_ledger": result.model_dump()}


def unit_economics_node(state: StartupState) -> dict:
    country, _ = _extract_location(state)
    result = analyze_unit_economics(
        state["startup_idea"],
        state["idea_analysis"],
        state["pricing_analysis"],
        state["competitor_analysis"],
        country,
    )
    return {"unit_economics": result.model_dump()}


def swot_node(state: StartupState) -> dict:
    result = analyze_swot(
        state["startup_idea"],
        state["idea_analysis"],
        state["market_research"],
        state["competitor_analysis"],
        state["persona_analysis"],
    )
    return {"swot_analysis": result.model_dump()}


def mvp_node(state: StartupState) -> dict:
    result = recommend_mvp(
        state["startup_idea"],
        state["idea_analysis"],
        state["market_research"],
        state["competitor_analysis"],
        state["persona_analysis"],
        state["swot_analysis"],
        state["pricing_analysis"],
    )
    return {"mvp_analysis": result.model_dump()}


def risk_failure_node(state: StartupState) -> dict:
    result = analyze_risks_and_failures(
        state["startup_idea"],
        state["idea_analysis"],
        state["market_research"],
        state["competitor_analysis"],
        state["pricing_analysis"],
        state["swot_analysis"],
        state["evidence_ledger"],
    )
    res_dict = result.model_dump()
    return {
        "risk_failure_analysis": res_dict,
        "critical_unknowns": res_dict.get("critical_unknowns", []),
        "failure_scenarios": res_dict.get("failure_scenarios", []),
    }


def validation_experiment_node(state: StartupState) -> dict:
    experiments, action_plan = generate_validation_experiments_and_plan(
        state["startup_idea"],
        state["idea_analysis"],
        state["market_research"],
        state["competitor_analysis"],
        state["pricing_analysis"],
        state["mvp_analysis"],
        state["unit_economics"],
        state["risk_failure_analysis"],
    )
    return {
        "validation_experiments": [e.model_dump() for e in experiments],
        "founder_action_plan": action_plan.model_dump(),
    }


def evaluation_node(state: StartupState) -> dict:
    result = evaluate_startup(
        state["startup_idea"],
        state["idea_analysis"],
        state["market_research"],
        state["competitor_analysis"],
        state["persona_analysis"],
        state["swot_analysis"],
        state["pricing_analysis"],
        state["mvp_analysis"],
        state.get("evidence_ledger"),
    )
    return {"evaluation": result.model_dump()}


def quality_critic_node(state: StartupState) -> dict:
    result = audit_startup_validation(
        state["startup_idea"],
        state["idea_analysis"],
        state["market_research"],
        state["competitor_analysis"],
        state["pricing_analysis"],
        state["evidence_ledger"],
        state["evaluation"],
    )
    return {"critic_report": result.model_dump()}


def scoring_node(state: StartupState) -> dict:
    from app.schemas.agent_outputs import StartupEvaluation
    evaluation = StartupEvaluation.model_validate(state["evaluation"])
    result = calculate_validation_score(evaluation)

    # If critic requested confidence downgrade, adjust state score result
    critic = state.get("critic_report", {})
    adjustment = critic.get("confidence_adjustment", "NO_CHANGE")
    if adjustment == "DOWNGRADE_TO_LOW":
        result["overall_confidence"] = "LOW"
    elif adjustment == "DOWNGRADE_TO_MEDIUM" and result["overall_confidence"] == "HIGH":
        result["overall_confidence"] = "MEDIUM"

    return {"scoring_result": result}


def report_synthesis_node(state: StartupState) -> dict:
    narrative = synthesize_narrative_report(state)
    return {"narrative_report": narrative.model_dump()}