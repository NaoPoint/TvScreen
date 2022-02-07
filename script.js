//single point on the map:
class Point {
    constructor(horizontal, vertical) {	//percentage coordinates
        this.horizontal = horizontal
        this.vertical = vertical
    }

	static displayPoints(points) {
		//point marker:
		for (const point of points) {
			let marker = document.createElement("span")	//virtual element
			marker.classList.add("point marker")	//for css

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
		//start at the beginning, end at the end
		x.unshift(start.horizontal)
		x.push(end.horizontal)
		y.unshift(start.vertical)
		y.push(end.vertical)
        
		this.totalLength += this.calculateLength(x)	//length on the x axis
		this.totalLength += this.calculateLength(y)	//length on the y axis

        if(axis) {  //true = horizontal first in the path, false = vertical first

        } else {

		}

		console.log(this.totalLength)	//temp
    }

    calculateLength(array) {
        let length = 0
        
        for (let i = 0; i < array.length - 1; i++)
            length += Math.abs(array[i] - array[i + 1])
        
		return length.toFixed(2)*1	//round to 2 decimals
    }

	static displayConnections(connections) {
		//point marker:
		for (const connection of connections) {
			let marker = document.createElement("span")	//virtual element
			marker.classList.add("connection marker")	//for css

			//set marker position (already absolute)
			marker.style.left = point.horizontal + "%"
			marker.style.top = point.vertical + "%"

			document.body.appendChild(marker)	//assign virtual element to body
		}
	}
}

points = setPoints()	//set points inside mapdata.js
paths = setPaths()	//set points inside mapdata.js

Point.displayPoints(points)
Point.displayPoints(paths)