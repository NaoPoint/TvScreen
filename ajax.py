from flask import Flask, render_template, request
import json

app = Flask(__name__)	#current module name

@app.route('/')
def index():
	return render_template('index.php')

@app.route('/ajax', methods=['POST'])
def ajax():
	print(request)
	return {'processed': 'true'}

if __name__ == "__main__":	#if in main module
	app.run(debug=True)