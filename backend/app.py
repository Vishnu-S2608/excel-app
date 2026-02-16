import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai

# -----------------------------
# Load environment variables
# -----------------------------
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("❌ GEMINI_API_KEY not found in .env file")

# -----------------------------
# Create Gemini Client
# -----------------------------
client = genai.Client(api_key=API_KEY)

# -----------------------------
# Initialize Flask
# -----------------------------
app = Flask(__name__)
CORS(app)


# -----------------------------
# Prompt Builder
# -----------------------------
def build_prompt(user_input):
    return f"""
You are an expert environmental engineer and agricultural scientist.

Analyze the following wastewater reuse scenario carefully.

Wastewater Type:
{user_input.get("wastewater_type")}

Water Quality Parameters:
{json.dumps(user_input.get("parameters"), indent=2)}

Climate & Environmental Conditions:
{json.dumps(user_input.get("climate_environment"), indent=2)}

IMPORTANT:
Base your reasoning strictly on the provided numerical input values.
Explain clearly WHY each decision is made.
Be concise but scientifically accurate.

Return ONLY valid JSON in this exact structure:

{{
  "suitability_status": "",
  "suitability_reason": "",
  "recommended_crops": [
    {{
      "crop": "",
      "risk": "",
      "reason": ""
    }}
  ],
  "unsafe_crops": [
    {{
      "crop": "",
      "reason": ""
    }}
  ],
  "health_environmental_risk": "",
  "health_risk_reason": "",
  "disease_indicators": [
    {{
      "disease": "",
      "reason": ""
    }}
  ],
  "precautions": [
    {{
      "measure": "",
      "reason": ""
    }}
  ],
  "maintenance_suggestions": [
    {{
      "suggestion": "",
      "reason": ""
    }}
  ],
  "sustainability_score": "",
  "sustainability_reason": ""
}}

DO NOT include markdown.
DO NOT include explanations outside JSON.
"""


# -----------------------------
# Routes
# -----------------------------
@app.route("/")
def home():
    return jsonify({"message": "AI Wastewater Crop Recommendation Backend Running 🚀"})


@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        user_input = request.json

        if not user_input:
            return jsonify({"error": "No input data provided"}), 400

        prompt = build_prompt(user_input)

        # 🔥 Force Gemini to return proper JSON
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "temperature": 0.2
            }
        )

        raw_text = response.text.strip()

        # Direct JSON parse (since we forced JSON mode)
        parsed_output = json.loads(raw_text)

        return jsonify(parsed_output)

    except json.JSONDecodeError:
        return jsonify({
            "error": "Failed to parse JSON from LLM.",
            "raw_response": raw_text
        }), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# -----------------------------
# Run Server
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
