from fastapi import APIRouter, HTTPException, Depends
from databaseConnect import databaseConnect
from connexion.connexion import User, get_current_user
from psycopg2.extras import RealDictCursor
from typing import Annotated

router = APIRouter()

@router.get("/getPartenanire")
async def getPartenanire(token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT * FROM obsmar.partenaire")
        return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
