from pydantic import BaseModel

class RoleBase(BaseModel):
    role: str

class RoleSchema(RoleBase):
    id_role: int

    class Config:
        from_attributes = True
