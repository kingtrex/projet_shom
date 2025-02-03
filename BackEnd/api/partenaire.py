from fastapi import APIRouter, Depends, HTTPException, Request
from databaseConnect import execute_query
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
    result = await execute_query(query, True)
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
    result = await execute_query(query, True)
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
            VALUES (%s, %s, %s, %s)"
    param = (id, nom, logo, url)
    result = await execute_query(query, False, param)
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
            SET nom=%s, logo=%s, url=%s \
            WHERE id=%s"
    param = (nom, logo, url, id)
    result = await execute_query(query, False, param)
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
            WHERE id_partenaire=%s"
    param = (id,)
    await execute_query(query, False, param)
    #supprimer le marégraphe
    query = "DELETE FROM obsmar.partenaire \
            WHERE id=%s"
    param = (id,)
    result = await execute_query(query, False, param)
    return result


