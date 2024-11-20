from fastapi import APIRouter
from psycopg2.extras import RealDictCursor
from databaseConnect import databaseConnect

router = APIRouter()

@router.get("/getMetaId/")
async def getMetaId():
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"SELECT * FROM obsmar.meta")
    return cur.fetchall()
