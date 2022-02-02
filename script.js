//single point on the map
class Point {
    constructor(horizontal, vertical) {	//percentage coordinates
        this.horizontal = horizontal;
        this.vertical = vertical;
    }
}

console.log(document.body.clientWidth);
console.log(document.body.clientHeight);

//map points
let points = [];	//array containing all the points

points.push(new Point(16.1,54.8));	//naopoint
points.push(new Point(16.1,74.4));	//1
points.push(new Point(27,61.4));	//2
points.push(new Point(47.4,61.4));	//3
points.push(new Point(70.2,61.4));	//4
points.push(new Point(78,73.6));	//5

//point marker:
for (const point of points) {
	console.log(point);
	let circle = document.createElement("span");
	circle.classList.add("circle");

	circle.style.left = point.horizontal + "%";
	circle.style.top = point.vertical + "vh";

	document.body.appendChild(circle);
}
