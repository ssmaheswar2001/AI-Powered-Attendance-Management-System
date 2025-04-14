from pydantic import BaseModel, EmailStr
from typing import List

class UserRegistration(BaseModel):
    user_id: str
    name: str
    email_id: EmailStr
    phone: str

class UserResponse(BaseModel):
    user_id: str
    name: str
    email_id: EmailStr
    phone: str
    image_paths: List[str]
