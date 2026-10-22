from app.schemas.agent_outputs import ValidationExperiment, FounderActionPlan
from app.utils.llm_utils import invoke_structured_llm
from pydantic import BaseModel, Field


class ExperimentAndPlanWrapper(BaseModel):
    experiments: list[ValidationExperiment] = Field(default_factory=list)
    action_plan: FounderActionPlan = Field(default_factory=FounderActionPlan)


def generate_validation_experiments_and_plan(
    startup_idea: str,
    idea_analysis: dict,
    market_research: dict,
    competitor_analysis: dict,
    pricing_analysis: dict,
    mvp_analysis: dict,
    unit_economics: dict,
    risk_failure_analysis: dict,
) -> tuple[list[ValidationExperiment], FounderActionPlan]:
    """
    Generates actionable validation experiments for top uncertainties
    and a custom 7-Day, 30-Day, and 90-Day Founder Action Plan.
    """
    system_prompt = (
        "You are an agile startup advisor and Lean Startup validation coach. "
        "Design concrete, hypothesis-driven experiments and a pragmatic 7-Day, 30-Day, and 90-Day execution plan. "
        "Never return identical generic checklists. Tailor every task to the specific startup model. "
        "Return ONLY valid JSON."
    )

    unknowns = risk_failure_analysis.get("critical_unknowns", [])
    unknown_texts = [u.get("unknown", "") for u in unknowns] if isinstance(unknowns, list) else []

    user_prompt = f"""
STARTUP CONCEPT:
{startup_idea}

CATEGORY & MODEL:
{idea_analysis.get('primary_category', 'SaaS')} ({idea_analysis.get('business_model', '')})

TARGET CUSTOMERS:
{idea_analysis.get('target_customer', '')} (Buyer: {idea_analysis.get('buyer', '')})

RECOMMENDED PRICING:
{pricing_analysis.get('recommended_price', '')} ({pricing_analysis.get('pricing_model', '')})

MVP CORE FEATURES:
{[f.get('name', '') if isinstance(f, dict) else str(f) for f in mvp_analysis.get('core_features', [])]}

CRITICAL UNKNOWNS TO VALIDATE:
{unknown_texts}

TASK:
Generate an ExperimentAndPlanWrapper JSON object containing:

1. experiments (3 to 4 items):
   - hypothesis: Specific testable hypothesis (e.g., At least 30% of target Pune professionals will pre-order a ₹1,499 weekly meal plan).
   - experiment: Concrete test (e.g., Run landing page test with WhatsApp sign-up and pre-order deposit button).
   - target_audience: Specific cohort (e.g., Tech workers in Hinjewadi/Kharadi IT parks).
   - sample_size: E.g., 20-30 customer interviews or 100 landing page visits.
   - success_metric: Quantitative threshold for PASS (e.g., >= 10 paid deposits or >= 15 interview sign-ups).
   - failure_threshold: Quantitative threshold for FAIL (e.g., < 3 deposits or zero willingness to pay).
   - estimated_effort: E.g., 3 days, 1 week.
   - expected_learning: What key insight is proven.
   - decision_if_pass: Next building step.
   - decision_if_fail: Pivot or pricing adjustment strategy.

2. action_plan:
   - seven_day_plan (5-6 specific tasks for Days 1-7): Customer problem interviews, pricing test, competitor audit, landing page creation.
   - thirty_day_plan (5-6 specific tasks for Days 8-30): Concierge MVP / pilot launch, initial customer onboarding, tracking CAC/conversion.
   - ninety_day_plan (5-6 specific tasks for Days 31-90): Unit economics evaluation, retention analysis, feature iteration, scale vs pivot decision.

RULES:
- Make all experiments and action plan items specific to this startup concept and location.
- Return ONLY valid structured output.
"""

    result = invoke_structured_llm(
        model_cls=ExperimentAndPlanWrapper,
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        max_tokens=2560,
        response_mode="json_object",
    )

    return result.experiments, result.action_plan
