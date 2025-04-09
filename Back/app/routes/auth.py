from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.controllers.authController import login_controller, refresh_controller, logout_controller
from pydantic import BaseModel

router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    return login_controller(db, request.email, request.password)


@router.get("/refresh")
def refresh(request: Request, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("jwt")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return refresh_controller(db, refresh_token)


@router.post("/logout")
def logout():
    return logout_controller()
