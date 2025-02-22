#import libraries
import time
import RPi.GPIO as GPIO

#GPIO setup -- pin 29 /12 as moisture sensor input
#GPIO setup -- GPIO12
GPIO.setmode(GPIO.BCM)
GPIO.setup(12,GPIO.IN)


try:
    while True:
        if (GPIO.input(12))==0:
            print('Wet')
            
        elif (GPIO.input(12))==1:
            print('Dry')
        time.sleep(3)

finally:
    #cleanup the GPIO pins before ending
    GPIO.cleanup()