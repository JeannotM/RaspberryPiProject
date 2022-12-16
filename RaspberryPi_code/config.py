from time import timedelta
import requests

def insert_water_level(arg: int):
    if IS_ONLINE:
        requests.post(url + "waterlevel", json={"level": arg})
    
def insert_ground_humidity(arg: int):
    if IS_ONLINE:
        requests.post(url + "groundhumidity/1", json={"level": arg})
    
def insert_water_pumped(arg: int):
    if IS_ONLINE:
        requests.post(url + "waterpumped", json={"level": arg})

url = "http://localhost:3000/api/stats/"

# Pins
DISTANCE_METER_TRIGGER_PIN = 21
DISTANCE_METER_ECHO_PIN = 20
WATER_PUMP_PIN = 26

# Timers
SLEEP_TIMER = timedelta(seconds=15)
PUMP_SECONDS = 2

# Other
WATER_TANK_EMPTY = 9.6
IS_ONLINE = False