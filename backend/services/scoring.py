import json
import os
from backend.services.fallback import get_fallback_data

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(BASE_DIR, "data", "areas.json"), "r") as f:
    AREAS_DATA = json.load(f)["areas"]

with open(os.path.join(BASE_DIR, "data", "products.json"), "r") as f:
    PRODUCTS_DATA = json.load(f)["products"]


def get_label(value):
    if value <= 40:
        return "Low"
    elif value <= 70:
        return "Medium"
    else:
        return "High"


def calculate_location_score(data):
    score = (
        (0.3 * data["foot_traffic"]) +
        (0.25 * data["spending_power"]) +
        (0.2 * (100 - data["competition"])) +
        (0.25 * data["population_density"])
    )
    return round(score)


def get_area_data(area_name):
    area_key = area_name.strip().title()
    if area_key in AREAS_DATA:
        data = AREAS_DATA[area_key].copy()
        data["is_estimated"] = False
        return data
    return get_fallback_data()


def analyze_location(area_name):
    raw_data = get_area_data(area_name)
    is_estimated = raw_data.get("is_estimated", False)

    location_score = calculate_location_score(raw_data)

    return {
        "location": area_name,
        "location_score": location_score,
        "foot_traffic": f"{get_label(raw_data['foot_traffic'])} ({raw_data['foot_traffic']}/100)",
        "competition": f"{get_label(raw_data['competition'])} ({raw_data['competition']}/100)",
        "spending_power": f"{get_label(raw_data['spending_power'])} ({raw_data['spending_power']}/100)",
        "population_density": f"{{get_label(raw_data['population_density'])}} ({raw_data['population_density']}/100)",
        "demand_trend": raw_data["demand_trend"],
        "area_type": raw_data["area_type"],
        "is_estimated": is_estimated,
        "raw_metrics": {
            "foot_traffic": raw_data["foot_traffic"],
            "competition": raw_data["competition"],
            "spending_power": raw_data["spending_power"],
            "population_density": raw_data["population_density"]
        }
    }


def calculate_product_match_score(area_data, product_criteria):
    ft_score = min(area_data["foot_traffic"] / product_criteria["min_foot_traffic"], 1.0) * 100
    sp_score = min(area_data["spending_power"] / product_criteria["min_spending_power"], 1.0) * 100
    comp_score = max(0, (product_criteria["max_competition"] - area_data["competition"]) / product_criteria["max_competition"]) * 100

    area_type_match = 100 if area_data["area_type"] in product_criteria["preferred_area_types"] else 50

    demand_match = 100 if area_data["demand_trend"] == product_criteria["demand_preference"] else 70

    final_score = (
        (0.30 * ft_score) +
        (0.25 * sp_score) +
        (0.20 * comp_score) +
        (0.15 * area_type_match) +
        (0.10 * demand_match)
    )

    return round(final_score)


def analyze_product(product_name):
    product_key = product_name.strip().lower().replace(" ", "_")

    if product_key not in PRODUCTS_DATA:
        return None

    product_criteria = PRODUCTS_DATA[product_key]
    recommendations = []

    for area_name, area_data in AREAS_DATA.items():
        score = calculate_product_match_score(area_data, product_criteria)
        recommendations.append({
            "area": area_name,
            "score": score,
            "area_type": area_data["area_type"],
            "raw_data": area_data
        })

    recommendations.sort(key=lambda x: x["score"], reverse=True)
    top_3 = recommendations[:3]

    return {
        "product": product_name,
        "recommendations": [
            {
                "area": rec["area"],
                "score": rec["score"],
                "area_type": rec["area_type"]
            }
            for rec in top_3
        ]
    }
