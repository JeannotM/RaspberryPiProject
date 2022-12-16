# External module imp
import RPi.GPIO as GPIO
import datetime
import time
from ADC1115_materlevel_sensor import get_moisture_level, get_water_level
init = False

#GPIO.setmode(GPIO.BCM) # Broadcom pin-numbering scheme
GPIO.setmode(GPIO.BCM)
#GPIO.setmode(GPIO.BCM)
GPIO.setup(26,GPIO.OUT) # reley
GPIO.setup(12,GPIO.IN) #sensor mosi
def get_last_watered():
    try:
        f = open("last_watered.txt", "r")
        return f.readline()
    except:
        return "NEVER!"
   
def get_status(pin = 12):
    GPIO.setup(pin, GPIO.IN)
    return GPIO.input(pin) 
    

# External module imp
import RPi.GPIO as GPIO
import datetime
import time
from ADC1115_materlevel_sensor import get_moisture_level, get_water_level
from ultrasonic_water_level import get_distance
init = False

#GPIO.setmode(GPIO.BCM) # Broadcom pin-numbering scheme
GPIO.setmode(GPIO.BCM)
#GPIO.setmode(GPIO.BCM)
GPIO.setup(26,GPIO.OUT) # reley
GPIO.setup(12,GPIO.IN) #sensor mosi
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
    GPIO.output(pin, GPIO.LOW)
    # GPIO.output(pin, GPIO.HIGH) 

def should_pump_water(delay = .6, pump_pin =26, water_sensor_pin = 12):
    consecutive_water_count = 0 
    init_output(pump_pin)
    try:
        # and consecutive_water_count < 1
        while 1:
            dis_waterl_level=get_distance
            level = get_moisture_level()
            print(level, consecutive_water_count)

            # 1200 is waterlevel
            if level > 2000 and get_distance() > 2:
                if consecutive_water_count < 10:
                    GPIO.output(pump_pin, GPIO.HIGH)
                else:
                    GPIO.output(pump_pin, GPIO.LOW)
                consecutive_water_count += 1
            else:
                GPIO.output(pump_pin, GPIO.HIGH)
                consecutive_water_count = 0

            time.sleep(delay)


    except KeyboardInterrupt: # If CTRL+C is pressed, exit cleanly:
        GPIO.cleanup() # cleanup all GPI



def pump_on(pump_pin = 26, delay = 1):
    init_output(pump_pin)
    f = open("last_watered.txt", "w")
    f.write("Last watered {}".format(datetime.datetime.now()))
    f.close()
    GPIO.output(pump_pin, GPIO.HIGH)
    time.sleep(1)
    GPIO.output(pump_pin, GPIO.LOW)

if __name__ == "__main__":
    should_pump_water()
    
  

def init_output(pin):
    GPIO.setup(pin, GPIO.OUT)
    GPIO.output(pin, GPIO.LOW)
    # GPIO.output(pin, GPIO.HIGH) 
    

def should_pump_water(delay = .6, pump_pin =26, water_sensor_pin = 12):
    consecutive_water_count = 0 
    init_output(pump_pin)
    try:
        # and consecutive_water_count < 1
        while 1:
            level = get_moisture_level()
            print(level, consecutive_water_count)

            # 1200 is waterlevel
            if level > 2000:
                if consecutive_water_count < 10:
                    GPIO.output(pump_pin, GPIO.HIGH)
                else:
                    GPIO.output(pump_pin, GPIO.LOW)
                consecutive_water_count += 1
            else:
                GPIO.output(pump_pin, GPIO.LOW)
                consecutive_water_count = 0

            time.sleep(delay)


    except KeyboardInterrupt: # If CTRL+C is pressed, exit cleanly:
        GPIO.cleanup() # cleanup all GPI



def pump_on(pump_pin = 26, delay = 1):
    init_output(pump_pin)
    f = open("last_watered.txt", "w")
    f.write("Last watered {}".format(datetime.datetime.now()))
    f.close()
    GPIO.output(pump_pin, GPIO.HIGH)
    time.sleep(1)
    GPIO.output(pump_pin, GPIO.LOW)

if __name__ == "__main__":
    should_pump_water()
    
  
