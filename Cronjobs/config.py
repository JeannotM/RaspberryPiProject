import requests
import RPi.GPIO as GP

# https://forums.raspberrypi.com/viewtopic.php?t=279870
def insert_water_level(arg: int):
    requests.post(url + "waterlevel", json={"level": arg})
    
def insert_ground_humidity(arg: int):
    requests.post(url + "groundhumidity", json={"level": arg})
    
def insert_water_pumped(arg: int):
    requests.post(url + "waterpumped", json={"level": arg})
    
url = "http://localhost:3000/api/stats/"
WATER_LEVEL_GPIO_PIN = 27
IS_WET_GPIO_PIN = 17