from databaseConnect import db
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException

from connexion.connexion import User, get_current_user
router = APIRouter()

@router.get("/getMetaId/")
async def get_meta_id(token: Annotated[User, Depends(get_current_user)]):

    """"
    Récupère les métadonnées d'un marégraphe.
    
    Args:
        id (int): L'identifiant du marégraphe.
        token (User): L'utilisateur authentifié.
        
    Returns:
        list: Une liste de métadonnées du marégraphe.
    """

    query = "SELECT * FROM obsmar.meta \
            ORDER BY id"
    result = await db.fetch_all(query)
    return result

@router.get("/sort/{col}&{order}")
async def sort_meta(col: str, order: bool, token: Annotated[User, Depends(get_current_user)]):
    """"
    Trier les métadonnées

    Args:
        col (str): La colonne utilisée pour le tri
        order (bool): L'ordre du tri (true: décroissant, false: croissant)
        token: l'utilisateur connecté

    Returns:
        list: Les métadonnées triés

    """
    allow_col = ["id", "ordre"]
    if col not in allow_col:
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")

    query = f"SELECT * FROM obsmar.meta ORDER BY {col} "
    if order:
        query += "DESC"
    print(query)
    result = await db.fetch_all(query)
    return result

@router.post("/addMeta/{id}&{desc}&{ordre}")
async def add_meta(id: str, desc: str, ordre: int,
                   token: Annotated[User, Depends(get_current_user)]):
    """"
    Ajoute une métadonnée
    
    Args:
        id (int): L'identifiant de la métadonnée
        desc (str): La description de la métadonnée
        ordre (int): L'ordre de la métadonnée
        token: l'utilisateur connecté
        
    Returns:
        dict: Le résultat de l'ajout
    """
    query = "INSERT INTO obsmar.meta VALUES ($1, $2, $3)"
    param = (id, desc, ordre)
    result = await db.execute(query, param)
    return result

@router.put("/updateMeta/{id}&{desc}&{ordre}")
async def update_meta(id: str, desc: str, ordre: int,
                      token: Annotated[User, Depends(get_current_user)]):
    """"
    Met à jour une métadonnée

    Args:
        id (int): L'identifiant de la métadonnée
        desc (str): La description de la métadonnée
        ordre (int): L'ordre de la métadonnée
        token: l'utilisateur connecté
    
    Returns:
        dict: Le résultat de la mise à jour
    """

    query = "UPDATE obsmar.meta \
            SET description=$1, ordre=$2 \
            WHERE id=$3"
    param = (desc, ordre, id)
    result = await db.execute(query, param)
    return result

@router.delete("/deleteMeta/{id}")
async def delete_meta(id: str,
                      token: Annotated[User, Depends(get_current_user)]):
    """"
    Supprime une métadonnée

    Args:
        id (int): L'identifiant de la métadonnée
        token: l'utilisateur connecté

    Returns:
        dict: Le résultat de la suppression
    """
    #delete meta in all marégraphe
    query = "DELETE FROM obsmar.maregraphe_meta WHERE id_meta=$1"
    param = (id,)
    await db.execute(query, param)
    #delete meta
    query = "DELETE FROM obsmar.meta WHERE id=$1"
    param = (id,)
    result = await db.execute(query, param)
    return result
