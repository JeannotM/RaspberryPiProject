from config import SLEEP_TIMER, WATER_TANK_EMPTY, insert_water_pumped, insert_ground_humidity, insert_water_level
from moisture_sensor import get_moisture_level
from distance_meter import get_distance
from pump import activate_pump
from datetime import datetime
from time import sleep

def start():
    while True:
        time_started = datetime.now()

        if get_moisture_level() > 2000 and get_distance() < WATER_TANK_EMPTY:
            insert_water_pumped(1)
            activate_pump()
        else:
            insert_water_pumped(0)

        insert_ground_humidity(get_moisture_level())
        insert_water_level(get_distance())

        sleep(SLEEP_TIMER.total_seconds() - (datetime.now() - time_started).total_seconds()) # Make sure to do loop interval equally

if __name__ == '__main__':
    start()