from fastapi import APIRouter, HTTPException, Depends
from databaseConnect import databaseConnect
from connexion.connexion import User, get_current_user
from psycopg2.extras import RealDictCursor
from typing import Annotated

router = APIRouter()

@router.get("/getPartenaire")
async def get_partenaire(token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT * FROM obsmar.partenaire")
        return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/getPartenaireMaregraphe/{id}")
async def get_partenaire_maregraphe(id: int,
                                    token: Annotated[User, Depends(get_current_user)]):
    try:
        db = databaseConnect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"SELECT p.id_partenaire, p.id_maregraphe, m.libelle, m.latitude, m.longitude \
                    FROM obsmar.partenaire_maregraphe p\
                    JOIN obsmar.maregraphe m ON m.id_tdb=p.id_maregraphe\
                    WHERE p.id_partenaire=%s", (id,))
        return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
