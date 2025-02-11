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

import ast
#chemin du fichier .conf
CONF_FILE_NAME: str = "exemple.conf"
CONF_FILE_PATH: str = "./connexion/" + CONF_FILE_NAME
FILE_SECTION: str = "USERS"
USERNAME_OPTION: str = "username"

SECRET_KEY: str = "292eceaf7266e55b10d28c87659f6bc16f8366d62cf687bf929d92c1e31c4a4c"
ALGORITHM: str = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="connexion/debug")

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Token(BaseModel):
    access_token: str

class TokenData(BaseModel):
    username: str | None = None
    admin: bool = False
    exp: timedelta | None = None

class User(BaseModel):
    username: str
    disabled: bool | None = None
    admin: bool = False
    hashed_password: str

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Le token a expiré, veuillez-vous reconnecter",
        headers={"WWW-Authenticate": "Bearer"},
    )
    file_conf = configparser.ConfigParser()
    file_conf.sections()
    file_conf.read(CONF_FILE_PATH)
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get(USERNAME_OPTION)
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = get_user(file_conf, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=1)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def create_token(user: User) -> Token:
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token_data = TokenData(username=user.username, admin = user.admin)
    access_token = create_access_token(
        data=token_data.__dict__, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(db, username: str) -> User | None:
    if db.has_option(FILE_SECTION, username):
        user_dict = ast.literal_eval(db[FILE_SECTION][username])
        return User(**user_dict)

def authenticate_user(db, username: str, password: str) -> User:
    user = get_user(db, username)
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    return user

@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: dict,
) -> Token:

    file_username = "username"
    file_password = "password"
    file_conf = configparser.ConfigParser()
    file_conf.sections()
    file_conf.read(CONF_FILE_PATH)

    if not file_conf.has_option(FILE_SECTION, form_data[file_username]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    user = authenticate_user(file_conf, form_data[file_username], form_data[file_password])
    return await create_token(user)

@router.post("/newUser/{user}&{password}&{fullName}&{admin}")
async def add_user(user: str, password: str, full_name: str, admin: bool,
                   token: Annotated[User, Depends(get_current_user)], ):
    if token.admin:
        config = configparser.ConfigParser()
        config.read(CONF_FILE_PATH)
        hashed_password = pwd_context.hash(password)
        data_user = User(username = user,
                             full_name = full_name,
                             disabled = False,
                             hashed_password = hashed_password,
                             admin = admin
                             )
        config.set(FILE_SECTION, user, json.dumps(data_user))
        with open(CONF_FILE_PATH, "w") as f:
            config.write(f)
    else:
        raise HTTPException(status_code=403, detail="Accès non autorise")

@router.post("/debug")
async def login_for_debug(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    file_conf = configparser.ConfigParser()
    file_conf.sections()
    file_conf.read(CONF_FILE_PATH)
    if not file_conf.has_option(FILE_SECTION, form_data.username):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    user = authenticate_user(file_conf, form_data.username, form_data.password)
    return await create_token(user)