
from fastapi import APIRouter
from databaseConnect import databaseConnect
from psycopg2.extras import RealDictCursor
from typing import Annotated

from fastapi import APIRouter, Depends

from connexion.connexion import User, get_current_user
router = APIRouter()

@router.get("/getMeta/{id}")
async def root(id: int,
               token: Annotated[User, Depends(get_current_user)]):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"SELECT * FROM obsmar.maregraphe_meta WHERE id_maregraphe = %s", (id,))
    return cur.fetchall()

@router.post("/addMeta/{id}&{meta}&{data}")
async def addMeta(id: int, meta: str, data: str,
                  token: Annotated[User, Depends(get_current_user)]):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"INSERT INTO obsmar.maregraphe_meta (id_maregraphe, id_meta, donnee) VALUES (%s, %s, %s)", (id, meta, data))
    db.commit()
    return cur.lastrowid

@router.put("/updateMeta/{id}&{meta}&{data}")
async def updateMeta(id: int, meta: str, data: str,
                     token: Annotated[User, Depends(get_current_user)]):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"UPDATE obsmar.maregraphe_meta SET donnee = %s WHERE id_maregraphe = %s AND id_meta = %s", (data, id, meta))
    db.commit()
    return cur.lastrowid

@router.delete("/deleteMeta/{id}&{meta}")
async def deleteMeta(id: int, meta: str,
                     token: Annotated[User, Depends(get_current_user)]):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"DELETE FROM obsmar.maregraphe_meta WHERE id_maregraphe = %s AND id_meta = %s", (id, meta))
    db.commit()
    return cur.lastrowid
