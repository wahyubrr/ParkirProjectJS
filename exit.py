import requests
import math

url = "http://127.0.0.1:8081/exit"

while 1:
	exitid = input("Enter your id: ")
	payload = {'id': exitid} #5db19a673ca64b0f9e68e5e4
	response = requests.post(url = url, data=payload)
	data = response.json()
	print(data)
	print(str(data['timegap']) + " Minutes")
	timegaphour = math.ceil(data['timegap'] / 60)
	price = timegaphour * 5000
	print("Lama parkir: " + str(timegaphour) + " jam")
	print("Harga: " + str(price))

# setelah ini kasih kodingan yang menerima 
# hasil scan QR lalu masukkan nilainya ke payload