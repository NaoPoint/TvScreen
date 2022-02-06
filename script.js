//single point on the map:
class Point {
    constructor(horizontal, vertical) {	//percentage coordinates
        this.horizontal = horizontal
        this.vertical = vertical
    }
}

class Connection {
    totalLength = 0

    constructor(start, end, axis, x, y) {    //array of every turn in the connection
        console.log(this.totalLength)
        
        if(axis) {  //true = horizontal
            this.totalLength += this.calculateLength(x)
            this.totalLength += this.calculateLength(y)

            console.log(this.totalLength)
        }
    }

    calculateLength(array) {
        let length = 0
        
        for (let i = 0; i < length(array); i++)
            length += Math.abs(array[i] - array[i + 1])
        
        return length
    }
}

points = setPoints()	//set points inside mapdata.js
paths = setPaths()	//set points inside mapdata.js

//point marker:
for (const point of points) {
	let marker = document.createElement("span")	//virtual element
	marker.classList.add("marker")	//for css

	//set marker position (already absolute)
	marker.style.left = point.horizontal + "%"
	marker.style.top = point.vertical + "%"

	document.body.appendChild(marker)	//assign virtual element to body
}
