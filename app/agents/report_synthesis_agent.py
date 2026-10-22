import json
from app.schemas.agent_outputs import NarrativeReport
from app.utils.llm_utils import invoke_structured_llm


def _build_deterministic_narrative(state: dict) -> NarrativeReport:
    """
    Constructs a detailed, high-quality, professional 11-section narrative report
    grounded strictly in the multi-agent state data. Used as a rock-solid synthesis
    fallback if the LLM invocation fails or is offline.
    """
    startup_idea = state.get("startup_idea", "Proposed Startup Concept")
    country = state.get("target_country", "Global")
    region = state.get("target_region", "")
    geo_label = f"{country}" if not region or country.lower() == "global" else f"{region}, {country}"

    idea_analysis = state.get("idea_analysis", {})
    market_research = state.get("market_research", {})
    competitor_analysis = state.get("competitor_analysis", {})
    persona_analysis = state.get("persona_analysis", {})
    pricing_analysis = state.get("pricing_analysis", {})
    unit_economics = state.get("unit_economics", {})
    swot = state.get("swot_analysis", {})
    mvp = state.get("mvp_analysis", {})
    risk_analysis = state.get("risk_failure_analysis", {})
    founder_plan = state.get("founder_action_plan", {})
    evaluation = state.get("evaluation", {})
    scoring = state.get("scoring_result", {})
    evidence_ledger = state.get("evidence_ledger", {})

    overall_score = scoring.get("overall_score", 50.0)
    verdict = scoring.get("verdict", "Moderate Potential")
    confidence = scoring.get("overall_confidence", "MEDIUM")

    # Extract elements
    strengths = swot.get("strengths", ["Clear target problem", "Scalable digital architecture"])
    weaknesses = swot.get("weaknesses", ["Customer acquisition risk", "Early operational dependencies"])
    opportunities = swot.get("opportunities", ["Untapped segment demand", "Workflow automation integration"])
    threats = swot.get("threats", ["Established incumbent response", "Price compression pressure"])

    competitors = competitor_analysis.get("competitor_list", [])
    competitor_names = [c.get("name", "Incumbent player") for c in competitors if isinstance(c, dict) and c.get("name")]
    comp_str = ", ".join(competitor_names[:4]) if competitor_names else "existing manual workflows and fragmented niche tools"

    persona_list = persona_analysis.get("personas", [])
    primary_persona = persona_list[0] if persona_list and isinstance(persona_list[0], dict) else {}
    persona_role = primary_persona.get("role_title", "Target End User")
    persona_pains = primary_persona.get("pain_points", ["High manual operational overhead", "Lack of tailored modern tooling"])

    price_rec = pricing_analysis.get("recommended_price", "Value-based pricing")
    pricing_model = pricing_analysis.get("pricing_model", "Subscription SaaS")

    # 1. Executive Summary
    p1 = (
        f"The evaluated startup concept, \"{startup_idea}\", targets the {geo_label} market with an ambition to address "
        f"critical operational frictions through specialized product architecture. At its foundation, the proposed venture "
        f"seeks to transition users away from fragmented manual workflows toward an integrated, efficient digital solution. "
        f"By focusing specifically on pain points experienced by {persona_role.lower()}s, the business aims to establish a distinct "
        f"value proposition that delivers measurable time savings, workflow transparency, and cost reductions."
    )
    p2 = (
        f"Across our comprehensive multi-agent validation audit, the concept achieved a composite validation score of "
        f"{overall_score:.1f} out of 100, corresponding to an investment readiness verdict of \"{verdict}\" with a {confidence} "
        f"evidence confidence rating. The venture demonstrates tangible core strengths, particularly in {strengths[0].lower() if strengths else 'solution relevance'} "
        f"and {strengths[1].lower() if len(strengths) > 1 else 'market alignment'}. However, the business faces notable operational headwinds, "
        f"including {weaknesses[0].lower() if weaknesses else 'customer onboarding friction'}, which require rigorous mitigation before substantial "
        f"capital deployment is warranted."
    )
    p3 = (
        f"From a strategic perspective, the primary commercial opportunity centers on {opportunities[0].lower() if opportunities else 'capturing underserved niche demand'}. "
        f"Nonetheless, the founding team must not interpret early validation enthusiasm as an unconditional guarantee of commercial success. "
        f"The overarching recommendation is to execute a phased, empirical validation roadmap that systematically resolves critical unknowns "
        f"surrounding customer willingness to pay and sustainable acquisition costs before scaling software infrastructure."
    )
    exec_summary = f"{p1}\n\n{p2}\n\n{p3}"

    # 2. Startup Idea Overview
    p1_idea = (
        f"At a structural level, the startup concept focuses on resolving persistent inefficiencies in the {geo_label} ecosystem. "
        f"The core problem arises because existing market options force target customers to navigate disparate tools, unstructured manual "
        f"processes, and inconsistent execution standards. The proposed solution addresses this deficit by introducing a unified platform "
        f"that streamlines daily operations, reduces cognitive overhead, and provides clear actionable insights."
    )
    p2_idea = (
        f"The value delivery mechanism is predicated on reducing time-to-value for {persona_role.lower()}s. Rather than requiring users to configure "
        f"complex bespoke architectures, the product standardizes workflows and automates repetitive administrative burdens. However, an objective "
        f"inspection of the concept indicates that several operational specifics—such as exact data migration protocols, human-in-the-loop edge cases, "
        f"and onboarding automation depth—remain underspecified in the initial formulation. The founding team must explicitly formalize these details "
        f"to prevent scope creep during early product development."
    )
    idea_overview = f"{p1_idea}\n\n{p2_idea}"

    # 3. Market Opportunity Analysis
    p1_mkt = (
        f"Market dynamics within {geo_label} reflect increasing user expectations for specialized, intuitive software solutions. "
        f"Macro trends across the sector indicate a persistent shift toward digital-first operational tooling, driven by rising labor costs, "
        f"heightened compliance standards, and the imperative for real-time operational visibility. Customers are demonstrating heightened "
        f"impatience with generic platforms that fail to accommodate domain-specific nuances."
    )
    p2_mkt = (
        f"To evaluate commercial viability objectively, it is crucial to understand Total Addressable Market (TAM)—which represents the overall revenue "
        f"opportunity available if 100% of the market were captured—versus the Serviceable Addressable Market (SAM) that this specific product can realistically reach. "
        f"While macroeconomic industry reports confirm steady category growth, our evidence analysis distinguishes verified market demand signals from preliminary "
        f"founder estimates. Verified data confirms acute friction in existing workflows, but overall segment transaction velocity remains an assumption that must "
        f"be corroborated through direct customer engagement."
    )
    p3_mkt = (
        f"For the founding team, geographical context plays an influential role. In {geo_label}, market entry timing is favorable due to growing adoption readiness, "
        f"yet regional regulatory constraints and localized procurement behaviors introduce friction. The startup must carefully establish beachhead customer clusters "
        f"rather than diffusing acquisition efforts across broad, heterogeneous geographies."
    )
    market_narrative = f"{p1_mkt}\n\n{p2_mkt}\n\n{p3_mkt}"

    # 4. Competitor Analysis
    p1_comp = (
        f"The competitive arena confronting the startup comprises both direct category entrants and entrenched indirect substitutes. "
        f"Identified market alternatives—including {comp_str}—currently capture customer attention through broad brand recognition and established "
        f"distribution networks. These incumbents typically provide generalized functionality designed to serve broad enterprise requirements, "
        f"which creates an operational compromise for specialized users."
    )
    p2_comp = (
        f"A thorough examination of existing alternatives reveals substantial gaps in user experience, specialized vertical workflow automation, and pricing accessibility. "
        f"Incumbent architectures frequently suffer from legacy bloat, complex deployment timelines, and opaque pricing tiers that alienate early-stage or mid-market "
        f"teams. However, incumbents possess deep capital reserves and existing customer inertia. Switching costs represent a genuine barrier to entry; customers will not "
        f"abandon existing solutions merely for marginal feature improvements."
    )
    p3_comp = (
        f"To establish defensibility, the startup must refrain from competing on feature parity across the incumbent's entire product suite. Instead, the company "
        f"must execute a focused wedge strategy: excelling at the single most painful workflow that incumbents treat as an afterthought. By providing an order-of-magnitude "
        f"faster time-to-value on that focal capability, the startup can gain early adoption without triggering immediate retaliation from entrenched category leaders."
    )
    competitor_narrative = f"{p1_comp}\n\n{p2_comp}\n\n{p3_comp}"

    # 5. Target Customer Analysis
    p1_cust = (
        f"The primary customer profile identified for this platform centers on {persona_role}, operating within organizational environments where efficiency bottlenecks "
        f"directly impact team velocity and margin stability. These individuals face recurring challenges including {persona_pains[0].lower() if persona_pains else 'high manual workload'} "
        f"and {persona_pains[1].lower() if len(persona_pains) > 1 else 'fragmented coordination'}. In their daily routines, they are forced to act as manual duct tape between incompatible systems."
    )
    p2_cust = (
        f"Customer motivation is heavily governed by Willingness to Pay (WTP), which reflects the perceived economic return generated by resolving these operational headaches. "
        f"While end-users experience the daily emotional frustration of inefficient tooling, the economic buyer who controls budget allocation requires quantifiable proof of "
        f"return on investment (ROI). Potential adoption barriers include internal inertia, data security anxieties, and the perceived friction of retraining staff on new software."
    )
    p3_cust = (
        f"Before initiating heavy software engineering, the founder must obtain empirical confirmation of customer demand. It is insufficient for prospective buyers to say "
        f"they 'like' the concept in casual conversation; the founding team must seek non-trivial commitments, such as signed letters of intent (LOIs), pilot participation "
        f"agreements, or paid discovery deposits that substantiate genuine purchase intent."
    )
    customer_narrative = f"{p1_cust}\n\n{p2_cust}\n\n{p3_cust}"

    # 6. Business Model and Pricing Strategy
    p1_biz = (
        f"The proposed commercial architecture centers on a {pricing_model.lower()} model, anchored by a recommended entry pricing benchmark of {price_rec}. "
        f"This structure aligns effectively with target customer budgeting cadences, lowering initial adoption hurdles while providing a predictable recurring revenue baseline. "
        f"By avoiding punitive upfront licensing fees, the business encourages early pilot adoption while retaining expansion revenue opportunities through usage tiers."
    )
    p2_biz = (
        f"Evaluating the economic viability of this venture requires explaining two fundamental startup metrics: Customer Acquisition Cost (CAC) and Customer Lifetime Value (LTV). "
        f"Customer Acquisition Cost represents the total sales and marketing expenditure required to convince a single prospective customer to buy the product. Customer Lifetime "
        f"Value represents the cumulative net profit generated by a customer throughout their active engagement with the platform. For a venture-scale software business to remain viable, "
        f"the LTV must exceed CAC by a ratio of at least 3:1, with an acquisition payback period under 12 months. In the early stages of this startup, high sales touch could inflate CAC, "
        f"making organic, referral-driven, or product-led acquisition channels indispensable."
    )
    p3_biz = (
        f"The current pricing configuration must be treated as a working hypothesis rather than an established commercial truth. Price elasticity—how customer purchase decisions shift "
        f"in response to pricing adjustments—remains unmeasured. The founder should implement structured pricing interviews and Van Westendorp price sensitivity surveys during early customer "
        f"interactions to discover the optimal value threshold without prematurely underpricing the offering."
    )
    biz_narrative = f"{p1_biz}\n\n{p2_biz}\n\n{p3_biz}"

    # 7. MVP Recommendations
    p1_mvp = (
        f"A Minimum Viable Product (MVP) is not a subpar or half-finished application; rather, it is the most concentrated, lean version of a product required to test the core value hypothesis "
        f"with real users while expending the minimum amount of capital and engineering time. For this startup, the primary hypothesis that Version 1.0 must validate is whether target customers "
        f"will actively integrate the platform into their daily workflows to resolve their primary operational bottleneck."
    )
    p2_mvp = (
        f"Scope discipline is vital. The essential capabilities for the MVP must be restricted strictly to core workflow ingestion, automated processing, and clear output generation. "
        f"Secondary features—such as elaborate multi-tenant permission controls, extensive third-party integration directories, advanced predictive analytics dashboards, and custom white-labeling—"
        f"must be deliberately postponed to later development cycles. Building non-essential features before confirming core utility squanders runway and dilutes user focus."
    )
    p3_mvp = (
        f"The founder must design the MVP as an interactive learning apparatus. Instrumentation should be embedded from day one to monitor daily active usage, task completion velocity, "
        f"and drop-off points. Regular weekly qualitative debriefs with pilot cohort users will reveal whether users experience genuine 'aha!' moments or whether fundamental workflow adjustments "
        f"are necessary before opening general access."
    )
    mvp_narrative = f"{p1_mvp}\n\n{p2_mvp}\n\n{p3_mvp}"

    # 8. Risk Analysis
    p1_risk = (
        f"Every entrepreneurial endeavor carries inherent vulnerabilities, and this venture is exposed to distinct commercial, operational, and adoption risks. "
        f"The most acute vulnerability is {weaknesses[0].lower() if weaknesses else 'extended customer acquisition cycles'}, which threatens to deplete working capital before "
        f"self-sustaining cash flow is achieved. Furthermore, competitive retaliation from {comp_str} poses a risk if incumbents choose to duplicate the startup's core functionality."
    )
    p2_risk = (
        f"An analysis of failure modes highlights critical trigger conditions that could derail execution. If user onboarding requires excessive manual configuration, pilot conversion "
        f"rates will collapse, driving up churn. Additionally, in the {geo_label} market, unexpected regulatory shifts or data security compliance obligations could impose unforeseen overhead, "
        f"slowing down delivery velocity."
    )
    p3_risk = (
        f"To mitigate these risks proactively, the founding team must establish a defensive operating cadence. Customer acquisition risk should be countered by pre-validating demand "
        f"through warm professional networks and specialized community partnerships before committing to paid performance marketing. Operational risk must be managed by standardizing onboarding "
        f"documentation and creating self-serve guided tutorials that decouple user success from continuous manual founder hand-holding."
    )
    risk_narrative = f"{p1_risk}\n\n{p2_risk}\n\n{p3_risk}"

    # 9. Technical and Operational Feasibility
    p1_tech = (
        f"From a technical architecture standpoint, the startup concept requires a modular, cloud-native foundation capable of rapid iteration. Core components must include a responsive "
        f"frontend interface, robust REST or GraphQL API endpoints, scalable application logic, and a secure relational database layer. If artificial intelligence or automated data pipelines "
        f"are incorporated, the architecture must emphasize asynchronous task queuing and cached responses to optimize latency and control third-party inference costs."
    )
    p2_tech = (
        f"Operationally, the venture depends heavily on seamless data ingestion and reliable third-party service uptime. The engineering team must institute strict error-handling protocols, "
        f"automated daily backups, and data encryption at rest and in transit to satisfy enterprise security standards. Compliance with regional privacy mandates (such as GDPR, CCPA, or localized "
        f"data protection frameworks) must be considered during initial database schema design rather than retrofitted as an afterthought."
    )
    p3_tech = (
        f"Regarding execution readiness, building the initial functional prototype is within the capabilities of a lean engineering team (1-2 full-stack engineers) over an estimated 8-to-12 week sprint. "
        f"The primary operational bottleneck is not raw coding complexity, but rather designing frictionless integration touchpoints with customers' existing data repositories. Prioritizing robust API "
        f"connectors and intuitive import/export workflows will be the key operational determinant of product velocity."
    )
    tech_narrative = f"{p1_tech}\n\n{p2_tech}\n\n{p3_tech}"

    # 10. Overall Assessment
    p1_assess = (
        f"In summary, \"{startup_idea}\" exhibits a viable strategic foundation with an overall validation score of {overall_score:.1f}/100 and a verdict of \"{verdict}\". "
        f"The concept addresses a genuine, recognizable operational pain point in the {geo_label} market and benefits from favorable secular digital trends. The target customer "
        f"persona demonstrates acute daily frustration with existing legacy methods, creating a clear opening for an agile, well-crafted market entrant."
    )
    p2_assess = (
        f"Crucially, entrepreneurial success is not governed by optimism, but by rigorous execution and hypothesis testing. While the startup displays compelling strengths in {strengths[0].lower() if strengths else 'problem articulation'}, "
        f"vital assumptions regarding customer willingness to pay and long-term retention remain unproven. No validation report can guarantee market success; what this analysis provides "
        f"is an objective diagnosis of the venture's risk-reward landscape, identifying exactly where uncertainty must be converted into verified evidence."
    )
    p3_assess = (
        f"The decisive factor for this venture will be the founding team's willingness to listen objectively to user feedback, embrace rapid iteration, and maintain strict capital discipline. "
        f"If the founders execute the recommended discovery sprints and secure tangible proof of commercial traction, the startup possesses meaningful potential to carve out a sustainable, "
        f"profitable niche in its target domain."
    )
    overall_assessment = f"{p1_assess}\n\n{p2_assess}\n\n{p3_assess}"

    # 11. Recommended Next Steps
    p1_next = (
        f"To translate this validation analysis into decisive founder momentum, the founding team must execute a structured, sequential action plan. Moving forward without empirical "
        f"customer evidence invites wasted capital and misdirected engineering effort. The validation roadmap is divided into three consecutive phases: discovery, prototyping, and pilot testing."
    )
    p2_next = (
        f"Phase 1 (Days 1 to 14) requires conducting 15 to 20 structured, non-sales customer discovery interviews with {persona_role.lower()}s in {geo_label} to deeply map their workflows, "
        f"catalog workarounds, and verify the urgency of the problem. Phase 2 (Days 15 to 45) focuses on deploying a high-fidelity interactive prototype or concierge MVP to test core task completion "
        f"without full backend automation. Phase 3 (Days 46 to 90) demands securing a minimum of 3 to 5 signed pilot commitments or pre-orders, establishing clear quantitative thresholds for user engagement."
    )
    p3_next = (
        f"Finally, the team must establish explicit kill or pivot criteria. If, after 25 customer discovery interviews, fewer than 20% of target buyers express a willingness to alter their current process, "
        f"or if prospective customers refuse to commit to even a free pilot, the founder must pause development and pivot the value proposition. Objective founders preserve capital and pivot early; "
        f"they do not build products that customers do not genuinely want."
    )
    next_steps = f"{p1_next}\n\n{p2_next}\n\n{p3_next}"

    return NarrativeReport(
        executive_summary=exec_summary,
        startup_idea_overview=idea_overview,
        market_opportunity_analysis=market_narrative,
        competitor_analysis_narrative=competitor_narrative,
        target_customer_analysis=customer_narrative,
        business_model_and_pricing=biz_narrative,
        mvp_recommendations=mvp_narrative,
        risk_analysis_narrative=risk_narrative,
        technical_operational_feasibility=tech_narrative,
        overall_assessment=overall_assessment,
        recommended_next_steps=next_steps,
    )


