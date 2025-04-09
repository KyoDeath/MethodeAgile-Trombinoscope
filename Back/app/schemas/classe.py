from pydantic import BaseModel

class ClasseBase(BaseModel):
    classe: str

class ClasseSchema(ClasseBase):
    id_classe: int

    class Config:
        from_attributes = True
