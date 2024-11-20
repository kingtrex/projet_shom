from fastapi import FastAPI
from databaseConnect import databaseConnect
from psycopg2.extras import RealDictCursor

from fastapi.middleware.cors import CORSMiddleware

import uvicorn
app = FastAPI()
origine = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origine,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/maregraphe")
async def getMaregraphe():
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM obsmar.maregraphe")
    return cur.fetchall()

@app.get("/metadonnee/{id}")
async def root(id: int):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"SELECT * FROM obsmar.maregraphe_meta WHERE id_maregraphe = {id}")
    return cur.fetchall()

@app.post("/addMeta/{id}&{meta}&{data}")
async def addMeta(id: int, meta: str, data: str):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"INSERT INTO obsmar.maregraphe_meta (id_maregraphe, id_meta, donnee) VALUES ({id}, '{meta}', '{data}')")
    db.commit()
    return cur.lastrowid

@app.put("/updateMeta/{id}&{meta}&{data}")
async def updateMeta(id: int, meta: str, data: str):
    db = databaseConnect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"UPDATE obsmar.maregraphe_meta SET donnee = '{data}' WHERE id_maregraphe = {id} AND id_meta = '{meta}'")
    db.commit()
    return cur.lastrowid

@app.get("/hello/{name}&{test}")
async def say_hello(name: str, test: str):
    return {"message": f"Hello {name} {test}"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
