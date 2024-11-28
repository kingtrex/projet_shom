from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

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

@router.post("/addMaregraphe/{id}&{libelle}&{lat}&{long}")
async def addMaregraphe(id: int, libelle: str, lat: float, long: float,
                        token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        print(f"%d %s", id, libelle)
        cur.execute(f"INSERT INTO obsmar.maregraphe VALUES (%s, %s, %s, %s)", (id, libelle, lat, long))
        db.commit()
        return cur.lastrowid
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
