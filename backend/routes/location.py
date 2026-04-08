from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.scoring import analyze_location
from backend.services.gemini_service import get_business_suggestions

router = APIRouter()


class LocationRequest(BaseModel):
    area: str


@router.post("/analyze-location")
def analyze_location_endpoint(request: LocationRequest):
    result = analyze_location(request.area)
    ai_insights = get_business_suggestions(result)

    return {
        "location": result["location"],
        "location_score": result["location_score"],
        "foot_traffic": result["foot_traffic"],
        "competition": result["competition"],
        "spending_power": result["spending_power"],
        "population_density": result["population_density"],
        "demand_trend": result["demand_trend"],
        "area_type": result["area_type"],
        "is_estimated": result["is_estimated"],
        "ai_insights": ai_insights
    }
