from fastapi import APIRouter, Depends, HTTPException, Request
from databaseConnect import execute_query
from connexion.connexion import User, get_current_user
from typing import Annotated

router = APIRouter()

@router.get("/getPartenaire")
async def get_partenaire(token: Annotated[User, Depends(get_current_user)]):

    query = "SELECT * FROM obsmar.partenaire \
            ORDER BY id"
    result = await execute_query(query, True)
    return result

@router.get("/sort/{col}&{order}")
async def sort_partenaire(col: str, order: bool, token: Annotated[User, Depends(get_current_user)]):
    allow_col = ["id", "nom"]
    if col not in allow_col:
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")

    query = f"SELECT * FROM obsmar.partenaire ORDER BY {col} "
    if order:
        query += f"DESC"
    result = await execute_query(query, True)
    return result

@router.get("/getPartenaireMaregraphe/{id}")
async def get_partenaire_maregraphe(id: int,
                                    token: Annotated[User, Depends(get_current_user)]):

    query = "SELECT p.id_partenaire, p.id_maregraphe, m.libelle, m.latitude, m.longitude \
            FROM obsmar.partenaire_maregraphe p\
            JOIN obsmar.maregraphe m ON m.id_tdb=p.id_maregraphe\
            WHERE p.id_partenaire=%s \
            ORDER BY p.id_maregraphe"
    param = (id,)
    result = await execute_query(query, True, param)
    return result

@router.get("/partenaireMaregraphe/sort/{id}&{col}&{order}")
async def sort_partenaire_maregraphe(id: int, col: str, order: bool,
                                    token: Annotated[User, Depends(get_current_user)]):
    allow_col = ["id_maregraphe", "libelle"]
    if col not in allow_col:
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")

    query = f"SELECT p.id_partenaire, p.id_maregraphe, m.libelle, m.latitude, m.longitude \
            FROM obsmar.partenaire_maregraphe p\
            JOIN obsmar.maregraphe m ON m.id_tdb=p.id_maregraphe\
            WHERE p.id_partenaire=%s \
            ORDER BY {col} "
    if order:
        query += f"DESC"

    param = (id,)
    result = await execute_query(query, True, param)
    return result

@router.post("/addPartenaire/{id}&{nom}&{logo}")
async def add_partenaire(nom: str, logo: str, id: int,
                         request: Request,
                         token: Annotated[User, Depends(get_current_user)]):
    json = await request.json()
    url = json["url"]

    query = "INSERT INTO obsmar.partenaire(id, nom, logo, url) \
            VALUES (%s, %s, %s, %s)"
    param = (id, nom, logo, url)
    result = await execute_query(query, False, param)
    return result

@router.post("/addMaregraphePartenaire/{id_partenaire}&{id_maregraphe}&{ordre}")
async def add_maregraphe_partenaire(id_partenaire: int, id_maregraphe: int, ordre:int,
                                    token: Annotated[User, Depends(get_current_user)]):

    query = "INSERT INTO obsmar.partenaire_maregraphe \
            VALUES (%s, %s, %s)"
    param = (id_partenaire, id_maregraphe, ordre)
    result = await execute_query(query, False, param)
    return result

@router.put("/updatePartenaire/{id}&{nom}&{logo}")
async def update_partenaire(id: int, nom: str, logo: str,
                            request: Request,
                            token: Annotated[User, Depends(get_current_user)]):
    json = await request.json()
    url = json["url"]
    query = "UPDATE obsmar.partenaire \
            SET nom=%s, logo=%s, url=%s \
            WHERE id=%s"
    param = (nom, logo, url, id)
    result = await execute_query(query, False, param)
    return result

@router.delete("/deletePartenaire/{id_partenaire}")
async def delete_partenaire(id_partenaire: int,
                            token: Annotated[User, Depends(get_current_user)]):

    query = "DELETE FROM obsmar.partenaire_maregraphe\
            WHERE id_partenaire=%s"
    param = (id_partenaire,)
    result = await execute_query(query, False, param)
    query = "DELETE FROM obsmar.partenaire \
            WHERE id=%s"
    param = (id_partenaire,)
    result = await execute_query(query, False, param)
    return result

@router.delete("/deleteMare/{id_parte}&{id_mare}")
async def delete_mare(id_parte: int, id_mare: int,
                      token: Annotated[User, Depends(get_current_user)]):

    query = "DELETE FROM obsmar.partenaire_maregraphe \
            WHERE id_partenaire = %s AND id_maregraphe = %s"
    param = (id_parte, id_mare)
    result = await execute_query(query, False, param)
    return result

@router.get("/getMaregrapheForm/{id}")
async def get_maregraphe_form(id: int,
                              token: Annotated[User, Depends(get_current_user)]):

    query = "SELECT * from obsmar.maregraphe ma \
            WHERE NOT EXISTS( \
                SELECT * FROM obsmar.partenaire_maregraphe pa \
                WHERE ma.id_tdb=pa.id_maregraphe AND pa.id_partenaire=%s \
            ) \
            ORDER BY ma.libelle"
    param = (id,)
    result = await execute_query(query, True, param)
    return result