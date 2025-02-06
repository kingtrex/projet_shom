
import psycopg2 as psy
from fastapi import HTTPException
from psycopg2.extras import RealDictCursor
import asyncpg

class DataBase:
    def __init__(self):
        self.pool = None

    async def connect(self):
        if self.pool is None:
            self.pool = await asyncpg.create_pool(
                database="postgres",
                user="postgres",
                password="postgres",
                host="localhost",
                port="5432",
                min_size=1,
                max_size=10
            )
            print("Connexion à la base de données réussie!")

    async def disconnect(self):
        if self.pool:
            await self.pool.close()

    async def fetch_all(self, query: str, params: tuple = ()):
        if not self.pool:
            raise ConnectionError("Le pool de connexions n'a pas été initialisé.")
        async with self.pool.acquire() as conn:
            return await conn.fetch(query, *params)

    async def execute(self, query: str, params: tuple = ()):
        if not self.pool:
            raise ConnectionError("Le pool de connexions n'a pas été initialisé.")
        async with self.pool.acquire() as conn:
            return await conn.execute(query, *params)


# noinspection SpellCheckingInspection
def database_connect():
    # noinspection SpellCheckingInspection
    db = psy.connect(
        dbname = "postgres",
        user = "postgres",
        password = "postgres",
        host = "localhost",
        port = "5432",
    )
    return db

async def execute_query(query: str, get_query: bool, param: tuple | str = ()):
    try:
        db = database_connect()
        cur = db.cursor(cursor_factory=RealDictCursor)
        cur.execute(query, param)
        db.commit()
        return cur.fetchall() if get_query else cur.lastrowid
    except Exception as e:
        check_error(e)
    finally:
        if 'db' in locals() and db:
            db.close()



SQLSTATE_MESSAGES = {
    "23503": "Impossible de supprimer : la ressource est référencée ailleurs (clé étrangère).",
    "23505": "Violation de contrainte unique.",
    "42P01": "La table demandée n'existe pas.",
    "22P02": "Identifiant mal formaté.",
}

def check_error(e):
    if e.diag.sqlstate in SQLSTATE_MESSAGES:
        raise HTTPException(status_code=500, detail=SQLSTATE_MESSAGES[e.diag.sqlstate])
    else:
        raise HTTPException(status_code=500, detail=f"Une erreur s'est produite: ({e.diag.sqlstate}) : {str(e)}")

db = DataBase()