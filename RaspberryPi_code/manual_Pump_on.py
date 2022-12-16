import RPi._GPIO as GPIO
import datetime
import time
from ADC1115_materlevel_sensor import get_moisture_level, get_water_level
init = False
level=get_water_level()

def get_last_watered():
    try:
        f = open("last_watered.txt", "r")
        return f.readline()
    except:
        return "NEVER!"
   
def get_status(pin = 12):
    GPIO.setup(pin, GPIO.IN)
    return GPIO.input(pin) 

def init_output(pin):
    GPIO.setup(pin, GPIO.OUT)
    GPIO.setup(pin,GPIO.LOW)


def pump_on(pump_pin = 26, delay = 1):
    init_output(pump_pin)
    f = open("last_watered.txt", "w")
    f.write("Last watered {}".format(datetime.datetime.now()))
    f.close()
    GPIO.output(pump_pin, GPIO.HIGH)
    time.sleep(1)
    GPIO.output(pump_pin, GPIO.LOW)



if __name__ == '__main__':
    pump_on()