from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    nom: str
    prenom: str
    image: Optional[str] = None
    id_role: int

class UserSchema(UserBase):
    id_user: int

    class Config:
        from_attributes = True
