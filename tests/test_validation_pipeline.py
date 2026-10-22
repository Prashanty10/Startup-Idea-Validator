from app.graph.graph import build_startup_validation_graph
from app.main import build_api_response


def test_startup_validation_pipeline_structure():
    graph = build_startup_validation_graph()

    mock_state = {
        "startup_idea": "A subscription-based healthy meal delivery service for working professionals in Pune.",
        "target_country": "India",
        "target_region": "Maharashtra",
        "idea_analysis": {
            "startup_name": "NutriBox Pune",
            "one_line_description": "Calorie-controlled meal subscription for busy workers.",
            "problem_statement": "Working professionals lack healthy affordable daily meals.",
            "proposed_solution": "Subscription meal delivery box.",
            "target_industry": "FoodTech / D2C",
            "target_customer": "Working professionals in Pune",
            "primary_user": "Office employees",
            "buyer": "Working professionals",
            "beneficiary": "Health-conscious workers",
            "geography": "Pune, Maharashtra",
            "primary_category": "D2C",
            "secondary_categories": ["Subscription", "FoodTech"],
            "business_model": "Subscription",
            "revenue_model": "Monthly subscription fee",
            "key_value_proposition": "Nutritious home-cooked meals delivered daily",
            "acquisition_channels": ["Instagram Ads", "Corporate ties"],
            "key_assumptions": ["Workers willing to pay ₹150/meal"],
            "critical_unknowns": ["Daily delivery logisitics feasibility"]
        },
        "research_plan": {
            "business_model_type": "D2C / Subscription",
            "required_information": ["COGS", "Delivery logistics", "Repeat order rate"],
            "key_questions_to_answer": ["What is customer WTP?"],
            "market_queries": ["Healthy meal delivery Pune"],
            "competitor_queries": ["Meal delivery Pune competitors"],
            "pricing_queries": ["Tiffin service pricing Pune"],
            "regulatory_queries": ["FSSAI compliance food delivery"]
        },
        "evidence_ledger": {
            "supported_claims": [],
            "inferred_claims": [],
            "assumptions": [{"claim": "Users will stay subscribed 3+ months", "status": "ASSUMPTION", "confidence": "LOW"}],
            "unknowns": [{"claim": "Logistics cost per meal", "status": "UNKNOWN", "confidence": "LOW"}],
            "overall_confidence": "MEDIUM"
        },
        "market_research": {
            "market_demand": "High demand in IT parks",
            "industry_trends": ["Healthy eating rise"],
            "target_market": "Pune tech workers",
            "growth_drivers": ["Urbanization"],
            "customer_problems": ["Lack of time to cook"],
            "opportunities": ["Corporate partnerships"],
            "evidence": []
        },
        "competitor_analysis": {
            "direct_competitors": [{"name": "EatClub", "competitor_type": "DIRECT", "product": "Meal box", "pricing": "₹199/meal", "strengths": ["Scale"], "weaknesses": ["Price"]}],
            "indirect_competitors": [],
            "substitutes": [{"name": "Local Dabba Services", "competitor_type": "SUBSTITUTE", "product": "Home dabba", "pricing": "₹100/meal", "strengths": ["Cheap"], "weaknesses": ["Oil/Quality"]}],
            "competitor_list": [],
            "market_gaps": ["Calorie-tracked macro balance"],
            "competitive_risks": ["Low switching costs"],
            "differentiation_clarity": "Moderate"
        },
        "persona_analysis": {
            "personas": [{
                "name": "Ananya", "role": "Software Engineer", "business_type": "Consumer",
                "goals": ["Eat healthy"], "pain_points": ["No time"], "needs": ["Low oil meal"],
                "willingness_to_pay": "₹150-₹200 / meal", "willingness_to_pay_confidence": "MEDIUM"
            }]
        },
        "pricing_analysis": {
            "pricing_model": "Subscription",
            "recommended_price": "₹3,999 / month (22 meals)",
            "pricing_tiers": [],
            "pricing_rationale": ["Fits Pune office budget"],
            "pricing_risks": ["Price sensitivity"],
            "pricing_confidence": "MEDIUM",
            "validation_experiment": "Pre-order campaign"
        },
        "unit_economics": {
            "is_applicable": True,
            "business_model_type": "D2C Subscription",
            "revenue_per_customer": "₹3,999 / mo",
            "variable_cost": "₹2,200 / mo",
            "contribution_margin": "₹1,799 / mo (45%)",
            "gross_margin_estimate": "45%",
            "estimated_cac": "Unknown — requires validation",
            "estimated_ltv": "Unknown — requires validation",
            "ltv_cac_ratio": "Unknown — requires validation",
            "cac_payback_months": "Unknown — requires validation",
            "aov_estimate": "₹3,999",
            "repeat_purchase_rate": "Unknown — requires validation",
            "unproven_financial_assumptions": ["CAC below ₹500"],
            "how_to_validate_unit_economics": ["Run Instagram ad campaign to test CPA"]
        },
        "swot_analysis": {
            "strengths": ["Healthy positioning"],
            "weaknesses": ["Delivery logistics complexity"],
            "opportunities": ["B2B corporate meal subscriptions"],
            "threats": ["Zomato/Swiggy dark kitchens"]
        },
        "mvp_analysis": {
            "core_features": [{"name": "Weekly meal selection menu", "priority": 1}],
            "future_features": [],
            "excluded_features": [],
            "development_priority": [],
            "mvp_rationale": []
        },
        "risk_failure_analysis": {
            "critical_unknowns": [{"unknown": "Can delivery cost stay below ₹30/meal?", "category": "Logistics", "impact": "HIGH", "uncertainty": "HIGH", "priority_score": "CRITICAL", "how_to_validate": "Pilot test with 20 users"}],
            "failure_scenarios": [{"scenario": "Logistics Margin Erosion", "why_it_could_happen": "Delivery partners charge high per-trip rate", "evidence_or_precedent": "Failed cloud kitchens", "impact": "HIGH", "early_warning_signal": "Delivery cost > 25% of meal price", "mitigation_strategy": "Batch delivery to office buildings", "validation_experiment": "Run 7-day manual delivery batch"}]
        },
        "validation_experiments": [
          {
            "hypothesis": "At least 20% of office workers will pre-order a 1-week meal pass for ₹999",
            "experiment": "Create WhatsApp landing page and run targeted Meta ads",
            "target_audience": "Tech workers in Hinjewadi",
            "sample_size": "200 visitors",
            "success_metric": ">= 10 paid pre-orders",
            "failure_threshold": "< 3 pre-orders",
            "estimated_effort": "3 days",
            "expected_learning": "Direct WTP signal",
            "decision_if_pass": "Proceed to kitchen partner setup",
            "decision_if_fail": "Adjust price point or value prop"
          }
        ],
        "founder_action_plan": {
          "seven_day_plan": ["Interview 15 target workers", "Test ₹999 pricing on landing page"],
          "thirty_day_plan": ["Run 20-person 2-week concierge pilot"],
          "ninety_day_plan": ["Optimize unit economics and assess retention"]
        },
        "evaluation": {
            "market_demand": {"score": 7, "confidence": "MEDIUM", "reason": "Good urban demand", "evidence": []},
            "customer_need": {"score": 8, "confidence": "HIGH", "reason": "Clear pain point", "evidence": []},
            "competition": {"score": 5, "confidence": "MEDIUM", "reason": "High competition from dabbas/Zomato", "evidence": []},
            "business_potential": {"score": 6, "confidence": "MEDIUM", "reason": "Decent margin if batch delivery works", "evidence": []},
            "pricing_potential": {"score": 6, "confidence": "LOW", "reason": "Unproven WTP for subscription", "evidence": []},
            "feasibility": {"score": 6, "confidence": "MEDIUM", "reason": "Requires reliable food prep & delivery", "evidence": []},
            "mvp_clarity": {"score": 8, "confidence": "HIGH", "reason": "Concierge test is easy to run", "evidence": []},
            "overall_confidence": "MEDIUM"
        },
        "critic_report": {
            "is_valid": True,
            "hallucinations_detected": False,
            "unsupported_claims": [],
            "contradictions_found": [],
            "confidence_adjustment": "NO_CHANGE",
            "critic_notes": "Clean validation audit."
        },
        "scoring_result": {
            "weighted_scores": {},
            "overall_score": 66.5,
            "overall_confidence": "MEDIUM",
            "verdict": "Moderate Potential"
        }
    }

    response = build_api_response(mock_state)

    assert response.overall_score == 66.5
    assert response.evidence_confidence == "MEDIUM"
    assert response.verdict == "Moderate Potential"
    assert "unit_economics" in response.model_dump()
    assert "critical_unknowns" in response.model_dump()
    assert "failure_scenarios" in response.model_dump()
    assert "validation_experiments" in response.model_dump()
    assert "founder_action_plan" in response.model_dump()
    print("Test passed successfully!")