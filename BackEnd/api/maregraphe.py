from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from connexion.connexion import User, get_current_user
from databaseConnect import db

router = APIRouter()

@router.get("/getMaregraphe")
async def get_maregraphe(token: Annotated[User, Depends(get_current_user)],
                         ):
    """
    Récupère les données des marégraphes.

    Args:
        token (User): L'utilisateur authentifié.

    Returns:
        list: Une liste de marégraphes.
    """
    query = "SELECT * FROM obsmar.maregraphe \
            ORDER BY id_tdb"
    result = await db.fetch_all(query)
    return result


@router.put("/updateMaregraphe/{id}&{ville}&{latitude}&{longitude}")
async def update_maregraphe(id: int, ville: str, latitude: str, longitude: str,
                            token: Annotated[User, Depends(get_current_user)]):
    """
    Met à jour les informations d'un marégraphe.

    Args:
        id (int): L'identifiant du marégraphe.
        ville (str): Le nom de la ville.
        latitude (str): La latitude du marégraphe.
        longitude (str): La longitude du marégraphe.
        token (User): L'utilisateur authentifié.

    Returns:
        dict: Le résultat de la mise à jour.
    """
    query = f"UPDATE obsmar.maregraphe \
            SET libelle=$1, latitude=$2, longitude=$3 \
            WHERE id_tdb=$4"
    result = await db.execute(query, (ville, latitude, longitude, id))
    return result

@router.get("/sort/{col}&{order}")
async def sort_maregraphe(col: str, order: bool, token: Annotated[User, Depends(get_current_user)]):
    """
    Trie les marégraphes par une colonne spécifique.

    Args:
        col (str): La colonne par laquelle trier les données.
        order (bool): L'ordre de tri (True pour descendant, False pour ascendant).
        token (User): L'utilisateur authentifié.

    Raises:
        HTTPException: Si le nom de la colonne est invalide.

    Returns:
        list: Une liste de marégraphes triés.
    """
    allowed_col = ["id_tdb", "libelle"]
    if col not in allowed_col:
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")

    query = f"SELECT * FROM obsmar.maregraphe ORDER BY {col} "
    if order:
        query += f"DESC"

    result = await db.fetch_all(query)
    return result

@router.post("/addMaregraphe/{id}&{libelle}&{lat}&{long}")
async def add_maregraphe(id: int, libelle: str, lat: float, long: float,
                         token: Annotated[User, Depends(get_current_user)]):
    """
    Ajoute un nouveau marégraphe.

    Args:
        id (int): L'identifiant du marégraphe.
        libelle (str): Le libellé du marégraphe.
        lat (float): La latitude du marégraphe.
        long (float): La longitude du marégraphe.
        token (User): L'utilisateur authentifié.

    Returns:
        dict: Le résultat de l'insertion.
    """
    query = "INSERT INTO obsmar.maregraphe \
            VALUES ($1, $2, $3, $4)"
    result = await db.execute(query, (id, libelle, lat, long))
    return result

@router.delete("/deleteMaregraphe/{id}")
async def delete_maregraphe(id: int, token: Annotated[User, Depends(get_current_user)]):
    """"
    Supprime un marégraphe.
    
    Args:
        id (int): L'identifiant du marégraphe.
        token (User): L'utilisateur authentifié.
        
    Returns:
        dict: Le résultat de la suppression."""
    query = "DELETE FROM obsmar.maregraphe_meta WHERE id_maregraphe=$1"
    await db.execute(query, (id,))
    query = "DELETE FROM obsmar.partenaire_maregraphe WHERE id_maregraphe=$1"
    await db.execute(query, (id,))
    query = "DELETE FROM obsmar.maregraphe WHERE id_tdb=$1"
    result = await db.execute(query, (id,))

    return result
