function setPoints() {
	//map points:
	let points = [];	//array containing all the points

	points.push(new Point(16.1,54.8));	//naopoint
	points.push(new Point(16.1,74.4));	//1
	points.push(new Point(27,61.4));	//2
	points.push(new Point(47.4,61.4));	//3
	points.push(new Point(70.2,61.4));	//4
	points.push(new Point(78,73.6));	//5

	return points;
}

function setPaths() {
	let connections = [];

	//naopoint - 1
	x = [points[0].horizontal, 20]
	y = [64,8, 74,4, points[1].vertical];
	connections[0] = new Connection(points[0], points[1], false, x, y);	//vertical
}