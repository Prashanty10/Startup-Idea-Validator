from pydantic import BaseModel, Field


class IdeaAnalysis(BaseModel):
    startup_name: str = Field(
        default="",
        description="Suggested or extracted concise startup name."
    )
    one_line_description: str = Field(
        default="",
        description="One crisp sentence describing what the startup does."
    )
    problem_statement: str = Field(
        description="The main problem that the startup is trying to solve."
    )
    proposed_solution: str = Field(
        description="The proposed product or service that solves the problem."
    )
    target_industry: str = Field(
        description="The primary industry or domain of the startup."
    )
    target_customer: str = Field(
        description="The primary customer profile of the startup."
    )
    primary_user: str = Field(
        default="",
        description="The person who actually uses the product daily."
    )
    buyer: str = Field(
        default="",
        description="The person or entity who pays for the product."
    )
    beneficiary: str = Field(
        default="",
        description="The person or group who derives ultimate benefit."
    )
    geography: str = Field(
        default="India",
        description="Target geographic scope."
    )
    primary_category: str = Field(
        default="SaaS",
        description="Primary model category: SaaS, marketplace, consumer app, B2B, B2C, D2C, fintech, healthtech, edtech, hardware, services, AI startup, platform, etc."
    )
    secondary_categories: list[str] = Field(
        default_factory=list,
        description="Additional applicable categories (e.g. AI startup + B2B SaaS)."
    )
    business_model: str = Field(
        description="The business model description (e.g. Subscription, Commission, Pay-per-use)."
    )
    revenue_model: str = Field(
        default="",
        description="How the business generates revenue."
    )
    key_value_proposition: str = Field(
        description="The main value or benefit the startup provides to its customers."
    )
    acquisition_channels: list[str] = Field(
        default_factory=list,
        description="Likely customer acquisition channels."
    )
    key_assumptions: list[str] = Field(
        default_factory=list,
        description="Important unproven assumptions that must be true for the startup to work."
    )
    critical_unknowns: list[str] = Field(
        default_factory=list,
        description="Key unanswered questions at this early stage."
    )


class ResearchPlan(BaseModel):
    business_model_type: str = Field(
        default="General",
        description="Business model archetype guiding the research focus."
    )
    required_information: list[str] = Field(
        default_factory=list,
        description="Specific topics required for this specific startup model."
    )
    key_questions_to_answer: list[str] = Field(
        default_factory=list,
        description="Key business questions research must answer."
    )
    market_queries: list[str] = Field(
        default_factory=list,
        description="Targeted market search queries."
    )
    competitor_queries: list[str] = Field(
        default_factory=list,
        description="Targeted search queries for direct, indirect, and substitute competitors."
    )
    pricing_queries: list[str] = Field(
        default_factory=list,
        description="Targeted pricing and unit economics queries."
    )
    regulatory_queries: list[str] = Field(
        default_factory=list,
        description="Regulatory or compliance search queries."
    )


class ClaimEvidence(BaseModel):
    claim: str = Field(
        description="The statement or finding."
    )
    status: str = Field(
        default="ASSUMPTION",
        description="Status: SUPPORTED, INFERRED, ASSUMPTION, UNKNOWN, or CONTRADICTED."
    )
    evidence: str = Field(
        default="",
        description="Supporting data or citation snippet, if available."
    )
    source: str = Field(
        default="",
        description="Source URL or reference."
    )
    evidence_type: str = Field(
        default="General",
        description="Type of evidence: RAG research, Web search, Financial benchmark, Industry report, or None."
    )
    confidence: str = Field(
        default="LOW",
        description="Confidence level: HIGH, MEDIUM, or LOW."
    )
    validation_action: str = Field(
        default="",
        description="How the founder can validate this claim."
    )


class EvidenceLedger(BaseModel):
    supported_claims: list[ClaimEvidence] = Field(
        default_factory=list,
        description="Claims backed by direct empirical evidence or reliable research."
    )
    inferred_claims: list[ClaimEvidence] = Field(
        default_factory=list,
        description="Claims logically derived from market signals but missing direct metrics."
    )
    assumptions: list[ClaimEvidence] = Field(
        default_factory=list,
        description="Unproven founder assumptions requiring validation."
    )
    unknowns: list[ClaimEvidence] = Field(
        default_factory=list,
        description="Critical gaps where no reliable evidence was found."
    )
    overall_confidence: str = Field(
        default="MEDIUM",
        description="Overall evidence confidence: HIGH, MEDIUM, or LOW."
    )


class MarketEvidence(BaseModel):
    claim: str = Field(
        description="The market finding or claim."
    )
    source: str = Field(
        default="",
        description="Source name or URL supporting the claim."
    )


