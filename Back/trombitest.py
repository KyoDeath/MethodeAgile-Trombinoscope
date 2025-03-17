from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
from typing import List
import shutil
import os
from fastapi import Request

# Initialisation de l'application FastAPI
app = FastAPI()

# Dossier pour stocker les photos
PHOTO_DIR = "photos"
os.makedirs(PHOTO_DIR, exist_ok=True)

# Dictionnaire en mémoire pour stocker les personnes
persons_db = {}

# Initialisation des templates Jinja2
templates = Jinja2Templates(directory="templates")

# Modèle de données
class Person:
    def __init__(self, id: int, name: str, photo_filename: str):
        self.id = id
        self.name = name
        self.photo_filename = photo_filename

# Ajouter une personne avec photo
@app.post("/persons/")
async def add_person(name: str = Form(...), photo: UploadFile = File(...)):
    # Générer un ID unique pour la personne
    person_id = max(persons_db.keys(), default=0) + 1

    # Définir le chemin pour la photo
    photo_path = os.path.join(PHOTO_DIR, photo.filename)
    
    # Sauvegarder la photo sur le disque
    with open(photo_path, "wb") as buffer:
        shutil.copyfileobj(photo.file, buffer)

    # Créer une nouvelle personne
    person = Person(id=person_id, name=name, photo_filename=photo.filename)

    # Ajouter la personne dans le "database" en mémoire
    persons_db[person_id] = person
    
    # Retourner les détails de la personne
    return {"id": person.id, "name": person.name, "photo": photo_path}

# Récupérer la liste des personnes
@app.get("/persons/")
async def get_persons():
    # Retourner toutes les personnes en format liste
    return [{"id": person.id, "name": person.name, "photo": os.path.join(PHOTO_DIR, person.photo_filename)} for person in persons_db.values()]

# Récupérer une photo
@app.get("/photos/{filename}")
async def get_photo(filename: str):
    file_path = os.path.join(PHOTO_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Photo non trouvée")
    
    # Retourner le fichier image en tant que réponse
    return FileResponse(file_path)

# Afficher la page HTML avec la liste des personnes et leurs photos
@app.get("/", response_class=HTMLResponse)
async def display_profiles(request: Request):
    # Récupérer la liste des personnes
    people = [{"id": person.id, "name": person.name, "photo": os.path.join(PHOTO_DIR, person.photo_filename)} for person in persons_db.values()]
    
    # Rendre la page HTML avec Jinja2 et les données des personnes
    return templates.TemplateResponse("index.html", {"request": request, "people": people})
