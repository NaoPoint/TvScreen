//ajax request to flask
class Ajax {
	static #METHOD = "POST"
	static #HOST = "192.168.1.100:5000"	//same as in ajax.py

	static request(serverData, route) {
		let result

		$.ajax({	//ajax request
			type: this.#METHOD,
			url: "http://" + this.#HOST + "/" + route,	//path caught by Flask on ajax.py
			data: JSON.stringify(serverData),	//stringify graph (from list/dict to json)
			contentType: "application/json",	//data type sent to server
			dataType: "json",	//data type expected from server
			async: false,

			success: function(response) {	//response in case of success
				result = response	//accessible from outside
				console.info(response)
			},
			error: function(error) {	//error message
				result = NaN	//undefined value
				console.error(error.responseText);
			}
		})

		return result	//either success or error (NaN)
	}
}

//single point on the map:
class Point {
    constructor(name, horizontal, vertical) {	//percentage coordinates
		this.name = name
        this.horizontal = horizontal
        this.vertical = vertical
    }

	static displayPoints(points) {	//display a point
		//point marker:
		for (const point of Object.values(points)) {
			let marker = document.createElement("span")	//virtual element
			marker.classList.add("point", "marker")	//for css

			//set marker position (already absolute)
			marker.style.left = point.horizontal + "%"
			marker.style.top = point.vertical + "%"

			document.body.appendChild(marker)	//assign virtual element to body
		}
	}
}

class Connection {
    totalLength = 0

    constructor(start, end, axis, x, y) {    //array of every turn in the connection
		//prepare canvas
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		this.start = start.name	//e.g. 1,2,3,naopoint
		this.end = end.name
		this.axis = axis  //true = horizontal first in the path, false = vertical first, -1 = invisible
		this.x = x
		this.y = y

		//start at the beginning, end at the end
		x.unshift(start.horizontal)
		x.push(end.horizontal)

		y.unshift(start.vertical)
		y.push(end.vertical)
        
		this.totalLength += this.calculateLength(x)	//length on the x axis
		this.totalLength += this.calculateLength(y)	//length on the y axis
    }

    calculateLength(array) {
        let length = 0
        
        for (let i = 0; i < array.length - 1; i++)
            length += Math.abs(array[i] - array[i + 1])
        
		return length.toFixed(2)*1	//round to 2 decimals
    }

	static #pathPoints = []
	static #CONTEXT = canvas.getContext("2d");	//get working context

	static displayAllConnections(connections, timer) {	//display connection between points
		let i = 0	//for timer
		for (const point of Object.values(connections))
			for (const connection of Object.values(point)) {
				if(timer)
					setTimeout(function(connection) {
						Connection.displayConnection(connection)
					}, i = i + 200, connection)
				else
					this.displayConnection(connection)
			}
	}

	static displayConnection(connection) {	//display a single connection
		if(connection.axis !== -1) {	//invisible marker
			this.#displayConnectionPoint(connection.x[0], connection.y[0])	//starting point of path

			for(let i = 1; i < Math.max(connection.x.length, connection.y.length); i++) {	//for direction change
				if(connection.axis)	//display horizontal change first
					this.#displayConnectionPoint(connection.x[i], connection.y[i-1])
				else	//display vertical change first
					this.#displayConnectionPoint(connection.x[i-1], connection.y[i])

				if(i in connection.x && i in connection.y)	//in case of even number of points
					this.#displayConnectionPoint(connection.x[i], connection.y[i])	//points common to horizontal and vertical axis (starting point, final point, even points (if two or more points))
			}

			this.#drawPath()	//draw actual path
		}
	}

	static removeConnections() {
		document.querySelectorAll(".marker").forEach(marker => marker.remove())	//delete every point
		this.#CONTEXT.clearRect(0, 0, canvas.width, canvas.height)	//empty canvas (connections)
	}

	static #displayConnectionPoint(x, y) {	//display a single point of a connection
		let marker = document.createElement("span")	//virtual element
		marker.classList.add("connection", "marker")	//for css

		//set marker position (already absolute)
		marker.style.left = x + "%"
		marker.style.top = y + "%"

		document.body.appendChild(marker)	//assign virtual element to body

		this.#pathPoints.push({"x": x * window.innerWidth / 100, "y": y * window.innerHeight / 100})	//percentage to pixels
	}

	static #drawPath() {
		//set line style	
		this.#CONTEXT.lineWidth = 7;	//stroke
		this.#CONTEXT.lineJoin = "round";	//angle between lines
		this.#CONTEXT.shadowOffsetX = 0;		//distance between line and shadow
		this.#CONTEXT.shadowOffsetY = 0;
		this.#CONTEXT.shadowBlur = 5;
		this.#CONTEXT.shadowColor = "white";
		

		for(let i = 0; i < this.#pathPoints.length - 1; i++) {	//all but the last (one li)
			var gradient = this.#CONTEXT.createLinearGradient(this.#pathPoints[i]["x"], this.#pathPoints[i]["y"], this.#pathPoints[i + 1]["x"], this.#pathPoints[i + 1]["y"]);	//create gradient
			gradient.addColorStop(0, "rgba(48,207,208,1)");	//gradient color 1
			gradient.addColorStop(1, "rgba(51,8,130,1)");	//gradient color 2
			this.#CONTEXT.strokeStyle = gradient;
			
			//draw the line
			this.#CONTEXT.beginPath();
			this.#CONTEXT.moveTo(this.#pathPoints[i]["x"], this.#pathPoints[i]["y"]);	//initial point
			this.#CONTEXT.lineTo(this.#pathPoints[i + 1]["x"], this.#pathPoints[i + 1]["y"]);	//ending point
			this.#CONTEXT.stroke();
		}

		this.#pathPoints = []	//empty current path points
	}
}

let points = setPoints()	//set points inside mapdata.js
let connections = setConnections()	//set points inside mapdata.js

Point.displayPoints(points)
// Connection.displayAllConnections(connections, true)//display all connections

//create json graph for python
graph = {}
for (const point of Object.values(connections))
	for (const connection of Object.values(point)) {
		let start = connection.start

		if (!(start in graph))	//if subgraph not defined yet
			graph[start] = {}	//subgraph for a single point
		
		graph[start][connection.end] = connection.totalLength	//assign cost to graph connection
	}

Ajax.request(graph, "graph")	//set graph
currentPoint = null	//initial empty state

Ajax.request(points, "points")	//set graph

setInterval(function() {	//continuous graph update
	let newPoint = Ajax.request(null, "get")	//ask for request update

	if(newPoint === false) {
		window.location.reload()
		console.log("reloading...")
	} else if(newPoint != currentPoint) {	//check if path changed
		Connection.removeConnections()	//delete previous path
		currentPoint = newPoint	//update current point

		if(currentPoint != null) {	//if no empty path
			let display = Ajax.request(currentPoint, "path")	//get path

			for (let i = 0; i < display.length - 1; i++) {	//load new path
				let point1 = display[i]
				let point2 = display[i+1]

				if(point2 in connections[point1])	//it could be one way or the opposite
					Connection.displayConnection(connections[point1][point2])	//display single path
				else
					Connection.displayConnection(connections[point2][point1])	//display single path
			}
		}
	}
}, 1000)	//new ajax request every 1 second