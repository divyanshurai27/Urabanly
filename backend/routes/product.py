from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.scoring import analyze_product
from backend.services.gemini_service import explain_locations

router = APIRouter()


class ProductRequest(BaseModel):
    product: str


@router.post("/analyze-product")
def analyze_product_endpoint(request: ProductRequest):
    result = analyze_product(request.product)

    if not result:
        raise HTTPException(status_code=400, detail="Product not found")

    ai_reasoning = explain_locations(request.product, result["recommendations"])

    return {
        "product": result["product"],
        "recommendations": [
            {
                "area": rec["area"],
                "score": rec["score"],
                "area_type": rec["area_type"],
                "ai_reasoning": ai_reasoning if i == 0 else ""
            }
            for i, rec in enumerate(result["recommendations"])
        ]
    }
