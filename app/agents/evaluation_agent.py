from app.schemas.agent_outputs import (
    StartupEvaluation,
    EvidenceItem,
)
from app.rag.retriever import retrieve_criterion_evidence
from app.utils.llm_utils import invoke_structured_llm


CRITERIA = [
    "market_demand",
    "customer_need",
    "competition",
    "business_potential",
    "pricing_potential",
    "feasibility",
    "mvp_clarity",
]


CRITERION_CATEGORIES = {
    "market_demand": ["market_validation", "opportunity_evaluation"],
    "customer_need": ["market_validation", "opportunity_evaluation"],
    "competition": ["market_validation", "startup_failure"],
    "business_potential": ["opportunity_evaluation", "ai_decision_support"],
    "pricing_potential": ["pricing"],
    "feasibility": ["ai_decision_support", "startup_failure"],
    "mvp_clarity": ["mvp", "opportunity_evaluation"],
}


def _compact_evaluation_context(
    idea_analysis: dict,
    market_research: dict,
    competitor_analysis: dict,
    persona_analysis: dict,
    swot_analysis: dict,
    pricing_analysis: dict,
    mvp_analysis: dict,
    evidence_ledger: dict | None = None,
) -> dict:

    return {
        "idea": {
            "name": idea_analysis.get("startup_name", ""),
            "category": idea_analysis.get("primary_category", "SaaS"),
            "problem": idea_analysis.get("problem_statement", idea_analysis.get("problem", "")),
            "solution": idea_analysis.get("proposed_solution", ""),
            "target_customer": idea_analysis.get("target_customer", ""),
            "buyer": idea_analysis.get("buyer", ""),
            "business_model": idea_analysis.get("business_model", ""),
            "value_proposition": idea_analysis.get("key_value_proposition", ""),
            "assumptions": idea_analysis.get("key_assumptions", idea_analysis.get("assumptions", []))[:3],
        },

        "market": {
            "demand": market_research.get("market_demand", ""),
            "target_market": market_research.get("target_market", ""),
            "customer_problems": market_research.get("customer_problems", [])[:3],
            "opportunities": market_research.get("opportunities", [])[:3],
        },

        "competition": {
            "direct_competitors": [
                {
                    "name": item.get("name", ""),
                    "product": item.get("product", ""),
                    "pricing": item.get("pricing", ""),
                }
                for item in competitor_analysis.get("direct_competitors", competitor_analysis.get("competitor_list", []))[:3]
            ],
            "market_gaps": competitor_analysis.get("market_gaps", [])[:3],
            "competitive_risks": competitor_analysis.get("competitive_risks", [])[:3],
        },

        "personas": [
            {
                "role": persona.get("role", ""),
                "business_type": persona.get("business_type", ""),
                "pain_points": persona.get("pain_points", [])[:2],
                "willingness_to_pay": persona.get("willingness_to_pay", ""),
            }
            for persona in persona_analysis.get("personas", [])[:3]
        ],

        "swot": {
            "strengths": swot_analysis.get("strengths", [])[:3],
            "weaknesses": swot_analysis.get("weaknesses", [])[:3],
            "opportunities": swot_analysis.get("opportunities", [])[:3],
            "threats": swot_analysis.get("threats", [])[:3],
        },

        "pricing": {
            "pricing_model": pricing_analysis.get("pricing_model", ""),
            "recommended_price": pricing_analysis.get("recommended_price", ""),
            "pricing_confidence": pricing_analysis.get("pricing_confidence", "LOW"),
            "pricing_risks": pricing_analysis.get("pricing_risks", [])[:3],
        },

        "mvp": {
            "core_features": mvp_analysis.get("core_features", [])[:3],
            "development_priority": mvp_analysis.get("development_priority", [])[:3],
        },

        "evidence_summary": {
            "overall_confidence": (evidence_ledger.get("overall_confidence", "MEDIUM") if evidence_ledger else "MEDIUM"),
        }
    }


def _criterion_queries(
    startup_idea: str,
    context: dict,
) -> dict[str, str]:

    idea = context["idea"]
    market = context["market"]
    competition = context["competition"]
    personas = context["personas"]
    pricing = context["pricing"]
    mvp = context["mvp"]

    return {
        "market_demand": f"Market demand adoption growth for: {startup_idea} in {market['target_market']}",
        "customer_need": f"Customer pain urgency willingness to adopt: {idea['problem']} {idea['target_customer']}",
        "competition": f"Competitors differentiation barrier to entry: {startup_idea} {competition['direct_competitors']}",
        "business_potential": f"Business model margins scalability: {idea['business_model']} {idea['value_proposition']}",
        "pricing_potential": f"Willingness to pay pricing sensitivity: {pricing['pricing_model']} {pricing['recommended_price']}",
        "feasibility": f"Technical operational regulatory difficulty: {idea['solution']} {idea['assumptions']}",
        "mvp_clarity": f"Minimum viable product validation experiment: {mvp['core_features']}",
    }


