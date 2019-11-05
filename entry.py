import requests

url = "http://127.0.0.1:80/entry"

while 1:
	input("Press Enter to enter...")
	response = requests.get(url = url)
	data = response.json()
	print(data)
	print("ID: " + str(data['id']))
	print("Spot: " + str(data['index']))
# setelah ini kasih kodingan print QR untuk orang yang parkir