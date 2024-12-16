from typing import Annotated

from fastapi import APIRouter, Depends

from connexion.connexion import User, get_current_user
from databaseConnect import databaseConnect, check_error
from psycopg2.extras import RealDictCursor

router = APIRouter()

@router.get("/getMaregraphe")
async def get_maregraphe(token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM obsmar.maregraphe \
                    ORDER BY id_tdb")
        return cur.fetchall()
    except Exception as e:
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()

@router.post("/addMaregraphe/{id}&{libelle}&{lat}&{long}")
async def add_maregraphe(id: int, libelle: str, lat: float, long: float,
                         token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        print(f"%d %s", id, libelle)
        cur.execute(f"INSERT INTO obsmar.maregraphe \
                    VALUES (%s, %s, %s, %s)", (id, libelle, lat, long))
        db.commit()
        return cur.lastrowid
    except Exception as e:
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()
