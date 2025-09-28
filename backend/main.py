from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import firebase_admin
from firebase_admin import credentials, auth, firestore
from datetime import datetime
import os
from dotenv import load_dotenv

# ---- Load Gemini API key ----
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# ---- Initialize Firebase ----
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# ---- Initialize FastAPI ----
app = FastAPI()

# ---- CORS ----
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Pydantic Models ----
class RegisterUser(BaseModel):
    name: str
    email: str
    password: str
    goal: str  # e.g., "weight_loss", "weight_gain", "fitness"

class LoginUser(BaseModel):
    email: str
    password: str

class UserProfile(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    diet: Optional[str] = None
    workout_type: Optional[str] = None
    goal: Optional[str] = None
    stress_level: Optional[str] = None

class UpdateProfileResponse(BaseModel):
    status: str
    message: str
    data: dict

class ChatMessage(BaseModel):
    message: str

# ---- Recommendation logic ----
def recommend_yoga(stress: str, goal: str):
    yoga_options = {
        "weight_loss": {
            "high": ["Power Yoga - 30 min", "Vinyasa Flow - 25 min"],
            "medium": ["Hatha Yoga - 20 min", "Vinyasa Flow - 20 min"],
            "low": ["Light Stretching - 15 min", "Gentle Flow - 15 min"]
        },
        "weight_gain": {
            "high": ["Restorative Yoga - 25 min", "Gentle Flow - 20 min"],
            "medium": ["Hatha Yoga - 20 min", "Yin Yoga - 15 min"],
            "low": ["Breathing & Stretching - 15 min", "Light Flow - 10 min"]
        },
        "fitness": {
            "high": ["Power Yoga - 25 min", "Vinyasa Flow - 20 min"],
            "medium": ["Hatha Yoga - 20 min", "Restorative Yoga - 20 min"],
            "low": ["Gentle Stretch - 10 min", "Breathing Exercises - 10 min"]
        },
    }
    return yoga_options.get(goal, yoga_options["fitness"]).get(stress, ["Light Yoga - 10 min"])

def recommend_meditation(stress: str, goal: str):
    meditation_options = {
        "weight_loss": {
            "high": ["Mindfulness Meditation - 15 min", "Body Scan - 15 min"],
            "medium": ["Transcendental Meditation - 15 min", "Loving-Kindness - 15 min"],
            "low": ["Zen Meditation - 10 min", "Yoga Nidra - 10 min"]
        },
        "weight_gain": {
            "high": ["Guided Meditation - 15 min", "Mindful Breathing - 15 min"],
            "medium": ["Loving-Kindness - 10 min", "Breath Awareness - 10 min"],
            "low": ["Yoga Nidra - 10 min", "Gratitude Meditation - 10 min"]
        },
        "fitness": {
            "high": ["Mindfulness Meditation - 15 min", "Focused Breathing - 15 min"],
            "medium": ["Transcendental Meditation - 10 min", "Loving-Kindness - 10 min"],
            "low": ["Zen Meditation - 10 min", "Yoga Nidra - 10 min"]
        },
    }
    return meditation_options.get(goal, meditation_options["fitness"]).get(stress, ["Short Meditation - 10 min"])

def recommend_diet(goal: str):
    diet_options = {
        "weight_loss": {
            "breakfast": ["Oats with fruits", "Green smoothie"],
            "lunch": ["Grilled chicken salad", "Quinoa salad"],
            "snacks": ["Nuts", "Fruit"],
            "dinner": ["Steamed fish", "Vegetables"]
        },
        "weight_gain": {
            "breakfast": ["Eggs & toast", "Banana shake"],
            "lunch": ["Rice & chicken curry", "Paneer salad"],
            "snacks": ["Peanut butter sandwich", "Protein shake"],
            "dinner": ["Fish & rice", "Vegetables"]
        },
        "fitness": {
            "breakfast": ["Greek yogurt with fruits", "Eggs"],
            "lunch": ["Grilled chicken & quinoa", "Vegetables"],
            "snacks": ["Smoothie", "Nuts"],
            "dinner": ["Salmon & veggies", "Brown rice"]
        }
    }
    return diet_options.get(goal, diet_options["fitness"])

# ---- Firebase User Routes ----
@app.post("/register")
def register_user(user: RegisterUser):
    if len(user.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    try:
        fb_user = auth.create_user(email=user.email, password=user.password, display_name=user.name)
        db.collection("users").document(fb_user.uid).set({
            "name": user.name,
            "email": user.email,
            "goal": user.goal,
            "createdAt": datetime.utcnow().isoformat()
        })
        return {"uid": fb_user.uid, "email": user.email, "name": user.name}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/login")
def login_user(user: LoginUser):
    try:
        fb_user = auth.get_user_by_email(user.email)
        profile_doc = db.collection("users").document(fb_user.uid).get()
        profile = profile_doc.to_dict() if profile_doc.exists else {}
        stress = profile.get("stress_level", "medium")
        goal = profile.get("goal", "fitness")
        profile["suggested_yoga"] = recommend_yoga(stress, goal)
        profile["suggested_meditation"] = recommend_meditation(stress, goal)
        return {"uid": fb_user.uid, "email": fb_user.email, "profile": profile}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid login credentials")

@app.get("/user/{uid}")
def get_user(uid: str):
    doc_ref = db.collection("users").document(uid)
    doc_snap = doc_ref.get()
    if not doc_snap.exists:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = doc_snap.to_dict()
    stress = user_data.get("stress_level", "medium")
    goal = user_data.get("goal", "fitness")
    user_data["suggested_yoga"] = recommend_yoga(stress, goal)
    user_data["suggested_meditation"] = recommend_meditation(stress, goal)
    user_data["suggested_diet"] = recommend_diet(goal)

    return {"profile": user_data}

@app.post("/user/{uid}/complete-activity")
def complete_activity(uid: str, data: dict):
    doc_ref = db.collection("users").document(uid)
    user_doc = doc_ref.get()
    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="User not found")
    completed_field = "completedYoga" if data["type"] == "Yoga" else "completedMeditation"
    existing = user_doc.to_dict().get(completed_field, [])
    if data["task"] not in existing:
        existing.append(data["task"])
        doc_ref.update({completed_field: existing})
    return {"status": "success", "completed": existing}

@app.put("/profile/{uid}", response_model=UpdateProfileResponse)
def update_profile(uid: str, profile: UserProfile):
    try:
        doc_ref = db.collection("users").document(uid)
        doc_snap = doc_ref.get()
        update_data = {k: v for k, v in profile.dict(exclude_unset=True).items() if v is not None}
        if not update_data:
            raise HTTPException(status_code=400, detail="No valid fields to update")
        current = doc_snap.to_dict() if doc_snap.exists else {}
        stress = update_data.get("stress_level", current.get("stress_level", "medium"))
        goal = update_data.get("goal", current.get("goal", "fitness"))
        update_data["suggested_yoga"] = recommend_yoga(stress, goal)
        update_data["suggested_meditation"] = recommend_meditation(stress, goal)
        update_data["updatedAt"] = datetime.utcnow().isoformat()
        if doc_snap.exists:
            doc_ref.update(update_data)
        else:
            doc_ref.set({**update_data, "createdAt": datetime.utcnow().isoformat()})
        return {"status": "success", "message": "Profile updated", "data": update_data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ---- Gemini Chatbot route ----
@app.post("/chatbot")
async def chatbot(message: ChatMessage):
    if not message.message.strip():
        raise HTTPException(status_code=400, detail="Message text cannot be empty.")
    try:
        request = gl.GenerateTextRequest(
            model="models/text-bison-001",
            prompt=gl.TextPrompt(text=message.message),
            temperature=0.7,
            max_output_tokens=512
        )
        response = gemini_client.generate_text(request=request)
        reply = response.candidates[0].content if response.candidates else "Sorry, I could not generate a response."
        return {"reply": reply, "status": "success"}
    except gl.Error as api_error:
        raise HTTPException(status_code=500, detail=f"Generative Language API error: {api_error.message}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
