from sqlite3 import connect
import RPi.GPIO as GP

# https://forums.raspberrypi.com/viewtopic.php?t=279870
def insert_into(query: str, args: list):
    con = connect("tutorial.db")
    cur = con.cursor()
    cur.execute(query, args)
    con.commit()

WATER_LEVEL_GPIO_PIN = 27
IS_WET_GPIO_PIN = 17