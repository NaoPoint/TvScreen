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
	output = None

	try:
		res = requests.post('http://192.168.1.100:5000/update', json=dictToSend)	#flask endpoint
		output = res.json()	#success

	except requests.ConnectionError as e:
		output = "Connection error: " + str(e)	#connection refused / aborted

	except Exception as e:
		output = "Unknown error: " + str(sys.exc_info()[0])	#unexpected

	finally:
		print(output)	#print result (success or error)

if __name__ == "__main__":	#if in main module (not imported)
	if(len(sys.argv) - 1):	#if there are script arguments
		updateMap(sys.argv[1])	#update using script arguments
	else:
		updateMap()	#default