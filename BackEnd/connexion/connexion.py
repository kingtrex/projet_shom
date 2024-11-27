import configparser
import json
from datetime import timedelta, timezone, datetime

import jwt

from typing import Annotated

from fastapi import Depends, APIRouter, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from starlette import status
from jwt.exceptions import InvalidTokenError

from passlib.context import CryptContext


import os

import ast

SECRET_KEY = "292eceaf7266e55b10d28c87659f6bc16f8366d62cf687bf929d92c1e31c4a4c"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="connexion/token")
router = APIRouter()

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None

class UserInDB(User):
    hashed_password: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    print(f"password: {plain_password}")
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db, username: str):

    if db.has_option("USERS", username):
        user_dict = ast.literal_eval(db["USERS"][username])
        return UserInDB(**user_dict)

def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False

    if not verify_password(password, user.hashed_password):
        return False
    return user



def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=1)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    fichierConf = configparser.ConfigParser()
    fichierConf.sections()
    fichierConf.read("connexion/exemple.ini")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = get_user(fichierConf, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: dict,
) -> Token:
    print(form_data["username"])
    fichierConf = configparser.ConfigParser()
    fichierConf.sections()
    fichierConf.read("./connexion/exemple.ini")
    if not fichierConf.has_option("USERS", form_data["username"]):
        print("mauvais login")
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    user = authenticate_user(fichierConf, form_data["username"], form_data["password"])
    if not user:
        print("mauvais mdp")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

@router.post("/newUser/{user}&{password}&{fullName}&{mail}")
async def addUser(user: str, password: str, fullName: str, mail: str,
                  token: Annotated[User, Depends(get_current_user)],):
    config = configparser.ConfigParser()
    config.read("connexion/exemple.ini")
    hashed_password = pwd_context.hash(password)
    newJson = {
        "username": user,
        "full_name": fullName,
        "email": mail,
        "hashed_password": hashed_password,
        "disabled": "False",
    }
    config.set("USERS", user, json.dumps(newJson))
    with open("connexion/exemple.ini", "w") as f:
        config.write(f)

@router.get("/items/")
async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}

@router.get("/users/me")
async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
    return current_user

