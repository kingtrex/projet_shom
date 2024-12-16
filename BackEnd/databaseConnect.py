
import psycopg2 as psy
from fastapi import HTTPException


# noinspection SpellCheckingInspection
def databaseConnect():
    # noinspection SpellCheckingInspection
    db = psy.connect(
        dbname = "postgres",
        user = "postgres",
        password = "postgres",
        host = "localhost",
        port = "5432",
    )
    return db

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
