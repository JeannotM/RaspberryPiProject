import time
import RPi.GPIO as GPIO
import board
import busio
import adafruit_ads1x15.ads1015 as ADS
from adafruit_ads1x15.analog_in import AnalogIn

# create the i2c bus

i2c = busio.I2C(board.SCL, board.SDA)
ads = ADS.ADS1015(i2c,address=0x48)
# ads = ADS.ADS1015(i2c,address=0x48)
#create single-ended input on channel 0

chan_water_level = AnalogIn(ads, ADS.P0)
#chan_2 = AnalogIn(ads, ADS.p1)

#to create differential input between channel 0 and 1
chan_mositure = AnalogIn(ads, ADS.P1)
#print("{:>5}\t{:>5}".format("raw", "v"))
# while True:
#     print("Water_level is: "+"{:>5}\t{:>.3f}".format(chan_water_level.value,chan_water_level.voltage))
#     #print("Water_level is: "+"{:>5}\t{:>.3f}".format(chan_water_level.value,chan_water_level.voltage))
#     #print("raw: {:>5}\tv: {:>4.2f}".format(chan.value, chan_water_level.voltage))
#     print("Mositure_level is: "+"{:>5}\t{:>.3f}".format(chan_mositure.value,chan_mositure.voltage))
#     time.sleep (1)    

def get_moisture_level():
    return chan_mositure.value

def get_water_level():
    return chan_water_level.value