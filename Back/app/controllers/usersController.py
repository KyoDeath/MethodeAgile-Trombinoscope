from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.usersServices import *
from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserSchema
from typing import List


def get_all_users_controller(db: Session):
    users = get_all_users_service(db)
    if not users:
        raise HTTPException(status_code=404, detail="Aucun utilisateur trouvé")
    return [{"id": user.id_user, "nom": user.nom, "prenom": user.prenom } for user in users]

