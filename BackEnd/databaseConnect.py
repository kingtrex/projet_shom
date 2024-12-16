
import psycopg2 as psy


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