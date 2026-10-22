import sqlite3
from pathlib import Path

from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.sqlite import SqliteSaver

from app.graph.state import StartupState

from app.graph.nodes import (
    idea_node,
    invalid_idea_node,
    research_planner_node,
    market_node,
    competitor_node,
    persona_node,
    pricing_node,
    evidence_synthesizer_node,
    unit_economics_node,
    swot_node,
    mvp_node,
    risk_failure_node,
    validation_experiment_node,
    evaluation_node,
    quality_critic_node,
    scoring_node,
    report_synthesis_node,
)

from app.agents.idea_quality import is_idea_valid


BASE_DIR = Path(__file__).resolve().parents[2]
CHECKPOINT_DB = BASE_DIR / "data" / "langgraph_checkpoints.db"


def idea_quality_node(state: StartupState):
    idea_analysis = state.get("idea_analysis", {})
    print(f"[IDEA ANALYSIS] {idea_analysis}")
    valid, reason = is_idea_valid(idea_analysis)
    print(f"[IDEA QUALITY] valid={valid}")
    if not valid:
        print(f"[IDEA QUALITY] rejected: {reason}")
    return {
        "idea_valid": valid,
        "idea_quality_message": reason,
    }


def route_after_idea_quality(state: StartupState):
    if state.get("idea_valid", False):
        return "research_planner"
    return "invalid"


def build_startup_validation_graph():
    graph = StateGraph(StartupState)

    # --------------------------------------------------
    # Nodes
    # --------------------------------------------------

    graph.add_node("idea", idea_node)
    graph.add_node("idea_quality", idea_quality_node)
    graph.add_node("invalid_idea", invalid_idea_node)
    graph.add_node("research_planner", research_planner_node)
    graph.add_node("market", market_node)
    graph.add_node("competitor", competitor_node)
    graph.add_node("persona", persona_node)
    graph.add_node("pricing", pricing_node)
    graph.add_node("evidence_synthesizer", evidence_synthesizer_node)
    graph.add_node("unit_economics", unit_economics_node)
    graph.add_node("swot", swot_node)
    graph.add_node("mvp", mvp_node)
    graph.add_node("risk_failure", risk_failure_node)
    graph.add_node("validation_experiment", validation_experiment_node)
    graph.add_node("evaluation", evaluation_node)
    graph.add_node("quality_critic", quality_critic_node)
    graph.add_node("scoring", scoring_node)
    graph.add_node("report_synthesis", report_synthesis_node)

    # --------------------------------------------------
    # Graph Edges
    # --------------------------------------------------

    graph.add_edge(START, "idea")
    graph.add_edge("idea", "idea_quality")

    graph.add_conditional_edges(
        "idea_quality",
        route_after_idea_quality,
        {
            "research_planner": "research_planner",
            "invalid": "invalid_idea",
        },
    )

    graph.add_edge("invalid_idea", END)

    # Validation Pipeline
    graph.add_edge("research_planner", "market")
    graph.add_edge("market", "competitor")
    graph.add_edge("competitor", "persona")
    graph.add_edge("persona", "pricing")
    graph.add_edge("pricing", "evidence_synthesizer")
    graph.add_edge("evidence_synthesizer", "unit_economics")
    graph.add_edge("unit_economics", "swot")
    graph.add_edge("swot", "mvp")
    graph.add_edge("mvp", "risk_failure")
    graph.add_edge("risk_failure", "validation_experiment")
    graph.add_edge("validation_experiment", "evaluation")
    graph.add_edge("evaluation", "quality_critic")
    graph.add_edge("quality_critic", "scoring")
    graph.add_edge("scoring", "report_synthesis")
    graph.add_edge("report_synthesis", END)

    # Checkpointing
    conn = sqlite3.connect(CHECKPOINT_DB, check_same_thread=False)
    checkpointer = SqliteSaver(conn)

    return graph.compile(checkpointer=checkpointer)