class MarketResearch(BaseModel):
    market_demand: str = Field(
        description="Assessment of current demand for the startup's proposed solution."
    )
    industry_trends: list[str] = Field(
        description="Current trends relevant to the startup."
    )
    target_market: str = Field(
        description="Description of the primary market and customer segment."
    )
    growth_drivers: list[str] = Field(
        description="Factors driving growth in this market."
    )
    customer_problems: list[str] = Field(
        description="Important customer problems or pain points identified from research."
    )
    opportunities: list[str] = Field(
        description="Potential market opportunities."
    )
    evidence: list[MarketEvidence] = Field(
        default_factory=list,
        description="Structured market evidence and sources."
    )


class Competitor(BaseModel):
    name: str = Field(
        description="Name of the competitor or substitute product."
    )
    competitor_type: str = Field(
        default="DIRECT",
        description="Competitor type: DIRECT, INDIRECT, or SUBSTITUTE."
    )
    product: str = Field(
        description="Description of the product or solution."
    )
    pricing: str = Field(
        description="Pricing information or 'Not publicly available' / 'Unknown / insufficient evidence'."
    )
    target_customer: str = Field(
        default="",
        description="Target customer segment of this competitor."
    )
    strengths: list[str] = Field(
        description="Strengths of the competitor."
    )
    weaknesses: list[str] = Field(
        description="Weaknesses or limitations of the competitor."
    )
    differentiation: str = Field(
        default="",
        description="How the startup differentiates from this competitor."
    )
    evidence: list[str] = Field(
        default_factory=list,
        description="Evidence or reference supporting the competitor analysis."
    )


class CompetitorAnalysis(BaseModel):
    direct_competitors: list[Competitor] = Field(
        default_factory=list,
        description="Direct competitors offering a similar product to similar customers."
    )
    indirect_competitors: list[Competitor] = Field(
        default_factory=list,
        description="Indirect competitors solving the same problem with a different approach."
    )
    substitutes: list[Competitor] = Field(
        default_factory=list,
        description="Existing status-quo substitutes or manual workarounds."
    )
    competitor_list: list[Competitor] = Field(
        default_factory=list,
        description="Combined list of all identified competitors."
    )
    market_gaps: list[str] = Field(
        description="Unmet market needs or gaps."
    )
    competitive_risks: list[str] = Field(
        description="Major competitive threats or barrier-to-entry risks."
    )
    differentiation_clarity: str = Field(
        default="Moderate",
        description="Assessment of startup differentiation clarity: High, Moderate, or Weak."
    )


class CustomerPersona(BaseModel):
    name: str = Field(
        description="Persona name."
    )
    role: str = Field(
        description="Role or position."
    )
    business_type: str = Field(
        description="Type of business or consumer segment."
    )
    goals: list[str] = Field(
        description="Main goals."
    )
    pain_points: list[str] = Field(
        description="Frustrations and pain points."
    )
    needs: list[str] = Field(
        description="Core requirements from a solution."
    )
    willingness_to_pay: str = Field(
        description="Assessment of willingness to pay and reasoning."
    )
    willingness_to_pay_confidence: str = Field(
        default="LOW",
        description="Confidence in willingness to pay claim: HIGH, MEDIUM, or LOW."
    )


class CustomerPersonaAnalysis(BaseModel):
    personas: list[CustomerPersona] = Field(
        description="Target customer personas."
    )


class SWOTItem(BaseModel):
    text: str = Field(description="SWOT point description.")
    status: str = Field(default="INFERRED", description="SUPPORTED, INFERRED, ASSUMPTION, or UNKNOWN.")
    evidence: str = Field(default="", description="Supporting evidence if available.")
    confidence: str = Field(default="MEDIUM", description="HIGH, MEDIUM, or LOW.")
    validation_action: str = Field(default="", description="Recommended action to validate or mitigate.")


class SWOTAnalysis(BaseModel):
    strengths: list[str] = Field(description="Internal strengths.")
    weaknesses: list[str] = Field(description="Internal weaknesses.")
    opportunities: list[str] = Field(description="External opportunities.")
    threats: list[str] = Field(description="External threats.")
    structured_strengths: list[SWOTItem] = Field(default_factory=list)
    structured_weaknesses: list[SWOTItem] = Field(default_factory=list)
    structured_opportunities: list[SWOTItem] = Field(default_factory=list)
    structured_threats: list[SWOTItem] = Field(default_factory=list)


class PricingTier(BaseModel):
    name: str = Field(description="Tier name.")
    price: str = Field(description="Recommended price or 'Unknown — requires validation'.")
    target_customer: str = Field(description="Intended customer segment.")
    included_features: list[str] = Field(description="Included features.")


