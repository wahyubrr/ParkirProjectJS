import requests

payload = {'id': '5db19a673ca64b0f9e68e5e4'}
requests.post("http://127.0.0.1:8081/exit", data=payload)
