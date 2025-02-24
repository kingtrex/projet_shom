from fastapi import APIRouter, Depends, HTTPException, Request
from databaseConnect import db
from connexion.connexion import User, get_current_user
from typing import Annotated

router = APIRouter()

@router.get("/getPartenaire")
async def get_partenaire(token: Annotated[User, Depends(get_current_user)]):

    """"
    Récupère l'ensemble des partenaires
    Args:
        token (User): L'utilisateur authentifié.
    Returns:
        list: Une liste de partenaire.
        """

    query = "SELECT * FROM obsmar.partenaire \
            ORDER BY id"
    result = await db.fetch_all(query)
    return result

@router.get("/sort/{col}&{order}")
async def sort_partenaire(col: str, order: bool, token: Annotated[User, Depends(get_current_user)]):

    """"
    Trier les partenaires
    Args:
        col (str): La colonne utilisée pour le tri
        order (bool): L'ordre du tri (true: décroissant, false: croissant)
        token: l'utilisateur connecté
    Returns:
        list: Les partenaires triés
    """
    allow_col = ["id", "nom"]
    if col not in allow_col:
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")

    query = f"SELECT * FROM obsmar.partenaire ORDER BY {col} "
    if order:
        query += f"DESC"
    result = await db.fetch_all(query)
    return result

@router.post("/addPartenaire/{id}&{nom}&{logo}")
async def add_partenaire(nom: str, logo: str, id: int,
                         request: Request,
                         token: Annotated[User, Depends(get_current_user)]):
    
    """"
    Ajoute un partenaire
    Args:
        id (int): L'identifiant du partenaire
        nom (str): Le nom du partenaire
        logo (str): Le logo du partenaire
        token: l'utilisateur connecté
    Returns:
        dict: Le résultat de l'insertion
    """
    json = await request.json()
    url = json["url"]

    query = "INSERT INTO obsmar.partenaire(id, nom, logo, url) \
            VALUES ($1, $2, $3, $4)"
    param = (id, nom, logo, url)
    result = await db.execute(query, param)
    return result

@router.put("/updatePartenaire/{id}&{nom}&{logo}")
async def update_partenaire(id: int, nom: str, logo: str,
                            request: Request,
                            token: Annotated[User, Depends(get_current_user)]):
    
    """"
    Met à jour un partenaire
    Args:
        id (int): L'identifiant du partenaire
        nom (str): Le nom du partenaire
        logo (str): Le logo du partenaire
        token: l'utilisateur connecté
    Returns:
        dict: Le résultat de la mise à jour
    """
    json = await request.json()
    url = json["url"]
    query = "UPDATE obsmar.partenaire \
            SET nom=$1, logo=$2, url=$3 \
            WHERE id=$4"
    param = (nom, logo, url, id)
    result = await db.execute(query, param)
    return result

@router.delete("/deletePartenaire/{id}")
async def delete_partenaire(id: int,
                            token: Annotated[User, Depends(get_current_user)]):
    """"
    Supprime un partenaire
    Args:
        id_partenaire (int): L'identifiant du partenaire
        token: l'utilisateur connecté   
    Returns:
        dict: Le résultat de la suppression
    """

    #Supprimer la relation entre le partenaire et tous ses marégraphes
    query = "DELETE FROM obsmar.partenaire_maregraphe\
            WHERE id_partenaire=$1"
    param = (id,)
    await db.execute(query, param)
    #supprimer le marégraphe
    query = "DELETE FROM obsmar.partenaire \
            WHERE id=$1"
    param = (id,)
    result = await db.execute(query, param)
    return result


