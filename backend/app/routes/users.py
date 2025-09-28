from fastapi import APIRouter, Depends
from app.auth import verify_token
from app.db import db

router = APIRouter()

@router.post("/add_user")
def add_user(user: dict, token: dict = Depends(verify_token)):
    db.collection("users").document(token["uid"]).set(user)
    return {"message": "User added successfully"}

@router.get("/get_user")
def get_user(token: dict = Depends(verify_token)):
    doc = db.collection("users").document(token["uid"]).get()
    return doc.to_dict() if doc.exists else {"error": "User not found"}
