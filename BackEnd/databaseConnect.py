from asyncpg import UndefinedTableError, UndefinedColumnError, ForeignKeyViolationError, UniqueViolationError
from fastapi import HTTPException
import asyncpg

def check_error(e):
    if isinstance(e, UndefinedTableError):
        raise HTTPException(status_code=500, detail="La table demandée n'existe pas.")
    elif isinstance(e, UndefinedColumnError):
        raise HTTPException(status_code=500, detail="La colonne demandée n'existe pas.")
    elif isinstance(e, ForeignKeyViolationError):
        raise HTTPException(status_code=500, detail="Violation de clés étrangères")
    elif isinstance(e, UniqueViolationError):
        raise HTTPException(status_code=500, detail="Clé primaire déjà existante")
    else:
        raise HTTPException(status_code=500, detail=f"Une erreur est survenue : {type(e)}")


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
            try:
                return await conn.fetch(query, *params)
            except Exception as e:
                check_error(e)


    async def execute(self, query: str, params: tuple = ()):
        if not self.pool:
            raise ConnectionError("Le pool de connexions n'a pas été initialisé.")
        async with self.pool.acquire() as conn:
            try:
                return await conn.execute(query, *params)
            except Exception as e:
                check_error(e)

db = DataBase()