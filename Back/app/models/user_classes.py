from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class UserClasses(Base):
    __tablename__ = "UserClasses"
    __table_args__ = {'extend_existing': True}

    id_user = Column(Integer, ForeignKey("Users.id_user", ondelete="CASCADE"), primary_key=True)
    id_classe = Column(Integer, ForeignKey("Classe.id_classe", ondelete="CASCADE"), primary_key=True)

    user = relationship("User", backref="user_classes.py")
    classe = relationship("Classe")
