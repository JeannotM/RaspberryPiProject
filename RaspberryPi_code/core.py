from datetime import datetime, timedelta
from time import sleep
import requests

SLEEP_TIMER = timedelta(seconds=15)
url = "http://localhost:3000/api/stats/"

def insert_water_level(arg: int):
    requests.post(url + "waterlevel", json={"level": arg})
    
def insert_ground_humidity(arg: int):
    requests.post(url + "groundhumidity/1", json={"level": arg})
    
def insert_water_pumped(arg: int):
    requests.post(url + "waterpumped", json={"level": arg})

def start():
    while True:
        time_started = datetime.now()
        # insert_water_pumped(0)

        # plant = get_plant()
        # if plant is wet:

        # water_level
        # insert_water_level(water_level)

        sleep(SLEEP_TIMER - (datetime.now() - time_started)) # Make sure to print interval equally


if __name__ == '__main__':
    start()