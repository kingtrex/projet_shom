
from fastapi import HTTPException
from databaseConnect import databaseConnect
from psycopg2.extras import RealDictCursor
from typing import Annotated

from fastapi import APIRouter, Depends

from connexion.connexion import User, get_current_user

from datetime import datetime

router = APIRouter()

@router.get("/getMeta/{id}")
async def root(id: int,
               token: Annotated[User, Depends(get_current_user)]):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"SELECT * FROM obsmar.maregraphe_meta \
                WHERE id_maregraphe = %s", (id,))
    return cur.fetchall()

@router.post("/addMeta/{id}&{meta}&{data}")
async def add_meta(id: int, meta: str, data: str,
                   token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"INSERT INTO obsmar.maregraphe_meta \
                    VALUES (%s, %s, %s, %s)", (id, meta, data, datetime.now()))
        db.commit()
        return cur.lastrowid
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@router.put("/updateMeta/{id}&{meta}&{data}")
async def update_meta(id: int, meta: str, data: str,
                      token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"UPDATE obsmar.maregraphe_meta SET donnee = %s \
                    WHERE id_maregraphe = %s AND id_meta = %s", (data, id, meta))
        db.commit()
        return cur.lastrowid
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/deleteAllMeta/{id}")
async def delete_meta(id: int,
                     token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"DELETE FROM obsmar.maregraphe_meta \
                    WHERE id_maregraphe = %s", (id,))
        db.commit()
        return cur.lastrowid
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/deleteMeta/{id}&{meta}")
async def delete_meta(id: int, meta: str,
                      token: Annotated[User, Depends(get_current_user)]):
    try:
        print(f"{id} - {meta}")
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"DELETE FROM obsmar.maregraphe_meta \
                    WHERE id_maregraphe = %s AND id_meta = %s", (id, meta))
        db.commit()
        return cur.lastrowid
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
