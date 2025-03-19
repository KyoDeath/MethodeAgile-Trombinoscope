from fastapi import FastAPI
from app.routes import users, auth
from app.db.database import engine, Base, SessionLocal

Base.metadata.create_all(bind=engine)


app = FastAPI(title="Trombinoscope", version="1.0")

# Inclusion des routes
app.include_router(users.router, prefix="/users", tags=["Users"])
# app.include_router(roles.router, prefix="/roles", tags=["Roles"])
# app.include_router(classes.router, prefix="/classes", tags=["Classes"])

app.include_router(auth.router, prefix="/auth", tags=["Auth"])

@app.get("/")
def root():
    return {"message": "Bienvenue sur le Trombinoscope !"}
