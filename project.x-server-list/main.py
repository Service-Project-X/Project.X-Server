from fastapi import FastAPI
from pydantic import BaseModel

from config.mysql_conn import engineconn
from list.list_repository import MyList

app = FastAPI()

engine = engineconn()
session = engine.sessionmaker()


class CreateList(BaseModel):
    title: str
    description: str


@app.get("/")
async def first_get():
    example = session.query(MyList).all()
    return example


@app.post("/")
async def first_post(create_list: CreateList):
    created_list = MyList(title=create_list.title, description=create_list.description)
    session.add(created_list)
    session.commit()
    return create_list
