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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/detect")
def detect(data: dict):
    res = requests.get("http://ocr_1/get_pred", json=data).json()
    if type(res) is list:
        return res[0]
    else:
        return {
            'type': 'notFound',
            'confidence': 0.0,
            'series': '',
            'number': '',
            'page_number': -1,
            }

@app.post("/detect_multiple")
def detect_multiple(data: dict):
    res = requests.get("http://ocr_1/get_pred", json=data).json()
    return res

@app.post("/detect_temp")
def temp_detect():
    return temp