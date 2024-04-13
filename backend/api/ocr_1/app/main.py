from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from time import sleep
import ml


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем запросы от всех источников (*), можно также указать конкретные источники ['http://localhost', 'http://localhost:3000']
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Разрешаем использование указанных методов
    allow_headers=["*"],  # Разрешаем использование всех заголовков
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/device")
def device():
    return str(torch.device('cuda' if torch.cuda.is_available() else 'cpu'))

@app.get("/get_pred")
def pred(text: dict):
    img = text['image']
    response = ml.work(img)
    return response
