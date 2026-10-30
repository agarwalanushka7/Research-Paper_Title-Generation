import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
import os

app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Groq client
client = Groq(api_key="gsk_3mkJFOrSPaTlnA8GlRKkWGdyb3FYhjv18Hx623SYqFRJGDV")  # 🔥 replace this


class InputData(BaseModel):
    abstract: str = ""


@app.post("/generate")
def generate(data: InputData):
    user_input = data.abstract

    prompt = f"""
You are an expert academic researcher.

Generate exactly 5 high-quality research paper titles.

Use:
{user_input}

Rules:
- Max 12 words
- No numbering
- No explanation
- One title per line
"""

    try:
        response = client.chat.completions.create(
           model="llama-3.1-8b-instant",   # ⚡ fast + strong
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )

        output = response.choices[0].message.content

        # ✅ CLEAN TITLES
        titles = []
        for line in output.split("\n"):
            clean = line.strip().strip("-").strip()
            clean = clean.replace('"', '').replace("\\", "")
            clean = clean.lstrip("0123456789. )(")

            if clean and len(clean) > 5:
                titles.append(clean)

        titles = list(dict.fromkeys(titles))

        return {"titles": titles[:5]}

    except Exception as e:
        return {"titles": [f"Error: {str(e)}"]}