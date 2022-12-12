from config import WATER_LEVEL_GPIO_PIN, GP, insert_into
from time import sleep

# https://www.rototron.info/raspberry-pi-analog-water-sensor-tutorial/
def start():
    GP.setwarnings(False)
    GP.setmode(GP.BCM)
    
    try:
        while 1:
            count = 0
            GP.setup(WATER_LEVEL_GPIO_PIN, GP.OUT)
            GP.output(WATER_LEVEL_GPIO_PIN, GP.LOW)
            sleep(0.05)

            GP.setup(WATER_LEVEL_GPIO_PIN, GP.IN)
            while GP.input(WATER_LEVEL_GPIO_PIN) == GP.LOW:
                count += 1
            print(count)
            sleep(1)
    except KeyboardInterrupt:
        print ("\nCtrl-C pressed.  Program exiting...")
    GP.cleanup()

if __name__ == "__main__":
    start()