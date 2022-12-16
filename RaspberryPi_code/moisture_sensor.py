from adafruit_ads1x15.analog_in import AnalogIn
import adafruit_ads1x15.ads1015 as ADS
import board, busio

i2c = busio.I2C(board.SCL, board.SDA)
ads = ADS.ADS1015(i2c,address=0x48)

chan_mositure = AnalogIn(ads, ADS.P1)

def get_moisture_level():
    return chan_mositure.value

if __name__ == '__main__':
    print(get_moisture_level())