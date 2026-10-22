import hashlib

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.graph.graph import build_startup_validation_graph
from app.schemas.api_models import (
    StartupValidationRequest,
    StartupValidationResponse,
    ResearchSource,
)
from app.utils.run_cache import load_run, save_run


app = FastAPI(
    title="AI Startup Idea Validation Platform",
    version="2.0.0",
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


graph = build_startup_validation_graph()


def create_cache_key(
    startup_idea: str,
    target_country: str,
    target_region: str,
) -> str:
    cache_input = (
        f"{startup_idea.strip().lower()}|"
        f"{target_country.strip().lower()}|"
        f"{target_region.strip().lower()}"
    )
    digest = hashlib.sha256(cache_input.encode("utf-8")).hexdigest()
    return f"api_v2_{digest[:16]}"


def extract_research_sources(state: dict) -> list[ResearchSource]:
    sources = []
    seen = set()

    evaluation = state.get("evaluation", {})
    for criterion in evaluation.values():
        if not isinstance(criterion, dict):
            continue
        evidence_list = criterion.get("evidence", [])
        if not isinstance(evidence_list, list):
            continue

        for evidence in evidence_list:
            if not isinstance(evidence, dict):
                continue
            if evidence.get("source_type", "") != "RAG research":
                continue

            source = ResearchSource(
                title=evidence.get("source_title", ""),
                author="",
                source_type="RAG research",
                page=str(evidence.get("page", "")),
                doi=evidence.get("doi", ""),
                source=evidence.get("source", ""),
                category="",
            )

            key = (source.title, source.page, source.doi, source.source)
            if key in seen:
                continue
            seen.add(key)
            sources.append(source)

    return sources


def build_api_response(state: dict) -> StartupValidationResponse:
    scoring_result = state.get("scoring_result", {})
    overall_score = float(scoring_result.get("overall_score", 50.0))
    overall_confidence = scoring_result.get("overall_confidence", "MEDIUM")
    verdict = scoring_result.get("verdict", "Moderate Potential")

    startup_idea = state.get("startup_idea", "")
    target_country = (state.get("target_country") or "").strip() or "Global"
    if target_country.lower() == "global":
        target_country = "Global"
        target_region = ""
    else:
        target_region = (state.get("target_region") or "").strip()

    swot = state.get("swot_analysis", {})
    market_description = target_country
    if target_region:
        market_description += f", {target_region}"

    summary = (
        f"Validation score: {overall_score:.1f}/100 ({verdict}) with {overall_confidence} evidence confidence "
        f"for {market_description}."
    )

    return StartupValidationResponse(
        startup_idea=startup_idea,
        target_country=target_country,
        target_region=target_region,
        overall_score=overall_score,
        evidence_confidence=overall_confidence,
        verdict=verdict,
        summary=summary,
        key_strengths=swot.get("strengths", []),
        key_weaknesses=swot.get("weaknesses", []),
        opportunities=swot.get("opportunities", []),
        threats=swot.get("threats", []),
        idea_analysis=state.get("idea_analysis", {}),
        research_plan=state.get("research_plan", {}),
        evidence_ledger=state.get("evidence_ledger", {}),
        market_research=state.get("market_research", {}),
        competitor_analysis=state.get("competitor_analysis", {}),
        persona_analysis=state.get("persona_analysis", {}),
        pricing_analysis=state.get("pricing_analysis", {}),
        unit_economics=state.get("unit_economics", {}),
        mvp_analysis=state.get("mvp_analysis", {}),
        swot_analysis=state.get("swot_analysis", {}),
        risk_failure_analysis=state.get("risk_failure_analysis", {}),
        critical_unknowns=state.get("critical_unknowns", []),
        failure_scenarios=state.get("failure_scenarios", []),
        validation_experiments=state.get("validation_experiments", []),
        founder_action_plan=state.get("founder_action_plan", {}),
        evaluation=state.get("evaluation", {}),
        critic_report=state.get("critic_report", {}),
        narrative_report=state.get("narrative_report", {}),
        research_sources=extract_research_sources(state),
    )


@app.get("/")
def root():
    return {"message": "AI Startup Idea Validation API v2.0 is running."}


@app.post(
    "/api/validate-startup",
    response_model=StartupValidationResponse,
)
def validate_startup(request: StartupValidationRequest):
    try:
        target_country = (request.target_country or "").strip() or "Global"
        if target_country.lower() == "global":
            target_country = "Global"
            target_region = ""
        else:
            target_region = (request.target_region or "").strip()

        cache_key = create_cache_key(
            request.startup_idea,
            target_country,
            target_region,
        )

        # 1. Check persistent cache
        try:
            cached_result = load_run(cache_key)
            if "scoring_result" in cached_result and "evaluation" in cached_result:
                print(f"[CACHE HIT] {cache_key}")
                return build_api_response(cached_result)
        except FileNotFoundError:
            print(f"[CACHE MISS] {cache_key}")

        # 2. Run LangGraph for new startup
        initial_state = {
            "startup_idea": request.startup_idea.strip(),
            "target_country": target_country,
            "target_region": target_region,
        }

        config = {"configurable": {"thread_id": cache_key}}
        print(f"[GRAPH] Starting validation: {cache_key}")

        final_state = graph.invoke(initial_state, config=config)

        # 3. Save final result
        save_run(cache_key, dict(final_state))
        print(f"[SAVED] {cache_key}")

        # 4. Return clean response
        return build_api_response(final_state)

    except Exception as exc:
        print(f"[ERROR] Startup validation failed: {exc}")
        error_str = str(exc)
        if "401" in error_str or "Invalid API Key" in error_str or "api_key" in error_str.lower():
            detail_msg = (
                "Groq API Key is invalid or missing. "
                "Please set a valid GROQ_API_KEY and TAVILY_API_KEY in your .env file to validate new ideas."
            )
        else:
            detail_msg = f"Startup validation failed: {error_str}"

        raise HTTPException(
            status_code=500,
            detail=detail_msg,
        ) from exc