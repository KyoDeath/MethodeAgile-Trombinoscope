from sqlalchemy.orm import Session
from app.models.user import User

def get_all_users_service(db: Session):
    return db.query(User).all()
