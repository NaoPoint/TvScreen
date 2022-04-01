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
	res = requests.post('http://127.0.0.1:5000/update', json=dictToSend)	#flask endpoint

	dictFromServer = res.json()
	print(dictFromServer)	#print result (false if error)

if __name__ == "__main__":	#if in main module
	if(len(sys.argv) - 1):	#if there are script arguments
		updateMap(sys.argv[1])	#update using script arguments
	else:
		updateMap()