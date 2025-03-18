from pydantic import BaseModel

class UserClassesSchema(BaseModel):
    id_user: int
    id_classe: int

    class Config:
        from_attributes = True
