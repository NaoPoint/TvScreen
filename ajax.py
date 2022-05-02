from flask import Flask, jsonify, request
from flask_cors import CORS
from waitress import serve

from algorithm import Algorithm

point = None	#last requested point
length = None	#number of points

points = None	#dictionary containing points coordinates

if __name__ == "__main__":	#if in main module (not imported)
	print("NaoPoint: flask server is running. Do not close this window!\n")
	print("Use the stop script to terminate the execution.")

	app = Flask(__name__)	#current module name
	CORS(app)	#send Access-Control-Allow-Origin header

	""" 
	@app.route('/')
	def index():
		return render_template('index.php')
	"""

	@app.route('/update', methods=['POST'])	#update requested point from choreographe
	def update():
		update = request.get_json()	#new point to be set

		try:
			if(length is not None and int(update) > 0 and int(update) <= length):	#check graph set and valid point
				global point
				point = update

				if(points is not None):	#if coordinates have already been set
					return jsonify(points[point])	#confirmation
		except ValueError:	#if not integer
			pass	#return error below

		return jsonify(False)	#error

	@app.route('/get', methods=['POST'])	#return requested point
	def get():
		request.get_data()	#ignore request data

		if(length is not None):	#if graph has already been set
			return jsonify(point)	#null until /update is called
		
		return jsonify(False)	#error (reload in script.js)

	@app.route('/graph', methods=['POST'])	#update map graph
	def graph():
		graph = request.get_json()
		Algorithm.graph = graph	#json to dict

		global length	#save number of points
		length = Algorithm.calculate()	#calculate best paths

		return jsonify({'success': graph})	#confirmation
	
	@app.route('/points', methods=['POST'])	#save all map points
	def points():
		global points
		points = request.get_json()	#save points to send to choregraphe

		return jsonify({'success': points})	#confirmation
	
	@app.route('/path', methods=['POST'])	#request best path to point
	def path():
		num = request.get_json()
		path = Algorithm.bestPath(num)	#best path for a given point

		return jsonify(path)

	serve(app, host="0.0.0.0", port=5000)

	#app.env = 'development'
	#app.run(host='0.0.0.0', port='5000', threaded=True, debug=True)	#same as in script-js