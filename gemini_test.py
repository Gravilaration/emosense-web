import requests

headers = {
    "Authorization": "Bearer ffb0822c0b95a21cb3476f31d01c8cc18d80077e94f81ceccec771cfb4b1dced",
    "Content-Type": "application/json"
}

data = {
    "model": "mistralai/Mistral-7B-Instruct-v0.1",
    "prompt": "Explain black holes like I’m 5 years old.",
    "max_tokens": 100,
    "temperature": 0.7
}

response = requests.post("https://api.together.xyz/v1/completions", headers=headers, json=data)

print(response.json()['choices'][0]['text'])
