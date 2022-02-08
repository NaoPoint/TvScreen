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
		this.axis = axis  //true = horizontal first in the path, false = vertical first
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
		for (const connection of connections) {
			if(timer)
				setTimeout(function(connection) {
					Connection.displayConnection(connection)
				}, i = i + 1000, connection)
			else
				this.displayConnection(connection)
		}
	}

	static displayConnection(connection) {	//display a single connection
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
		//set line stroke and line width
		this.#CONTEXT.strokeStyle = "black";
		this.#CONTEXT.lineWidth = 5;

		for(let i = 0; i < this.#pathPoints.length - 1; i++) {	//all but the last (one li)
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
let paths = setPaths()	//set points inside mapdata.js

Point.displayPoints(points)
// Connection.displayConnection(paths[1])	//display single path
Connection.displayAllConnections(paths, true)//display all paths

//create json graph for python
graph = {}
for (const connection of paths) {
	let start = connection.start

	if (!(start in graph))	//if subgraph not defined yet
		graph[start] = {}	//subgraph for a single point
	
	graph[start][connection.end] = connection.totalLength	//assign cost to graph connection
}

json = JSON.stringify(graph)	//text to send to python
console.log(graph)