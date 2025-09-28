from pydantic import BaseModel

class RegisterUser(BaseModel):
    name: str
    email: str
    password: str
    goal: str

class LoginUser(BaseModel):
    email: str
    password: str

class UserProfile(BaseModel):
    age: int | None = None
    height: float | None = None
    weight: float | None = None
    diet: str | None = None
    workout_type: str | None = None
    goal: str | None = None
    stress_level: str | None = None
    suggested_activities: list[str] | None = None
