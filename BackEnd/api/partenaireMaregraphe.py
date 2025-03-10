from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from connexion.connexion import User, get_current_user
from databaseConnect import db
router = APIRouter()

@router.get("/getMaregraphe/{id}")
async def get_partenaire_maregraphe(id: int,
                                    token: Annotated[User, Depends(get_current_user)]):

    """"
    Récupère les marégraphes associés à un partenaire
    Args:
        id (int): L'identifiant du partenaire
        token (User): L'utilisateur authentifié.
    Returns:
        list: Une liste de marégraphes associés au partenaire
    """
    query = "SELECT p.id_partenaire, p.id_maregraphe, m.libelle, m.latitude, m.longitude, p.ordre \
            FROM obsmar.partenaire_maregraphe p\
            JOIN obsmar.maregraphe m ON m.id_tdb=p.id_maregraphe\
            WHERE p.id_partenaire=$1 \
            ORDER BY p.ordre"
    param = (id,)
    result = await db.fetch_all(query, param)
    return result


@router.get("/sort/{id}&{col}&{order}")
async def sort_partenaire_maregraphe(id: int, col: str, order: bool,
                                     token: Annotated[User, Depends(get_current_user)]):
    """"
    Trier les marégraphes associés à un partenaire
    Args:
        id (int): L'identifiant du partenaire
        col (str): La colonne utilisée pour le tri
        order (bool): L'ordre du tri (true: décroissant, false: croissant)
        token: l'utilisateur connecté
    Returns:
        list: Les marégraphes associés au partenaire triés
    """
    print(col)
    allow_col = ["id_maregraphe", "libelle", "ordre"]
    print(allow_col)
    if col not in allow_col:
        print("aaa")
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")

    query = f"SELECT p.id_partenaire, p.id_maregraphe, m.libelle, m.latitude, m.longitude, p.ordre \
            FROM obsmar.partenaire_maregraphe p\
            JOIN obsmar.maregraphe m ON m.id_tdb=p.id_maregraphe\
            WHERE p.id_partenaire=$1 \
            ORDER BY {col} "
    if order:
        query += f"DESC"

    param = (id,)
    print(query)
    result = await db.fetch_all(query, param)
    return result

@router.post("/addMaregraphe/{id_partenaire}&{id_maregraphe}&{ordre}")
async def add_maregraphe(id_partenaire: int, id_maregraphe: int, ordre:int,
                                    token: Annotated[User, Depends(get_current_user)]):
    """"
    Ajoute un marégraphe à un partenaire
    Args:
        id_partenaire (int): L'identifiant du partenaire
        id_maregraphe (int): L'identifiant du marégraphe
        ordre (int): L'ordre du marégraphe
        token: l'utilisateur connecté
    Returns:
        dict: Le résultat de l'insertion
    """
    query = "INSERT INTO obsmar.partenaire_maregraphe \
            VALUES ($1, $2, $3)"
    param = (id_partenaire, id_maregraphe, ordre)
    result = await db.execute(query, param)
    return result

@router.delete("/deleteMare/{id_parte}&{id_mare}")
async def delete_mare(id_parte: int, id_mare: int,
                      token: Annotated[User, Depends(get_current_user)]):
    """"
    Supprime un marégraphe d'un partenaire
    Args:
        id_parte (int): L'identifiant du partenaire
        id_mare (int): L'identifiant du marégraphe
        token: l'utilisateur connecté
    Returns:
        dict: Le résultat de la suppression
    """

    query = "DELETE FROM obsmar.partenaire_maregraphe \
            WHERE id_partenaire = $1 AND id_maregraphe = $2"
    param = (id_parte, id_mare)
    result = await db.execute(query, param)
    return result

@router.get("/getMaregrapheForm/{id}")
async def get_maregraphe_form(id: int,
                              token: Annotated[User, Depends(get_current_user)]):
    """"
    Récupère les marégraphes qui ne sont pas associés à un partenaire
    Args:
        id (int): L'identifiant du partenaire
        token: l'utilisateur connecté
    Returns:
        list: Les marégraphes non associés au partenaire
    """

    query = "SELECT * from obsmar.maregraphe ma \
            WHERE NOT EXISTS( \
                SELECT * FROM obsmar.partenaire_maregraphe pa \
                WHERE ma.id_tdb=pa.id_maregraphe AND pa.id_partenaire=$1 \
            ) \
            ORDER BY ma.libelle"
    param = (id,)
    result = await db.fetch_all(query, param)
    return result