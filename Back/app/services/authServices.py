from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import verify_password, create_access_token, create_refresh_token
from fastapi import HTTPException
from datetime import timedelta

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user

def generate_tokens(user):
    access_token = create_access_token(
        {"sub": user.email, "roles": user.role.role}, timedelta(minutes=15)
    )
    refresh_token = create_refresh_token({"sub": user.email})
    return access_token, refresh_token
