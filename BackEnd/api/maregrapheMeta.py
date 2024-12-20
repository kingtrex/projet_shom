from databaseConnect import databaseConnect, check_error
from psycopg2.extras import RealDictCursor
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from connexion.connexion import User, get_current_user

from datetime import datetime

router = APIRouter()

@router.get("/getMeta/{id}")
async def get_maregraphe_meta(id: int,
               token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT * FROM obsmar.maregraphe_meta \
                    WHERE id_maregraphe = %s \
                    ORDER BY id_meta", (id,))
        return cur.fetchall()
    except Exception as e:
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()

@router.get("/sort/{id}&{col}&{order}")
async def sort_maregraphe_meta(id: int, col: str, order: bool, token: Annotated[User, Depends(get_current_user)]):
    allowed_col = ["id_meta", "date_donnee"]
    if col not in allowed_col:
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        query = f"SELECT * FROM obsmar.maregraphe_meta WHERE id_maregraphe=%s ORDER BY {col} "
        if order:
            query += f"DESC"
        data = cur.execute(query, (id,))
        print(data)
        return cur.fetchall()
    except Exception as e:
        print(e)
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()

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
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()

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
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()

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
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()

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
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()
