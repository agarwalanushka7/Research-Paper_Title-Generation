import requests

def generate_title(data):
    abstract = data.get("abstract", "")

    prompt = f"""
You are an expert academic writer.

Generate exactly 5 SHORT and CRISP research paper titles.

Rules:
- Max 12 words per title
- No numbering
- No explanations
- Avoid long sentences
- Make them impactful and clean
- Each title on a new line

Abstract:
{abstract}
"""

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "phi3",
                "prompt": prompt,
                "stream": False
            }
        )

        output = response.json().get("response", "")

        # Clean titles
        titles = []
        for line in output.split("\n"):
            clean = line.strip().strip("-").strip()
            clean = clean.lstrip("0123456789. )(")

            if clean and len(clean) > 5:
                titles.append(clean)

        # Remove duplicates
        titles = list(dict.fromkeys(titles))

        return titles[:5]

    except Exception as e:
        return [f"Error: {str(e)}"]