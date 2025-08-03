from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

TOGETHER_API_KEY = "43df21324273dbee0687d8624ebeb189600826e86c142de16d065f7f0229a673"

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")

    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "mistralai/Mistral-7B-Instruct-v0.1",  # ✅ reliable free model
        "prompt": user_message,
        "max_tokens": 150,
        "temperature": 0.7
    }

    response = requests.post("https://api.together.xyz/v1/completions", headers=headers, json=data)

    if response.status_code == 200:
        reply = response.json()['choices'][0]['text'].strip()
        return jsonify({"reply": reply})
    else:
        return jsonify({"error": response.text}), response.status_code

if __name__ == '__main__':
    app.run(debug=True, port=5000)
