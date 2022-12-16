from config import DISTANCE_METER_TRIGGER_PIN, DISTANCE_METER_ECHO_PIN
import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

GPIO.setup(DISTANCE_METER_TRIGGER_PIN, GPIO.OUT)
GPIO.setup(DISTANCE_METER_ECHO_PIN, GPIO.IN)
GPIO.output(DISTANCE_METER_TRIGGER_PIN, False)

def get_distance():
    GPIO.output(DISTANCE_METER_TRIGGER_PIN, True)
    time.sleep(0.00001)
    GPIO.output(DISTANCE_METER_TRIGGER_PIN, False)
    
    while GPIO.input(DISTANCE_METER_ECHO_PIN) == 0:
        start_meeting = time.time()

    while GPIO.input(DISTANCE_METER_ECHO_PIN) == 1:
        stop_meeting = time.time()

    meeting_time = stop_meeting - start_meeting
    
    return round(meeting_time * 17150, 3)

if __name__ == '__main__':
    print(get_distance())