from databaseConnect import execute_query
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException

from connexion.connexion import User, get_current_user
router = APIRouter()

@router.get("/getMetaId/")
async def get_meta_id(token: Annotated[User, Depends(get_current_user)]):

    query = "SELECT * FROM obsmar.meta \
            ORDER BY id"
    result = await execute_query(query, True)
    return result

@router.get("/sort/{col}&{order}")
async def sort_meta(col: str, order: bool, token: Annotated[User, Depends(get_current_user)]):
    allow_col = ["id", "ordre"]
    if col not in allow_col:
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")

    query = f"SELECT * FROM obsmar.meta ORDER BY {col} "
    if order:
        query += "DESC"
    print(query)
    result = await execute_query(query, True)
    return result

@router.post("/addMeta/{id}&{desc}&{ordre}")
async def add_meta(id: str, desc: str, ordre: int,
                   token: Annotated[User, Depends(get_current_user)]):

    query = "INSERT INTO obsmar.meta VALUES (%s, %s, %s)"
    param = (id, desc, ordre)
    result = await execute_query(query, False, param)
    return result

@router.put("/updateMeta/{id}&{desc}&{ordre}")
async def update_meta(id: str, desc: str, ordre: int,
                      token: Annotated[User, Depends(get_current_user)]):

    query = "UPDATE obsmar.meta \
            SET description=%s, ordre=%s \
            WHERE id=%s"
    param = (desc, ordre, id)
    result = await execute_query(query, False, param)
    return result

@router.delete("/deleteMeta/{id}")
async def delete_meta(id: str,
                      token: Annotated[User, Depends(get_current_user)]):

    query = "DELETE FROM obsmar.maregraphe_meta WHERE id_meta=%s"
    param = (id,)
    await execute_query(query, False, param)
    query = "DELETE FROM obsmar.meta WHERE id=%s"
    param = (id,)
    result = await execute_query(query, False, param)
    return result
