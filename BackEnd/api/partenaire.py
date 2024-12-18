from fastapi import APIRouter, Depends, HTTPException
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
