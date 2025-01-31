import configparser

config = configparser.ConfigParser()

config["USERS"] = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
        "admin": True,
    },
    "notAdmin": {
        "username": "notAdmin",
        "full_name": "<NAME>",
        "email": "<EMAIL>",
        "disabled": False,
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "admin": False,
    },
}

with open("exemple.conf", "w") as file:
    config.write(file)
    file.close()

