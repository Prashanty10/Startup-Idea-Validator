from pydantic import BaseModel, Field, field_validator, ValidationInfo


class StartupValidationRequest(BaseModel):
    startup_idea: str = Field(
        min_length=10,
        description="Startup idea provided by the user."
    )

    target_country: str = Field(
        default="Global",
        min_length=2,
        description="Compulsory target country/market for the startup, e.g. 'Global' or a specific country."
    )

    target_region: str = Field(
        default="",
        description="Optional state, city, or region within the target country. Not required or ignored when country is Global."
    )

    @field_validator("target_country")
    @classmethod
    def validate_target_country(cls, v: str) -> str:
        cleaned = (v or "").strip()
        if not cleaned:
            raise ValueError("Target country is compulsory. Please select a country or 'Global'.")
        if cleaned.lower() == "global":
            return "Global"
        return cleaned

    @field_validator("target_region")
    @classmethod
    def validate_target_region(cls, v: str, info: ValidationInfo) -> str:
        if not v:
            return ""
        cleaned = v.strip()
        country = info.data.get("target_country", "") if info.data else ""
        if country and country.lower() == "global":
            return ""
        return cleaned


class ResearchSource(BaseModel):
    title: str = ""
    author: str = ""
    source_type: str = ""
    page: str = ""
    doi: str = ""
    source: str = ""
    category: str = ""


class StartupValidationResponse(BaseModel):
    startup_idea: str
    target_country: str
    target_region: str

    overall_score: float = Field(
        ge=0,
        le=100
    )

    evidence_confidence: str = Field(
        default="MEDIUM",
        description="Overall evidence confidence: HIGH, MEDIUM, or LOW."
    )

    verdict: str
    summary: str

    key_strengths: list[str] = Field(default_factory=list)
    key_weaknesses: list[str] = Field(default_factory=list)
    opportunities: list[str] = Field(default_factory=list)
    threats: list[str] = Field(default_factory=list)

    idea_analysis: dict = Field(default_factory=dict)
    research_plan: dict = Field(default_factory=dict)
    evidence_ledger: dict = Field(default_factory=dict)
    market_research: dict = Field(default_factory=dict)
    competitor_analysis: dict = Field(default_factory=dict)
    persona_analysis: dict = Field(default_factory=dict)
    pricing_analysis: dict = Field(default_factory=dict)
    unit_economics: dict = Field(default_factory=dict)
    mvp_analysis: dict = Field(default_factory=dict)
    swot_analysis: dict = Field(default_factory=dict)
    risk_failure_analysis: dict = Field(default_factory=dict)
    critical_unknowns: list[dict] = Field(default_factory=list)
    failure_scenarios: list[dict] = Field(default_factory=list)
    validation_experiments: list[dict] = Field(default_factory=list)
    founder_action_plan: dict = Field(default_factory=dict)
    evaluation: dict = Field(default_factory=dict)
    critic_report: dict = Field(default_factory=dict)
    narrative_report: dict = Field(default_factory=dict)

    research_sources: list[ResearchSource] = Field(default_factory=list)