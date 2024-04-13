from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from time import sleep

app = FastAPI()

temp = {
  "type": "personal_passport",# | vehicle_passport | vehicle_certificate | driver_license  # string
  "confidence": 0.995656666,
  "series": "34 43",
  "number": '01 23',
  "page_number": 1  
}


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

@app.post("/detect_")
def detect(data: dict):
    res = requests.get("http://ocr_1/get_pred", json=data).json()
    return res

@app.post("/detect")
def temp_detect():
    return temp