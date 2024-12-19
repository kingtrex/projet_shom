from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

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

@router.put("/updateMaregraphe/{id}&{ville}&{latitude}&{longitude}")
async def update_maregraphe(id: int, ville: str, latitude: str, longitude: str,
                            token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"UPDATE obsmar.maregraphe \
        SET libelle=%s, latitude=%s, longitude=%s \
        WHERE id_tdb=%s", (ville, latitude, longitude, id))
        db.commit()
        return cur.lastrowid
    except Exception as e:
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()


@router.get("/sort/{col}&{order}")
async def sort_maregraphe(col: str, order: bool, token: Annotated[User, Depends(get_current_user)]):
    allowed_col = ["id_tdb", "libelle"]
    if col not in allowed_col:
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        query = f"SELECT * FROM obsmar.maregraphe ORDER BY {col} "
        if order:
            query += f"DESC"
        cur.execute(query)
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
@router.delete("/deleteMaregraphe/{id}")
async def delete_maregraphe(id: int, token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        #supprimer les relations
        cur.execute(f"DELETE FROM obsmar.maregraphe_meta WHERE id_maregraphe=%s",(id,))
        cur.execute(f"DELETE FROM obsmar.partenaire_maregraphe WHERE id_maregraphe=%s", (id,))
        cur.execute(f"DELETE FROM obsmar.maregraphe WHERE id_tdb=%s", (id,))
        db.commit()
        return cur.lastrowid
    except Exception as e:
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()
