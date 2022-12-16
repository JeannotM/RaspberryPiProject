import RPi.GPIO as GPIO
import time
print("x")
import time,os

import datetime

TRIG = 21  #altra sonic GPIO
ECHO = 20
ALARM = 23  #alarm die komt nog
#stel de tank lengte is 100
TANK_VOEL = 14
TANK_LAAG = 2

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

GPIO.setup(TRIG,GPIO.OUT)
GPIO.setup(ECHO,GPIO.IN)
GPIO.output(TRIG, False)

GPIO.setup(ALARM,GPIO.OUT)
GPIO.output(ALARM, True)

print ("Waiting For Sensor To start")
time.sleep(1) 

def get_distance():
	dist_add = 0
	x = 0
	while 1:
	#for x in range(20):
	
		try:
			GPIO.output(TRIG, True)
			time.sleep(0.00001)
			GPIO.output(TRIG, False)
			
			while GPIO.input(ECHO)==0:
				start_meeting = time.time()

			while GPIO.input(ECHO)==1:
				stop_meeting = time.time()

			meeting_time = stop_meeting - start_meeting
			
			distance = meeting_time * 17150

			distance = round(distance, 3)
			print (x, "distance: ", distance)
		
			dist_add = dist_add + distance
			#print "dist_add: ", dist_add
			time.sleep(.1) # 100ms interval between readings
			low_level_warning()
		
		except Exception as e: 
		
			pass
	
	avg_dist=dist_add/20
	dist=round(avg_dist,3)
	#print ("dist: ", dist)
	return dist

""" def sendData_to_remoteServer(dist):
	# put de ip adress op de url
	url_remote="url" + str(dist)
	cmd="curl -s " + url_remote
	result=os.popen(cmd).read()
	print (cmd)
	 """
		
	
def low_level_warning(dist):
	tank_height=TANK_VOEL     #set your tank height here
	level=tank_height-dist
	if(level<TANK_LAAG):
		print("level low : ", level)
		GPIO.output(ALARM, False)
        #hier komt not Yellow LED
	else:
		GPIO.output(ALARM, True)
        #hier komt nog Green LED
		print("level ok")

		

def main():
	
	distance=get_distance()
	
	print ("distance: ", distance)
	#sendData_to_remoteServer(distance)
	low_level_warning(distance)
	print ("---------------------")
    
	
	
if __name__ == '__main__':
    main()