class PricingAnalysis(BaseModel):
    pricing_model: str = Field(description="Recommended pricing model.")
    recommended_price: str = Field(description="Recommended starting price.")
    pricing_tiers: list[PricingTier] = Field(description="Pricing tiers.")
    pricing_rationale: list[str] = Field(description="Supporting rationale.")
    pricing_risks: list[str] = Field(description="Pricing risks and uncertainties.")
    pricing_confidence: str = Field(default="LOW", description="HIGH, MEDIUM, or LOW confidence.")
    validation_experiment: str = Field(default="", description="How to test pricing with customers.")


class UnitEconomics(BaseModel):
    is_applicable: bool = Field(default=True, description="Whether unit economics modeling is applicable.")
    business_model_type: str = Field(default="General", description="Archetype used for financial modeling.")
    revenue_per_customer: str = Field(default="Unknown — requires validation")
    variable_cost: str = Field(default="Unknown — requires validation")
    contribution_margin: str = Field(default="Unknown — requires validation")
    gross_margin_estimate: str = Field(default="Unknown — requires validation")
    estimated_cac: str = Field(default="Unknown — requires validation")
    estimated_ltv: str = Field(default="Unknown — requires validation")
    ltv_cac_ratio: str = Field(default="Unknown — requires validation")
    cac_payback_months: str = Field(default="Unknown — requires validation")
    aov_estimate: str = Field(default="Unknown — requires validation")
    repeat_purchase_rate: str = Field(default="Unknown — requires validation")
    unproven_financial_assumptions: list[str] = Field(default_factory=list)
    how_to_validate_unit_economics: list[str] = Field(default_factory=list)


class CriticalUnknown(BaseModel):
    unknown: str = Field(description="The unanswered critical question.")
    category: str = Field(default="Market", description="Market, Demand, Pricing, Technical, CAC, Retention, Regulatory, etc.")
    impact: str = Field(default="HIGH", description="HIGH, MEDIUM, or LOW.")
    uncertainty: str = Field(default="HIGH", description="HIGH, MEDIUM, or LOW.")
    priority_score: str = Field(default="HIGH", description="Impact × Uncertainty priority: CRITICAL, HIGH, or MEDIUM.")
    how_to_validate: str = Field(description="Actionable experiment to resolve the unknown.")


class FailureScenario(BaseModel):
    scenario: str = Field(description="Realistic failure mode name/description.")
    why_it_could_happen: str = Field(description="Root cause explanation.")
    evidence_or_precedent: str = Field(default="", description="Industry precedent or evidence.")
    impact: str = Field(default="HIGH", description="HIGH, MEDIUM, or LOW.")
    early_warning_signal: str = Field(description="Metric or sign indicating this failure is approaching.")
    mitigation_strategy: str = Field(description="Pre-emptive founder mitigation.")
    validation_experiment: str = Field(description="Short-term test to assess this risk.")


class RiskFailureAnalysis(BaseModel):
    critical_unknowns: list[CriticalUnknown] = Field(default_factory=list)
    failure_scenarios: list[FailureScenario] = Field(default_factory=list)


class ValidationExperiment(BaseModel):
    hypothesis: str = Field(description="Testable statement (e.g. Target customers will pay ₹1,499/mo).")
    experiment: str = Field(description="Concrete action (e.g. Build landing page & run ₹2,000 ad test).")
    target_audience: str = Field(description="Target cohort for the test.")
    sample_size: str = Field(default="15-30 users", description="Required sample size.")
    success_metric: str = Field(description="Quantitative signal for PASS.")
    failure_threshold: str = Field(description="Signal for FAIL.")
    estimated_effort: str = Field(default="3-5 days", description="Estimated time/effort.")
    expected_learning: str = Field(description="Key insight gained.")
    decision_if_pass: str = Field(description="Next step if experiment passes.")
    decision_if_fail: str = Field(description="Pivot or action if experiment fails.")


class FounderActionPlan(BaseModel):
    seven_day_plan: list[str] = Field(default_factory=list, description="Immediate discovery & pricing validation tasks (Days 1-7).")
    thirty_day_plan: list[str] = Field(default_factory=list, description="MVP pilot & initial acquisition validation tasks (Days 8-30).")
    ninety_day_plan: list[str] = Field(default_factory=list, description="Unit economics, retention & scale decision tasks (Days 31-90).")


class MVPFeature(BaseModel):
    name: str = Field(description="Name of the MVP feature.")
    priority: int = Field(ge=0, description="Priority rank (lower = higher priority).")


class MVPRationale(BaseModel):
    reason: str = Field(description="Reason for MVP scope decision.")


