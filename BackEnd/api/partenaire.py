from os.path import defpath

from fastapi import APIRouter, Depends, HTTPException, Request
from databaseConnect import databaseConnect, check_error
from connexion.connexion import User, get_current_user
from psycopg2.extras import RealDictCursor
from typing import Annotated

router = APIRouter()

@router.get("/getPartenaire")
async def get_partenaire(token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT * FROM obsmar.partenaire \
                    ORDER BY id")
        return cur.fetchall()
    except Exception as e:
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()

@router.get("/sort/{col}&{order}")
async def sort_partenaire(col: str, order: bool, token: Annotated[User, Depends(get_current_user)]):
    allow_col = ["id", "nom"]
    if col not in allow_col:
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        query = f"SELECT * FROM obsmar.partenaire ORDER BY {col} "
        if order:
            query += f"DESC"
        cur.execute(query, (id,))
        return cur.fetchall()
    except Exception as e:
        print(e)
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()

@router.get("/getPartenaireMaregraphe/{id}")
async def get_partenaire_maregraphe(id: int,
                                    token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT p.id_partenaire, p.id_maregraphe, m.libelle, m.latitude, m.longitude \
                    FROM obsmar.partenaire_maregraphe p\
                    JOIN obsmar.maregraphe m ON m.id_tdb=p.id_maregraphe\
                    WHERE p.id_partenaire=%s \
                    ORDER BY p.id_maregraphe", (id,))
        return cur.fetchall()
    except Exception as e:
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()

@router.get("/partenaireMaregraphe/sort/{id}&{col}&{order}")
async def sort_partenaireMaregraphe(id: int, col: str, order: bool,
                                    token: Annotated[User, Depends(get_current_user)]):
    allow_col = ["id_maregraphe", "libelle"]
    if col not in allow_col:
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        query = f"SELECT p.id_partenaire, p.id_maregraphe, m.libelle, m.latitude, m.longitude \
                    FROM obsmar.partenaire_maregraphe p\
                    JOIN obsmar.maregraphe m ON m.id_tdb=p.id_maregraphe\
                    WHERE p.id_partenaire=%s \
                    ORDER BY {col} "
        if order:
            query += f"DESC"
        cur.execute(query, (id,))
        return cur.fetchall()
    except Exception as e:
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()

@router.post("/addMaregraphePartenaire/{id_partenaire}&{id_maregraphe}&{ordre}")
async def add_maregraphe_partenaire(id_partenaire: int, id_maregraphe: int, ordre:int,
                                    token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"INSERT INTO obsmar.partenaire_maregraphe \
                    VALUES (%s, %s, %s)", (id_partenaire, id_maregraphe, ordre))
        db.commit()
        return cur.lastrowid
    except Exception as e:
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()

@router.put("/updatePartenaire/{id}&{nom}&{logo}")
async def update_partenaire(id: int, nom: str, logo: str,
                            request: Request,
                            token: Annotated[User, Depends(get_current_user)]):
    json = await request.json()
    url = json["url"]
    try:
        print(f"{id} {nom} {logo}")
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"UPDATE obsmar.partenaire \
                    SET nom=%s, logo=%s, url=%s \
                    WHERE id=%s", (nom, logo, url, id))
        db.commit()
        return cur.rowcount
    except Exception as e:
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()