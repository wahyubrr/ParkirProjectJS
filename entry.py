import requests
#import pyqrcode

url = "http://127.0.0.1/entry"

while 1:
	input("Press Enter to enter...")
	response = requests.get(url = url)
	data = response.json()
	print(data)
	print("ID: " + str(data['id']))
	print("Spot: " + str(data['index']))

	#from pyqrcode import QRcode
	#qr = pyqrcode.create(data['id'])
	#qr.svg("qr/" + str(data['index']) + ".svg", scale = 8)