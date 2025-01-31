from databaseConnect import execute_query
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from connexion.connexion import User, get_current_user

from datetime import datetime

router = APIRouter()

@router.get("/getMeta/{id}")
async def get_maregraphe_meta(id: int,
               token: Annotated[User, Depends(get_current_user)]):

    query = "SELECT * FROM obsmar.maregraphe_meta WHERE id_maregraphe=%s ORDER BY id_meta"
    result = await execute_query(query, True, (id,))
    return result


@router.get("/sort/{id}&{col}&{order}")
async def sort_maregraphe_meta(id: int, col: str, order: bool, token: Annotated[User, Depends(get_current_user)]):
    allowed_col = ["id_meta", "date_donnee"]
    if col not in allowed_col:
        raise HTTPException(status_code=500, detail="Nom de colonne invalide")

    query = f"SELECT * FROM obsmar.maregraphe_meta WHERE id_maregraphe=%s ORDER BY {col} "
    if order:
        query += f"DESC"

    result = await execute_query(query, True, (id,))
    return result

@router.post("/addMeta/{id}&{meta}&{data}")
async def add_meta(id: int, meta: str, data: str,
                   token: Annotated[User, Depends(get_current_user)]):

    query = "INSERT INTO obsmar.maregraphe_meta \
            VALUES (%s, %s, %s, %s)"
    param = (id, meta, data, datetime.now())
    result = await execute_query(query, False, param)
    return result

@router.put("/updateMeta/{id}&{meta}&{data}")
async def update_meta(id: int, meta: str, data: str,
                      token: Annotated[User, Depends(get_current_user)]):

    query = f"UPDATE obsmar.maregraphe_meta SET donnee = %s \
            WHERE id_maregraphe = %s AND id_meta = %s"
    param = (data, id, meta)
    result = await execute_query(query, False, param)
    return result

@router.delete("/deleteMeta/{id}&{meta}")
async def delete_meta(id: int, meta: str,
                      token: Annotated[User, Depends(get_current_user)]):

    query = "DELETE FROM obsmar.maregraphe_meta \
            WHERE id_maregraphe = %s AND id_meta = %s"
    param = (id, meta)
    result = await execute_query(query, False, param)
    return result

@router.get("/getMetaForm/{id}")
async def get_meta_form(id: int,token: Annotated[User, Depends(get_current_user)]):

    query = "SELECT * FROM obsmar.meta me \
            WHERE NOT EXISTS(\
                SELECT * FROM obsmar.maregraphe_meta ma \
                WHERE me.id=ma.id_meta AND ma.id_maregraphe=%s\
            ) ORDER BY me.id"
    param = (id,)
    result = await execute_query(query, True, param)
    return result