def _retrieve_criterion_evidence(
    startup_idea: str,
    context: dict,
) -> dict[str, list]:

    queries = _criterion_queries(startup_idea, context)
    criterion_documents = {}

    for criterion, query in queries.items():
        categories = CRITERION_CATEGORIES.get(criterion, [])
        try:
            documents = retrieve_criterion_evidence(
                query=query,
                categories=categories,
                k_per_category=1,
            )
            criterion_documents[criterion] = documents
        except Exception as exc:
            print(f"[RAG ERROR] {criterion}: {exc}")
            criterion_documents[criterion] = []

    return criterion_documents


def _format_evidence(documents: list) -> str:
    formatted = []
    for index, document in enumerate(documents, start=1):
        metadata = document.metadata or {}
        title = metadata.get("title", metadata.get("file_name", "Unknown title"))
        content = " ".join(document.page_content.split())
        if len(content) > 300:
            content = content[:300].rsplit(" ", 1)[0] + "..."
        formatted.append(f"EVIDENCE {index}\nTitle: {title}\nContent: {content}\n")
    return "\n".join(formatted)


def _attach_relevant_evidence(
    evaluation: StartupEvaluation,
    criterion_documents: dict[str, list],
) -> StartupEvaluation:

    for criterion in CRITERIA:
        criterion_score = getattr(evaluation, criterion)
        documents = criterion_documents.get(criterion, [])
        evidence = []

        for document in documents[:2]:
            metadata = document.metadata or {}
            source = str(metadata.get("source", metadata.get("file_name", "")))
            source_title = str(metadata.get("title", metadata.get("file_name", source)))
            page = str(metadata.get("page", metadata.get("page_number", "")))
            doi = str(metadata.get("doi", ""))
            content = " ".join(document.page_content.split()).strip()
            if len(content) > 500:
                content = content[:500].rsplit(" ", 1)[0] + "..."
            if not content:
                continue

            evidence.append(
                EvidenceItem(
                    claim=content,
                    source_title=source_title,
                    source_type="RAG research",
                    page=page,
                    doi=doi,
                    source=source,
                )
            )

        criterion_score.evidence = evidence

    return evaluation


def evaluate_startup(
    startup_idea: str,
    idea_analysis: dict,
    market_research: dict,
    competitor_analysis: dict,
    persona_analysis: dict,
    swot_analysis: dict,
    pricing_analysis: dict,
    mvp_analysis: dict,
    evidence_ledger: dict | None = None,
) -> StartupEvaluation:

    compact_context = _compact_evaluation_context(
        idea_analysis,
        market_research,
        competitor_analysis,
        persona_analysis,
        swot_analysis,
        pricing_analysis,
        mvp_analysis,
        evidence_ledger,
    )

    criterion_documents = _retrieve_criterion_evidence(
        startup_idea,
        compact_context,
    )

    rag_sections = []
    for criterion, documents in criterion_documents.items():
        if not documents:
            continue
        rag_sections.append(f"RAG RESEARCH — {criterion}\n{_format_evidence(documents)}\n")

    rag_context = "\n".join(rag_sections)

    system_prompt = (
        "You are a strict startup investment evaluator. "
        "Score the startup itself across 7 dimensions. "
        "IMPORTANT: You must evaluate BOTH the numerical Score (0 to 10) AND the Confidence Level (HIGH, MEDIUM, LOW) for each criterion. "
        "Do NOT allow a high score to automatically imply high confidence. A startup can have an 8/10 score with LOW confidence if evidence is sparse. "
        "For each criterion, list explicit assumptions, unknowns, and a concrete validation_action. "
        "Return ONLY valid JSON."
    )

    user_prompt = f"""
STARTUP CONCEPT:
{startup_idea}

ANALYSIS SUMMARY:
{compact_context}

RESEARCH & EVIDENCE:
{rag_context}

Evaluate these 7 criteria:
1. market_demand
2. customer_need
3. competition
4. business_potential
5. pricing_potential
6. feasibility
7. mvp_clarity

For EACH criterion return an object with:
- score: Integer from 0 to 10.
- confidence: HIGH, MEDIUM, or LOW based on empirical evidence quality.
- reason: Concise justification.
- evidence: [] (will be attached automatically).
- assumptions: List of 1-2 unproven assumptions affecting this score.
- unknowns: List of 1-2 unanswered questions affecting this score.
- validation_action: Concrete experiment to validate this criterion.

Also return overall_confidence: HIGH, MEDIUM, or LOW.

SCORING RULES:
- High market size does NOT justify high score if competitive differentiation is weak.
- Commodity/un-differentiated ideas should get 2-5 for competition and business_potential.
- Return ONLY valid structured output.
"""

    evaluation = invoke_structured_llm(
        model_cls=StartupEvaluation,
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        max_tokens=4096,
        response_mode="json_object",
    )

    return _attach_relevant_evidence(
        evaluation,
        criterion_documents,
    )