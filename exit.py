# import the necessary packages
from imutils.video import VideoStream
from pyzbar import pyzbar
import argparse
import datetime
import imutils
import time
import cv2

# http request
import requests
import math
exiturl = "http://192.168.43.135/exit"

# servo
import RPi.GPIO as GPIO
from time import sleep
servopin = 18
GPIO.setmode(GPIO.BCM)
GPIO.setup(servopin, GPIO.OUT)
p = GPIO.PWM(servopin, 50)
p.start(2.5)

# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-o", "--output", type=str, default="barcodes.csv",
	help="path to output CSV file containing barcodes")
args = vars(ap.parse_args())

# initialize the video stream and allow the camera sensor to warm up
print("[INFO] starting video stream...")
vs = VideoStream(src=0).start()
#vs = VideoStream(usePiCamera=True).start()
time.sleep(2.0)
 
# open the output CSV file for writing and initialize the set of
# barcodes found thus far
csv = open(args["output"], "w")
found = set()

# loop over the frames from the video stream
while True:
	# grab the frame from the threaded video stream and resize it to
	# have a maximum width of 400 pixels
	frame = vs.read()
	frame = imutils.resize(frame, width=400)

	# find the barcodes in the frame and decode each of the barcodes
	barcodes = pyzbar.decode(frame)

	# loop over the detected barcodes
	for barcode in barcodes:
		# extract the bounding box location of the barcode and draw
		# the bounding box surrounding the barcode on the image
		(x, y, w, h) = barcode.rect
		cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
 
		# the barcode data is a bytes object so if we want to draw it
		# on our output image we need to convert it to a string first
		barcodeData = barcode.data.decode("utf-8")
		barcodeType = barcode.type
 
		# draw the barcode data and barcode type on the image
		text = "{} ({})".format(barcodeData, barcodeType)
		cv2.putText(frame, text, (x, y - 10),
			cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

		# replacing the unecessary character from the text
		newstr = text.replace(" (QRCODE)", "")
		
		# if qrcode is the same, don't send http request again
		if text[:1] == "5":
			# send http request to server
			payload = {'id': newstr}
			response = requests.post(url = exiturl, data=payload)
			data = response.json()
			print(data)
			print("Lama parkir: " + str(data['timegap']) + " Minutes")
			timegaphour = math.ceil(data['timegap'] / 60)
			price = timegaphour * 5000
			print("Dibulatkan menjadi: " + str(timegaphour) + " jam")
			print("Harga: " + str(price))
			input("Press enter to continue...")

			# servo
			p.ChangeDutyCycle(5)
			sleep(0.5)
			p.ChangeDutyCycle(7.5)
			sleep(5)
			p.ChangeDutyCycle(5)
			sleep(0.5)
			p.ChangeDutyCycle(2.5)

		elif text[:1] != "5":
			print("Fake QR identified!")
			sleep(1)

		# if the barcode text is currently not in our CSV file, write
		# the timestamp + barcode to disk and update the set
		if barcodeData not in found:
			csv.write("{},{}\n".format(datetime.datetime.now(),
				barcodeData))
			csv.flush()
			found.add(barcodeData)

	# show the output frame
	#cv2.imshow("Barcode Scanner", frame)
	#key = cv2.waitKey(1) & 0xFF
 
	# if the `q` key was pressed, break from the loop
	#if key == ord("q"):
	#	break
 
# close the output CSV file do a bit of cleanup
print("[INFO] cleaning up...")
csv.close()
cv2.destroyAllWindows()
vs.stop()
