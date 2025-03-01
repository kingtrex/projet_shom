from databaseConnect import db
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from connexion.connexion import User, get_current_user

from datetime import datetime

router = APIRouter()

@router.get("/getMeta/{id}")
async def get_maregraphe_meta(id: int,
               token: Annotated[User, Depends(get_current_user)]):
    """"
    Récupère les métadonnées d'un marégraphe.
    
    Args:
        id (int): L'identifiant du marégraphe.
        token (User): L'utilisateur authentifié.
    
    Returns:
        list: Une liste de métadonnées du marégraphe.
    """

    query = "SELECT * FROM obsmar.maregraphe_meta WHERE id_maregraphe=$1 ORDER BY id_meta"
    result = await db.fetch_all(query, (id,))
    return result


@router.get("/sort/{id}&{col}&{order}")
async def sort_maregraphe_meta(id: int, col: str, order: bool, token: Annotated[User, Depends(get_current_user)]):
    """"
    Trier les métadonnées

    Args:
        id (int): l'identifiant du marégraphe.
        col (str): La colonne utilisée pour le tri
        order (bool): L'ordre du tri (true: décroissant, false: croissant)
        token: l'utilisateur connecté

    Returns:
        list: Les métadonnées du marégraphe triés

    """
    allowed_col = ["id_meta", "date_donnee"]
    if col not in allowed_col:
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")

    query = f"SELECT * FROM obsmar.maregraphe_meta WHERE id_maregraphe=$1 ORDER BY {col} "
    if order:
        query += f"DESC"

    result = await db.fetch_all(query, (id,))
    return result

@router.post("/addMeta/{id}&{meta}&{data}")
async def add_meta(id: int, meta: str, data: str,
                   token: Annotated[User, Depends(get_current_user)]):
    """"
    Ajoute une métadonnée à un marégraphe.

    Args:
        id (int): L'identifiant du marégraphe.
        meta (str): Le nom de la métadonnée.
        data (str): La valeur de la métadonnée.
        token: L'utilisateur connecté.

    Returns:
        dict: Le résultat de l'ajout.
    """

    query = "INSERT INTO obsmar.maregraphe_meta \
            VALUES ($1, $2, $3, $4)"
    param = (id, meta, data, datetime.now())
    result = await db.execute(query, param)
    return result

@router.put("/updateMeta/{id}&{meta}&{data}")
async def update_meta(id: int, meta: str, data: str,
                      token: Annotated[User, Depends(get_current_user)]):
    """"
    Met à jour une métadonnée d'un marégraphe.

    Args:
        id (int): L'identifiant du marégraphe.
        meta (str): Le nom de la métadonnée.
        data (str): La valeur de la métadonnée.
        token: L'utilisateur connecté.
    Returns:
        dict: Le résultat de la mise à jour.
    """

    query = f"UPDATE obsmar.maregraphe_meta SET donnee = $1 \
            WHERE id_maregraphe = $2 AND id_meta = $3"
    param = (data, id, meta)
    result = await db.execute(query, param)
    return result

@router.delete("/deleteAllMeta/{id}")
async def delete_meta(id: int,
                     token: Annotated[User, Depends(get_current_user)]):

    query = "DELETE FROM obsmar.maregraphe_meta \
            WHERE id_maregraphe = $1"
    param = (id, )
    result = await db.execute(query, param)
    return result

@router.delete("/deleteMeta/{id}&{meta}")
async def delete_meta(id: int, meta: str,
                      token: Annotated[User, Depends(get_current_user)]):
    """"
    Supprime une métadonnée d'un marégraphe.

    Args:
        id (int): L'identifiant du marégraphe.
        meta (str): Le nom de la métadonnée.
        token: L'utilisateur connecté.

    Returns:
        dict: Le résultat de la suppression.
    """

    query = "DELETE FROM obsmar.maregraphe_meta \
            WHERE id_maregraphe = $1 AND id_meta = $2"
    param = (id, meta)
    result = await db.execute(query, param)
    return result

@router.get("/getMetaForm/{id}")
async def get_meta_form(id: int,token: Annotated[User, Depends(get_current_user)]):
    """"
    Récupère les métadonnées non associées à un marégraphe.

    Args:
        id (int): L'identifiant du marégraphe.
        token: L'utilisateur connecté.

    Returns:
        list: Une liste de métadonnées non associées à un marégraphe.
    """

    query = "SELECT * FROM obsmar.meta me \
            WHERE NOT EXISTS(\
                SELECT * FROM obsmar.maregraphe_meta ma \
                WHERE me.id=ma.id_meta AND ma.id_maregraphe=$1\
            ) ORDER BY me.id"
    param = (id,)
    result = await db.fetch_all(query, param)
    return result