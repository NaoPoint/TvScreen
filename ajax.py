from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

from algorithm import Algorithm

if __name__ == "__main__":	#if in main module
	app = Flask(__name__)	#current module name
	CORS(app)	#send Access-Control-Allow-Origin header

	""" 
	@app.route('/')
	def index():
		return render_template('index.php')
	"""

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