function setPoints() {
	//map points:
	let points = {}	//array containing all the points

	points["naopoint"] = new Point("naopoint", 17.1, 56.8)	//naopoint
	points["1"] = new Point("1", 17.1, 76.4)	//1
	points["2"] = new Point("2", 28, 64.4)	//2
	points["3"] = new Point("3", 48.4, 63.4)	//3
	points["4"] = new Point("4", 71.2, 64.4)	//4
	points["5"] = new Point("5", 79, 75.8)	//5
	points["6"] = new Point("6", 93.5, 78)	//6
	points["7"] = new Point("7", 86.8, 63)	//7
	points["8"] = new Point("8", 85.7, 45.2)	//8
	points["9"] = new Point("9", 65.5, 50)	//9

	return points
}

function setPaths() {
	//map connections
	let connections = []

	//naopoint - 1
	connections.push(new Connection(points["naopoint"], points["1"], false, [21], [64.9, 72.6]))	//vertical

	//naopoint - 2
	connections.push(new Connection(points["naopoint"], points["2"], false, [], []))	//vertical

	//naopoint - 9
	connections.push(new Connection(points["naopoint"], points["9"], false, [], []))	//vertical

	//2 - 3
	connections.push(new Connection(points["2"], points["3"], true, [35.6, 43], [75]))	//horizontal

	//2 - 9
	connections.push(new Connection(points["2"], points["9"], true, [35.6], []))	//horizontal

	//3 - 4
	connections.push(new Connection(points["3"], points["4"], true, [60], []))	//horizontal

	//4 - 5
	connections.push(new Connection(points["4"], points["5"], true, [], []))	//horizontal

	//4 - 8
	connections.push(new Connection(points["4"], points["8"], true, [79], [51.6]))	//horizontal

	//4 - 9
	connections.push(new Connection(points["4"], points["9"], true, [79], []))	//horizontal

	//5 - 6
	connections.push(new Connection(points["5"], points["6"], true, [86], [89]))	//horizontal

	//5 - 7
	connections.push(new Connection(points["5"], points["7"], true, [], []))	//horizontal

	//6 - 7
	connections.push(new Connection(points["6"], points["7"], false, [], [75.4]))	//vertical

	//7 - 8
	connections.push(new Connection(points["7"], points["8"], true, [], []))	//horizontal

	//8 - 9
	connections.push(new Connection(points["8"], points["9"], false, [], []))	//vertical

	return connections
}