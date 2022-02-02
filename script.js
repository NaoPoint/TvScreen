//single point on the map:
class Point {
    constructor(horizontal, vertical) {	//percentage coordinates
        this.horizontal = horizontal;
        this.vertical = vertical;
    }
}

//map points:
let points = [];	//array containing all the points

points.push(new Point(16.1,54.8));	//naopoint
points.push(new Point(16.1,74.4));	//1
points.push(new Point(27,61.4));	//2
points.push(new Point(47.4,61.4));	//3
points.push(new Point(70.2,61.4));	//4
points.push(new Point(78,73.6));	//5

//point marker:
for (const point of points) {
	let marker = document.createElement("span");	//virtual element
	marker.classList.add("marker");	//for css

	//set marker position (already absolute)
	marker.style.left = point.horizontal + "%";
	marker.style.top = point.vertical + "%";

	document.body.appendChild(marker);	//assign virtual element to body
}