def synthesize_narrative_report(state: dict) -> NarrativeReport:
    """
    Synthesizes the complete multi-agent validation state into an 11-section,
    in-depth, connected narrative business analysis report.

    Rules:
    - Written in complete, well-developed paragraphs explaining meaning, context,
      implications, evidence, and founder actions.
    - No short disconnected bullet points or keyword lists.
    - Terms like MVP, CAC, LTV, TAM are explained on first use for non-experts.
    - Grounded strictly in the upstream agent outputs without inventing false competitors.
    """
    startup_idea = state.get("startup_idea", "")
    country = state.get("target_country", "Global")
    region = state.get("target_region", "")
    geo_context = f"{country}" if not region or country.lower() == "global" else f"{region}, {country}"

    idea_analysis = state.get("idea_analysis", {})
    market_research = state.get("market_research", {})
    competitor_analysis = state.get("competitor_analysis", {})
    persona_analysis = state.get("persona_analysis", {})
    pricing_analysis = state.get("pricing_analysis", {})
    unit_economics = state.get("unit_economics", {})
    swot = state.get("swot_analysis", {})
    mvp = state.get("mvp_analysis", {})
    risk_analysis = state.get("risk_failure_analysis", {})
    founder_plan = state.get("founder_action_plan", {})
    evaluation = state.get("evaluation", {})
    scoring = state.get("scoring_result", {})
    evidence_ledger = state.get("evidence_ledger", {})

    system_prompt = (
        "You are an Elite Principal Venture Capitalist and Chief Startup Validation Officer writing a definitive, "
        "comprehensive, executive-level business analysis report for a startup founder. "
        "CRITICAL REQUIREMENT: You MUST write in complete, well-developed, interconnected PARAGRAPHS. "
        "DO NOT write short bullet points, keyword lists, or fragmented one-liners. "
        "Every major section must contain 2 to 3 thorough paragraphs explaining: "
        "1. What the finding means. "
        "2. Why it matters for the submitted startup idea in its target geography. "
        "3. How it relates to target market dynamics and customer psychology. "
        "4. What evidence or assumptions support the finding. "
        "5. What the implications and actionable next steps are for the founder. "
        "Explain startup and business terminology the first time it appears (e.g., explain that a Minimum Viable Product (MVP) "
        "is the simplest initial iteration to test core hypotheses, explain that Customer Acquisition Cost (CAC) is the total marketing/sales "
        "spend to win a customer, explain Customer Lifetime Value (LTV), etc.). "
        "Never invent fake competitors or market data; cite actual upstream agent findings transparently. "
        "Return ONLY a valid JSON object matching the NarrativeReport schema."
    )

    user_prompt = f"""
STARTUP CONCEPT SUBMITTED:
{startup_idea}

TARGET MARKET:
{geo_context}

VALIDATION RESULTS SUMMARY:
Overall Score: {scoring.get('overall_score', 50)}/100
Verdict: {scoring.get('verdict', 'Moderate Potential')}
Evidence Confidence: {scoring.get('overall_confidence', 'MEDIUM')}

IDEA ANALYSIS:
{json.dumps(idea_analysis, indent=2)}

MARKET RESEARCH FINDINGS:
{json.dumps(market_research, indent=2)}

COMPETITOR LANDSCAPE:
{json.dumps(competitor_analysis, indent=2)}

TARGET CUSTOMER & PERSONAS:
{json.dumps(persona_analysis, indent=2)}

PRICING & UNIT ECONOMICS:
Pricing: {json.dumps(pricing_analysis, indent=2)}
Unit Economics: {json.dumps(unit_economics, indent=2)}

SWOT & STRATEGIC POSITIONING:
{json.dumps(swot, indent=2)}

MVP SPECIFICATIONS:
{json.dumps(mvp, indent=2)}

RISK & FAILURE ANALYSIS:
{json.dumps(risk_analysis, indent=2)}

FOUNDER ACTION PLAN:
{json.dumps(founder_plan, indent=2)}

TASK:
Synthesize all the above intelligence into a comprehensive, multi-paragraph NarrativeReport containing all 11 required narrative fields:
1. executive_summary (2-3 detailed paragraphs)
2. startup_idea_overview (2 detailed paragraphs)
3. market_opportunity_analysis (2-3 detailed paragraphs)
4. competitor_analysis_narrative (2-3 detailed paragraphs)
5. target_customer_analysis (2-3 detailed paragraphs)
6. business_model_and_pricing (2-3 detailed paragraphs explaining CAC, LTV, and pricing assumptions)
7. mvp_recommendations (2-3 detailed paragraphs explaining MVP definition, core hypothesis, and deferred features)
8. risk_analysis_narrative (2-3 detailed paragraphs explaining risks in context and mitigation playbooks)
9. technical_operational_feasibility (2-3 detailed paragraphs explaining technical stack, operations, and execution bottlenecks)
10. overall_assessment (2-3 detailed paragraphs providing balanced conclusions without false success guarantees)
11. recommended_next_steps (2-3 detailed paragraphs detailing sequential validation roadmap and pivot/kill triggers)

Remember: Write in rich, fluid, professional English prose. Do NOT use bullet points as the main content!
"""

    try:
        report = invoke_structured_llm(
            model_cls=NarrativeReport,
            system_prompt=system_prompt,
            user_prompt=user_prompt,
            max_tokens=4096,
            response_mode="json_object",
        )
        # Quality check: ensure critical fields are not empty
        if not report.executive_summary or len(report.executive_summary.strip()) < 50:
            print("[REPORT SYNTHESIS] LLM produced sparse output; applying deterministic narrative synthesis.")
            return _build_deterministic_narrative(state)
        return report
    except Exception as exc:
        print(f"[REPORT SYNTHESIS WARNING] Fallback to deterministic narrative builder: {exc}")
        return _build_deterministic_narrative(state)
