import sys
import requests
import json
from random import randrange

def updateMap(num = None):
	if(num is not None):	#is parameter passed
		dictToSend = num
	else:
		dictToSend = str(randrange(1, 9))	#update using random number

	json.loads(dictToSend)	#convert to json

	try:
		res = requests.post('http://192.168.1.100:5000/update', json=dictToSend)	#flask endpoint
		dictFromServer = res.json()
	except requests.ConnectionError as e:
		dictFromServer = e	#connection refused / aborted
	finally:
		print(dictFromServer)	#print result (false if error)

if __name__ == "__main__":	#if in main module (not imported)
	if(len(sys.argv) - 1):	#if there are script arguments
		updateMap(sys.argv[1])	#update using script arguments
	else:
		updateMap()	#default