from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "Users"
    __table_args__ = {'extend_existing': True}

    id_user = Column(Integer, primary_key=True)
    email = Column(String(100), nullable=False, unique=True)
    nom = Column(String(50), nullable=False)
    prenom = Column(String(50), nullable=False)
    image = Column(String(255), nullable=True)
    password = Column(Text, nullable=False)
    id_role = Column(Integer, ForeignKey("Role.id_role", ondelete="CASCADE"), nullable=False)

    role = relationship("Role")
