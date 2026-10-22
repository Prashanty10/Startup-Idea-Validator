from typing import TypedDict


class StartupState(TypedDict, total=False):

    # User input
    startup_idea: str
    target_country: str
    target_region: str

    # Agent outputs
    idea_analysis: dict
    research_plan: dict

    # Idea quality gate
    idea_valid: bool
    idea_quality_message: str

    # Research & evidence outputs
    market_research: dict
    competitor_analysis: dict
    persona_analysis: dict
    pricing_analysis: dict
    evidence_ledger: dict

    # Business model & risk evaluation outputs
    unit_economics: dict
    swot_analysis: dict
    mvp_analysis: dict
    risk_failure_analysis: dict
    critical_unknowns: list
    failure_scenarios: list
    validation_experiments: list
    founder_action_plan: dict

    # Evaluation, Critic, & Final scoring
    evaluation: dict
    critic_report: dict
    scoring_result: dict

    # Final Comprehensive Narrative Report Synthesis
    narrative_report: dict