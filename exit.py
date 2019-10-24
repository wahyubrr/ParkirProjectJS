import requests

url = "http://127.0.0.1:8081/exit"

payload = {'id': '5db19a673ca64b0f9e68e5e4'} 
requests.post(url = url, data=payload)

# setelah ini kasih kodingan yang menerima 
# hasil scan QR lalu masukkan nilainya ke payload