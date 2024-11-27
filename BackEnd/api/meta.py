from fastapi import APIRouter
from psycopg2.extras import RealDictCursor
from databaseConnect import databaseConnect
from typing import Annotated

from fastapi import APIRouter, Depends

from connexion.connexion import User, get_current_user
router = APIRouter()

@router.get("/getMetaId/")
async def getMetaId(token: Annotated[User, Depends(get_current_user)]):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"SELECT * FROM obsmar.meta")
    return cur.fetchall()
