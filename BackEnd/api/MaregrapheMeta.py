
from fastapi import APIRouter
from databaseConnect import databaseConnect
from psycopg2.extras import RealDictCursor

router = APIRouter()

@router.get("/getMeta/{id}")
async def root(id: int):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"SELECT * FROM obsmar.maregraphe_meta WHERE id_maregraphe = {id}")
    return cur.fetchall()

@router.post("/addMeta/{id}&{meta}&{data}")
async def addMeta(id: int, meta: str, data: str):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"INSERT INTO obsmar.maregraphe_meta (id_maregraphe, id_meta, donnee) VALUES ({id}, '{meta}', '{data}')")
    db.commit()
    return cur.lastrowid

@router.put("/updateMeta/{id}&{meta}&{data}")
async def updateMeta(id: int, meta: str, data: str):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"UPDATE obsmar.maregraphe_meta SET donnee = '{data}' WHERE id_maregraphe = {id} AND id_meta = '{meta}'")
    db.commit()
    return cur.lastrowid

@router.delete("/deleteMeta/{id}&{meta}")
async def deleteMeta(id: int, meta: str):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"DELETE FROM obsmar.maregraphe_meta WHERE id_maregraphe = {id} AND id_meta = '{meta}'")
    db.commit()
    return cur.lastrowid
