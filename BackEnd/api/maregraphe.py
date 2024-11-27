from typing import Annotated

from fastapi import APIRouter, Depends

from connexion.connexion import User, get_current_user
from databaseConnect import databaseConnect
from psycopg2.extras import RealDictCursor

router = APIRouter()

@router.get("/getMaregraphe")
async def getMaregraphe(token: Annotated[User, Depends(get_current_user)]):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM obsmar.maregraphe ORDER BY id_tdb")
    return cur.fetchall()
