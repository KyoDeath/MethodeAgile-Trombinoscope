from sqlalchemy import Column, Integer, String
from app.db.database import Base

class Role(Base):
    __tablename__ = "Role"
    __table_args__ = {'extend_existing': True}  # Évite de recréer la table

    id_role = Column(Integer, primary_key=True)
    role = Column(String(50), nullable=False)
