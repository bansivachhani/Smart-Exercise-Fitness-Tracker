from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, auth, firestore
from datetime import datetime
import requests
import os
from dotenv import load_dotenv

# ---- Load Gemini API key ----
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# ---- Initialize Firebase ----
cred = credentials.Certificate("serviceAccountKey.json")  # Firebase service account
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
    name: str | None = None
    age: int | None = None
    height: float | None = None
    weight: float | None = None
    diet: str | None = None
    workout_type: str | None = None
    goal: str | None = None
    stress_level: str | None = None  # high, medium, low
    

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
            "high": [
                "Power Yoga - 30 min",
                "Vinyasa Flow - 25 min",
                "Dynamic Flow - 20 min",
                "Hatha Yoga - 20 min",
                "Sun Salutation Series - 15 min"
            ],
            "medium": [
                "Hatha Yoga - 20 min",
                "Vinyasa Flow - 20 min",
                "Yin Yoga - 20 min",
                "Core Strength Yoga - 15 min",
                "Breathing & Stretch - 15 min"
            ],
            "low": [
                "Light Stretching - 15 min",
                "Gentle Flow - 15 min",
                "Breathing & Relaxation - 10 min",
                "Seated Yoga - 10 min",
                "Neck & Shoulder Stretch - 10 min"
            ],
        },
        "weight_gain": {
            "high": [
                "Restorative Yoga - 25 min",
                "Gentle Flow - 20 min",
                "Hatha Yoga - 20 min",
                "Yin Yoga - 20 min",
                "Relaxing Flow - 15 min"
            ],
            "medium": [
                "Hatha Yoga - 20 min",
                "Yin Yoga - 15 min",
                "Gentle Stretch - 15 min",
                "Breathing & Core Flow - 15 min",
                "Meditative Flow - 15 min"
            ],
            "low": [
                "Breathing & Stretching - 15 min",
                "Light Flow - 10 min",
                "Seated Yoga - 10 min",
                "Gentle Neck & Shoulder - 10 min",
                "Relaxation Flow - 10 min"
            ],
        },
        "fitness": {
            "high": [
                "Power Yoga - 25 min",
                "Vinyasa Flow - 20 min",
                "Dynamic Flow - 20 min",
                "Hatha Yoga - 20 min",
                "Strength & Balance Yoga - 20 min"
            ],
            "medium": [
                "Hatha Yoga - 20 min",
                "Restorative Yoga - 20 min",
                "Gentle Flow - 15 min",
                "Core Strength Yoga - 15 min",
                "Breathing & Stretch - 15 min"
            ],
            "low": [
                "Gentle Stretch - 10 min",
                "Breathing Exercises - 10 min",
                "Seated Yoga - 10 min",
                "Neck & Shoulder Relax - 10 min",
                "Light Flow - 10 min"
            ],
        },
    }

    return yoga_options.get(goal, yoga_options["fitness"]).get(stress, ["Light Yoga - 10 min"])


