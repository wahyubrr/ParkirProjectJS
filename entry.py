import requests
import pyqrcode
import RPi.GPIO as GPIO
from gpiozero import Button
from time import sleep

servopin = 14
GPIO.setmode(GPIO.BCM)
GPIO.setup(servopin, GPIO.OUT)

p = GPIO.PWM(servopin, 50) # 50Hz
p.start(2.5) # Initialization

button = Button(3)
url = "http://159.65.7.129/entry"
check = 0

while 1:
    if check == 0:
        print("Press button to enter...")
        check = 1

    if button.is_pressed:
        response = requests.get(url = url)
        data = response.json()
        print(data)
        print("ID: " + str(data['id']))
        print("Spot: " + str(data['index'))
        p.ChangeDutyCycle(5)
        sleep(0.5)
        p.ChangeDutyCycle(7.5)
        sleep(5)
        p.ChangeDutyCycle(5)
        sleep(0.5)
        p.ChangeDutyCycle(2.5)
        check = 0
	#from pyqrcode import QRcode
        #qr = pyqrcode.create(data['id'])
        #qr.png("qr" + str(data['index']) + ".png", scale = 6)
