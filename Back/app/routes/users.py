from app.controllers.usersController import *
from app.db.database import get_db
from app.schemas.user import UserSchema

router = APIRouter()

@router.get("/", response_model=list[UserSchema])
def get_all_users(db: Session = Depends(get_db)):
    return get_all_users_controller(db)
