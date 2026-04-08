import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
else:
    model = None


def get_business_suggestions(location_data):
    if not model:
        return "AI insights unavailable. Add GEMINI_API_KEY to .env"

    prompt = f"""Based on the following location data:

- Foot Traffic: {location_data['raw_metrics']['foot_traffic']}/100
- Competition: {location_data['raw_metrics']['competition']}/100
- Spending Power: {location_data['raw_metrics']['spending_power']}/100
- Population Density: {location_data['raw_metrics']['population_density']}/100
- Area Type: {location_data['area_type']}
- Demand Trend: {location_data['demand_trend']}

Suggest 2 best businesses for this location and explain why each would work well. Keep it brief and practical."""

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"AI analysis unavailable: {str(e)}"


def explain_locations(product, locations):
    if not model:
        return "AI insights unavailable. Add GEMINI_API_KEY to .env"

    locations_str = "\n".join([
        f"- {loc['area']} (Score: {loc['score']}, Type: {loc['area_type']})"
        for loc in locations
    ])

    prompt = f"""Given the product "{product}" and these top recommended locations:

{locations_str}

Explain briefly why these locations are suitable for this business. Keep it under 3 sentences per location."""

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"AI analysis unavailable: {str(e)}"
