import requests

url = "http://127.0.0.1:8081/entry"

while 1:
	input("Press Enter to enter...")
	response = requests.get(url = url)
	data = response.json()
	print(data)
	print(data['id'])
# setelah ini kasih kodingan print QR untuk orang yang parkir