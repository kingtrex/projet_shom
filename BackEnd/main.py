from fastapi import FastAPI
from databaseConnect import databaseConnect
import uvicorn
app = FastAPI()

@app.get("/maregraphe")
async def getMaregraphe():
    cur = databaseConnect()
    cur.execute("SELECT * FROM obsmar.maregraphe")
    return cur.fetchall()

@app.get("/metadonnee/{id}")
async def root(id: int):
    cur = databaseConnect()
    cur.execute(f"SELECT * FROM obsmar.maregraphe_meta WHERE id_maregraphe = {id}")
    return cur.fetchall()


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