def recommend_meditation(stress: str, goal: str):
    meditation_options = {
        "weight_loss": {
            "high": [
                "Mindfulness Meditation - 15 min",
                "Body Scan - 15 min",
                "Focused Breath - 15 min",
                "Guided Visualization - 15 min",
                "Energy Reset Meditation - 10 min"
            ],
            "medium": [
                "Transcendental Meditation - 15 min",
                "Loving-Kindness - 15 min",
                "Breath Awareness - 15 min",
                "Zen Meditation - 10 min",
                "Short Guided Meditation - 10 min"
            ],
            "low": [
                "Zen Meditation - 10 min",
                "Yoga Nidra - 10 min",
                "Relaxation Breath - 10 min",
                "Mindful Listening - 10 min",
                "Short Visualization - 10 min"
            ],
        },
        "weight_gain": {
            "high": [
                "Guided Meditation - 15 min",
                "Mindful Breathing - 15 min",
                "Body Scan - 15 min",
                "Relaxation Meditation - 15 min",
                "Energy Balance Meditation - 10 min"
            ],
            "medium": [
                "Loving-Kindness - 10 min",
                "Breath Awareness - 10 min",
                "Focused Meditation - 10 min",
                "Mindfulness - 10 min",
                "Short Visualization - 10 min"
            ],
            "low": [
                "Yoga Nidra - 10 min",
                "Gratitude Meditation - 10 min",
                "Breathing Relaxation - 10 min",
                "Seated Mindfulness - 10 min",
                "Short Guided Meditation - 10 min"
            ],
        },
        "fitness": {
            "high": [
                "Mindfulness Meditation - 15 min",
                "Focused Breathing - 15 min",
                "Guided Visualization - 15 min",
                "Energy Reset Meditation - 15 min",
                "Body Scan - 10 min"
            ],
            "medium": [
                "Transcendental Meditation - 10 min",
                "Loving-Kindness - 10 min",
                "Breath Awareness - 10 min",
                "Short Guided Meditation - 10 min",
                "Mindful Listening - 10 min"
            ],
            "low": [
                "Zen Meditation - 10 min",
                "Yoga Nidra - 10 min",
                "Relaxation Breath - 10 min",
                "Short Visualization - 10 min",
                "Gentle Mindfulness - 10 min"
            ],
        },
    }

    return meditation_options.get(goal, meditation_options["fitness"]).get(stress, ["Short Meditation - 10 min"])

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
        # Add dynamic suggestions
        stress = profile.get("stress_level", "medium")
        goal = profile.get("goal", "fitness")
        profile["suggested_yoga"] = recommend_yoga(stress, goal)
        profile["suggested_meditation"] = recommend_meditation(stress, goal)
        return {"uid": fb_user.uid, "email": fb_user.email, "profile": profile}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid login credentials")

@app.get("/user/{uid}")
def get_user(uid: str):
    try:
        doc_ref = db.collection("users").document(uid)
        doc_snap = doc_ref.get()
        if not doc_snap.exists:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = doc_snap.to_dict()
        # Add suggestions dynamically if needed
        stress = user_data.get("stress_level", "medium")
        goal = user_data.get("goal", "fitness")
        user_data["suggested_yoga"] = recommend_yoga(stress, goal)
        user_data["suggested_meditation"] = recommend_meditation(stress, goal)

        return {"profile": user_data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/user/{uid}/complete-activity")
def complete_activity(uid: str, data: dict):
    """
    data = {
      "task": "Light Yoga - 10 min",
      "type": "Yoga",
      "date": "2025-09-27"
    }
    """
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

        # ---- Build update data ----
        update_data = {
            k: v for k, v in profile.dict(exclude_unset=True).items() if v is not None
        }

        if not update_data:
            raise HTTPException(status_code=400, detail="No valid fields to update")

        # If document doesn't exist, create with defaults
        if not doc_snap.exists:
            # default safe values
            stress = update_data.get("stress_level", "medium")
            goal = update_data.get("goal", "fitness")

            new_profile = {
                "uid": uid,
                "name": update_data.get("name", ""),
                "age": update_data.get("age"),
                "height": update_data.get("height"),
                "weight": update_data.get("weight"),
                "diet": update_data.get("diet", ""),
                "workout_type": update_data.get("workout_type", ""),
                "goal": goal,
                "stress_level": stress,
                "suggested_yoga": recommend_yoga(stress, goal),
                "suggested_meditation": recommend_meditation(stress, goal),
                "createdAt": datetime.utcnow().isoformat(),
                "updatedAt": datetime.utcnow().isoformat(),
            }

            doc_ref.set(new_profile)
            return {
                "status": "success",
                "message": "Profile created",
                "data": new_profile,
            }

        # ---- If doc exists, update it ----
        current = doc_snap.to_dict() or {}
        stress = update_data.get("stress_level", current.get("stress_level", "medium"))
        if stress not in ["low", "medium", "high"]:
            stress = "medium"

        goal = update_data.get("goal", current.get("goal", "fitness"))
        if goal not in ["weight_loss", "weight_gain", "fitness"]:
            goal = "fitness"

        update_data["suggested_yoga"] = recommend_yoga(stress, goal)
        update_data["suggested_meditation"] = recommend_meditation(stress, goal)
        update_data["updatedAt"] = datetime.utcnow().isoformat()

        doc_ref.update(update_data)

        return {
            "status": "success",
            "message": "Profile updated",
            "data": update_data,
        }

    except Exception as e:
        print("❌ Update error:", repr(e))
        raise HTTPException(status_code=400, detail=str(e) or "Unknown error")
