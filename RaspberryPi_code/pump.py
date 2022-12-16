from config import PUMP_SECONDS, WATER_PUMP_GPIO_PIN
import RPi.GPIO as GPIO
from time import sleep

GPIO.setwarnings(False)

def activate_pump():
    GPIO.output(WATER_PUMP_GPIO_PIN, GPIO.HIGH)
    sleep(PUMP_SECONDS)
    GPIO.output(WATER_PUMP_GPIO_PIN, GPIO.LOW)
    
if __name__ == '__main__':
    activate_pump()