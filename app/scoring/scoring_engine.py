from typing import Any

WEIGHTS = {
    "market_demand": 0.20,
    "customer_need": 0.20,
    "competition": 0.15,
    "business_potential": 0.15,
    "pricing_potential": 0.10,
    "feasibility": 0.10,
    "mvp_clarity": 0.10,
}


def calculate_validation_score(evaluation: Any) -> dict:
    """
    Calculate the deterministic startup validation score.
    Includes numerical score (0-100), verdict, and evidence confidence score.
    """
    weighted_scores = {}
    confidence_counts = {"HIGH": 0, "MEDIUM": 0, "LOW": 0}

    for criterion, weight in WEIGHTS.items():
        criterion_obj = getattr(evaluation, criterion)
        criterion_score = criterion_obj.score
        confidence = getattr(criterion_obj, "confidence", "MEDIUM")

        weighted_scores[criterion] = (criterion_score / 10) * (weight * 100)
        confidence_counts[confidence.upper()] = confidence_counts.get(confidence.upper(), 0) + 1

    overall_score = round(sum(weighted_scores.values()), 2)

    # Determine overall evidence confidence
    if confidence_counts["HIGH"] >= 4:
        overall_confidence = "HIGH"
    elif confidence_counts["LOW"] >= 3:
        overall_confidence = "LOW"
    else:
        overall_confidence = getattr(evaluation, "overall_confidence", "MEDIUM")

    verdict = get_verdict(overall_score)

    return {
        "weighted_scores": weighted_scores,
        "overall_score": overall_score,
        "overall_confidence": overall_confidence,
        "verdict": verdict,
    }


def get_verdict(score: float) -> str:
    if score < 40:
        return "High Risk"
    if score < 60:
        return "Weak Potential"
    if score < 75:
        return "Moderate Potential"
    if score < 90:
        return "Strong Potential"
    return "Excellent Potential"