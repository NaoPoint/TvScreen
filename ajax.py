from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

from algorithm import Algorithm

point = None

if __name__ == "__main__":	#if in main module
	app = Flask(__name__)	#current module name
	CORS(app)	#send Access-Control-Allow-Origin header

	""" 
	@app.route('/')
	def index():
		return render_template('index.php')
	"""

	@app.route('/update', methods=['POST'])	#update requested point from choreographe
	def update():
		global point
		point = request.get_json()	#new point to be set

		return jsonify(True)	#dummy

	@app.route('/get', methods=['POST'])	#return requested point
	def get():
		request.get_data()	#ignore request data

		return jsonify(point)	#null until /update is called

	@app.route('/graph', methods=['POST'])	#update map graph
	def graph():
		graph = request.get_json()

		Algorithm.graph = graph	#json to dict
		Algorithm.calculate()	#calculate best paths

		return jsonify({'success': graph})
	
	@app.route('/path', methods=['POST'])	#request best path to point
	def path():
		num = request.get_json()
		path = Algorithm.bestPath(num)	#best path for a given point

		return jsonify(path)

	app.env = 'development'
	app.run(host='127.0.0.1', port='5000', debug=False)	#same as in script-js