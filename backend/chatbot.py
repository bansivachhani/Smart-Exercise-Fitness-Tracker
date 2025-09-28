from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google.ai import generativelanguage as gl
from google.oauth2 import service_account
from pathlib import Path
import json

# -----------------------------
# Load service account JSON
# -----------------------------
key_path = Path(__file__).parent / "geminiKey.json"
with open(key_path) as f:
    creds_dict = json.load(f)

creds = service_account.Credentials.from_service_account_info(creds_dict)

# -----------------------------
# Initialize Gemini client
# -----------------------------
client = gl.TextServiceClient(credentials=creds)

# -----------------------------
# FastAPI app
# -----------------------------
app = FastAPI(title="Gemini Chatbot API")

# Allow requests from frontend (adjust origin if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins or specify your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Request model
# -----------------------------
class ChatMessage(BaseModel):
    text: str

# -----------------------------
# Chatbot endpoint
# -----------------------------
@app.post("/chatbot")
async def chatbot(message: ChatMessage):
    if not message.text.strip():
        raise HTTPException(status_code=400, detail="Message text cannot be empty.")

    try:
        request = gl.GenerateTextRequest(
            model="models/text-bison-001",  # Gemini 1.5 text model
            prompt=gl.TextPrompt(text=message.text),
            temperature=0.7,
            max_output_tokens=512
        )
        response = client.generate_text(request=request)

        if response.candidates:
            reply = response.candidates[0].content
        else:
            reply = "Sorry, I could not generate a response."

        return {"reply": reply, "status": "success"}

    except gl.Error as api_error:
        # Handle APaI-specific errors
        raise HTTPException(status_code=500, detail=f"Generative Language API error: {api_error.message}")
    except Exception as e:
        # Catch-all for other errors
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
