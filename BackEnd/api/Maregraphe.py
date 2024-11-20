from fastapi import APIRouter
from databaseConnect import databaseConnect
from psycopg2.extras import RealDictCursor

router = APIRouter()

@router.get("/getMaregraphe")
async def getMaregraphe():
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM obsmar.maregraphe")
    return cur.fetchall()
