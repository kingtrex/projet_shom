
from psycopg2.extras import RealDictCursor
from databaseConnect import databaseConnect
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from connexion.connexion import User, get_current_user
router = APIRouter()

@router.get("/getMetaId/")
async def get_meta_id(token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT * FROM obsmar.meta")
        return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/addMeta/{id}&{desc}&{ordre}")
async def add_meta(id: str, desc: str, ordre: int,
                   token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"INSERT INTO obsmar.meta VALUES (%s, %s, %s)", (id, desc, ordre))
        db.commit()
        return cur.lastrowid
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/updateMeta/{id}&{desc}&{ordre}")
async def update_meta(id: str, desc: str, ordre: int,
                      token: Annotated[User, Depends(get_current_user)]):
    print("oui")
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"UPDATE obsmar.meta \
                    SET description=%s, ordre=%s \
                    WHERE id=%s", (desc, ordre, id))
        db.commit()
        return cur.lastrowid
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/deleteMeta/{id}")
async def delete_meta(id: str,
                      token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"DELETE FROM obsmar.meta \
                    WHERE id=%s", (id,))
        db.commit()
        return cur.lastrowid
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))