class MVPAnalysis(BaseModel):
    core_features: list[MVPFeature] = Field(description="Essential v1.0 features.")
    future_features: list[MVPFeature] = Field(description="Post-launch features.")
    excluded_features: list[MVPFeature] = Field(description="Explicitly excluded features.")
    development_priority: list[MVPFeature] = Field(description="Development sequence.")
    mvp_rationale: list[MVPRationale] = Field(description="Supporting MVP rationale.")


class EvidenceItem(BaseModel):
    claim: str = Field(default="", description="Supporting claim.")
    source_title: str = Field(default="", description="Source title.")
    source_type: str = Field(default="", description="Source type.")
    page: str = Field(default="", description="Page reference.")
    doi: str = Field(default="", description="DOI if available.")
    source: str = Field(default="", description="Source URL or file path.")


class CriterionScore(BaseModel):
    score: int = Field(ge=0, le=10, description="Score from 0 to 10.")
    confidence: str = Field(default="MEDIUM", description="Confidence level: HIGH, MEDIUM, or LOW.")
    reason: str = Field(default="", description="Reason supporting the score.")
    evidence: list[EvidenceItem] = Field(default_factory=list, description="Structured evidence.")
    assumptions: list[str] = Field(default_factory=list, description="Unproven assumptions affecting this score.")
    unknowns: list[str] = Field(default_factory=list, description="Uncertainties affecting this score.")
    validation_action: str = Field(default="", description="Next step to validate this criterion.")


class StartupEvaluation(BaseModel):
    market_demand: CriterionScore
    customer_need: CriterionScore
    competition: CriterionScore
    business_potential: CriterionScore
    pricing_potential: CriterionScore
    feasibility: CriterionScore
    mvp_clarity: CriterionScore
    overall_confidence: str = Field(default="MEDIUM", description="Overall evidence confidence level.")


class QualityCriticReport(BaseModel):
    is_valid: bool = Field(default=True)
    hallucinations_detected: bool = Field(default=False)
    unsupported_claims: list[str] = Field(default_factory=list)
    contradictions_found: list[str] = Field(default_factory=list)
    confidence_adjustment: str = Field(default="NO_CHANGE", description="NO_CHANGE, DOWNGRADE_TO_MEDIUM, DOWNGRADE_TO_LOW")
    critic_notes: str = Field(default="Quality control check passed clean.")


class NarrativeReport(BaseModel):
    executive_summary: str = Field(
        default="",
        description="Coherent, multi-paragraph overview of startup idea, problem, solution, target customers, opportunities, significant challenges, and overall assessment."
    )
    startup_idea_overview: str = Field(
        default="",
        description="Detailed narrative explaining how the proposed product or service works, the problem it solves, value provided, domain context, and explicitly identifying missing details."
    )
    market_opportunity_analysis: str = Field(
        default="",
        description="Comprehensive narrative on market demand, industry trends, geographical context (Global or regional), customer need drivers, and distinguishing verified data from assumptions."
    )
    competitor_analysis_narrative: str = Field(
        default="",
        description="Thorough prose analysis of the competitive environment, how existing players and substitutes serve customers, gaps, barrier-to-entry risks, and why differentiation matters without inventing unverified facts."
    )
    target_customer_analysis: str = Field(
        default="",
        description="Detailed narrative explaining buyer and user personas, acute friction points, motivations, Willingness to Pay (WTP), adoption friction, and empirical evidence required."
    )
    business_model_and_pricing: str = Field(
        default="",
        description="Comprehensive narrative explaining revenue mechanics, why the model fits customers, unit economics (explaining CAC, LTV, contribution margins for non-experts), and pricing test assumptions."
    )
    mvp_recommendations: str = Field(
        default="",
        description="Sequential narrative explaining the Minimum Viable Product (defining MVP for non-experts), core hypothesis v1.0 must test, essential capabilities vs deferred scope, and user learning loops."
    )
    risk_analysis_narrative: str = Field(
        default="",
        description="Detailed, contextual explanation of major risks, failure modes, root causes, market impact, early warning indicators, and practical founder mitigations."
    )
    technical_operational_feasibility: str = Field(
        default="",
        description="Detailed feasibility narrative detailing technical infrastructure, architecture, operational processes, dependencies, regulatory constraints, and realistic execution barriers."
    )
    overall_assessment: str = Field(
        default="",
        description="Balanced, rigorous concluding synthesis connecting market, customers, competition, unit economics, MVP, and risks. Explains what is promising vs uncertain without false success guarantees."
    )
    recommended_next_steps: str = Field(
        default="",
        description="Actionable, sequential validation narrative explaining the logical order of founder validation tests (7/30/90 days), decision gates, and pivot/kill triggers."
    )