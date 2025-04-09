from sqlalchemy import Column, Integer, String
from app.db.database import Base

class Classe(Base):
    __tablename__ = "Classe"
    __table_args__ = {'extend_existing': True}

    id_classe = Column(Integer, primary_key=True)
    classe = Column(String(100), nullable=False)
