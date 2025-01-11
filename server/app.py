from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os
from flask_cors import CORS


# Load environment variables from .env file
load_dotenv()

# Get API key from the environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure the Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for the app CORS(app)
CORS(app)

# Route to generate content using Gemini API
@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        # Get the data from the request
        data = request.json
        skills = data.get("skills", "")
        job_role = data.get("job_role", "")
        
        if not skills or not job_role:
            return jsonify({"error": "Skills and job role are required"}), 400

        # Create the prompt for the API
        prompt = f"Given the skills '{skills}', identify gaps for the job role '{job_role}' and recommend resources."

        # Use Gemini API to generate content
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)

        # Return the generated response
        return jsonify({"response": response.text})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
