from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import uvicorn

from api import(
    maregraphe,
    maregrapheMeta,
    meta
)

from connexion import connexion

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

app.include_router(maregraphe.router, prefix="/maregraphe", tags=["maregraphe"])
app.include_router(maregrapheMeta.router, prefix="/maregrapheMeta", tags=["maregrapheMeta"])
app.include_router(meta.router, prefix="/meta", tags=["meta"])
app.include_router(connexion.router, prefix="/connexion", tags=["connexion"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
