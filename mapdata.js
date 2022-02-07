function setPoints() {
	//map points:
	let points = []	//array containing all the points

	points.push(new Point("naopoint", 17.1, 56.8))	//naopoint
	points.push(new Point("1", 17.1, 76.4))	//1
	points.push(new Point("2", 28, 64.4))	//2
	points.push(new Point("3", 48.4, 63.4))	//3
	points.push(new Point("4", 71.2, 64.4))	//4
	points.push(new Point("5", 79, 75.8))	//5

	return points
}

function setPaths() {
	//map connections
	let connections = []

	//naopoint - 1
	x = [21]
	y = [64.9, 76.5]
	connections.push(new Connection(points[0], points[1], false, x, y))	//vertical

	return connections
}