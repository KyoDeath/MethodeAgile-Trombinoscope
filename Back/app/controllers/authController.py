from sqlalchemy.orm import Session

from app.models import User
from app.services.authServices import authenticate_user, generate_tokens
from fastapi import HTTPException
from fastapi.responses import JSONResponse

def login_controller(db: Session, email: str, password: str):
    user = authenticate_user(db, email, password)
    access_token, refresh_token = generate_tokens(user)

    response = JSONResponse({"access_token": access_token})
    response.set_cookie("jwt", refresh_token, httponly=True, secure=True, samesite="none")
    return response

def refresh_controller(db: Session, email: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")

    access_token, _ = generate_tokens(user)
    return {"access_token": access_token}

def logout_controller():
    response = JSONResponse({"message": "Logout successful"})
    response.delete_cookie("jwt")
    return response
