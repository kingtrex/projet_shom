from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from connexion.connexion import User, get_current_user
from databaseConnect import execute_query

router = APIRouter()

@router.get("/getMaregraphe")
async def get_maregraphe(token: Annotated[User, Depends(get_current_user)]):
    query = "SELECT * FROM obsmar.maregraphe \
            ORDER BY id_tdb"
    result = await execute_query(query, True)
    return result


@router.put("/updateMaregraphe/{id}&{ville}&{latitude}&{longitude}")
async def update_maregraphe(id: int, ville: str, latitude: str, longitude: str,
                            token: Annotated[User, Depends(get_current_user)]):

    query = f"UPDATE obsmar.maregraphe \
            SET libelle=%s, latitude=%s, longitude=%s \
            WHERE id_tdb=%s"
    result = await execute_query(query, False, (ville, latitude, longitude, id))
    return result

@router.get("/sort/{col}&{order}")
async def sort_maregraphe(col: str, order: bool, token: Annotated[User, Depends(get_current_user)]):
    allowed_col = ["id_tdb", "libelle"]
    if col not in allowed_col:
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")

    query = f"SELECT * FROM obsmar.maregraphe ORDER BY {col} "
    if order:
        query += f"DESC"

    result = await execute_query(query, True, col)
    return result

@router.post("/addMaregraphe/{id}&{libelle}&{lat}&{long}")
async def add_maregraphe(id: int, libelle: str, lat: float, long: float,
                         token: Annotated[User, Depends(get_current_user)]):

    query = "INSERT INTO obsmar.maregraphe \
            VALUES (%s, %s, %s, %s)"
    result = await execute_query(query, False, (id, libelle, lat, long))
    return result

@router.delete("/deleteMaregraphe/{id}")
async def delete_maregraphe(id: int, token: Annotated[User, Depends(get_current_user)]):

    query = "DELETE FROM obsmar.maregraphe WHERE id_tdb=%s"
    await execute_query(query, False, (id,))
    query = "DELETE FROM obsmar.partenaire_maregraphe WHERE id_maregraphe=%s"
    await execute_query(query, False, (id,))
    query = "DELETE FROM obsmar.maregraphe WHERE id_tdb=%s"
    result = await execute_query(query, False, (id,))

    return result
