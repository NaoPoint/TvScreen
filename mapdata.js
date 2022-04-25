function setPoints() {
	//map points:
	let points = {}	//array containing all the points

	points["naopoint"] = new Point("naopoint", 70, 17)	//naopoint
	points["1"] = new Point("1", 27.8, 26)	//scala 0
	points["2"] = new Point("2", 75, 23)	//scala 1
	points["3"] = new Point("3", 26.5, 71.2)	//scala 2
	points["4"] = new Point("4", 75, 71.2)	//scala 3
	points["5"] = new Point("5", 67.52, 31)	//torcitoio 1
	points["6"] = new Point("6", 39, 80.5)	//graticcio 2
	points["7"] = new Point("7", 16, 22.5)	//ruota idraulica 0
	points["8"] = new Point("8", 28.1, 82.6)	//incannatoio 2
	points["9"] = new Point("9", 25.4, 83.5)	//scatola dei colori 2
	points["10"] = new Point("10", 33.9, 72.5)	//bagno 2
	points["11"] = new Point("11", 85.2, 33.5)	//biblioteca 1

	return points
}

function setConnections() {
	//map connections
	let connections = {}

	for (key of Object.keys(points))	//keys same as points
		connections[key] = {}

	//naopoint - scala 1
	connections["naopoint"]["2"] = new Connection(points["naopoint"], points["2"], true, [76], [])	//horizontal
	
	//scala 0 - scala 1
	connections["1"]["2"] = new Connection(points["1"], points["2"], -1, [], [])	//invisible
	
	//scala 1 - scala 2
	connections["2"]["3"] = new Connection(points["2"], points["3"], -1, [], [])	//invisible
	
	//scala 2 - scala 3
	connections["3"]["4"] = new Connection(points["3"], points["4"], -1, [], [])	//invisible
	
	//scala 1 - torcitoio
	connections["2"]["5"] = new Connection(points["2"], points["5"], false, [], [26])	//vertical

	//scala 2 - graticcio
	connections["3"]["6"] = new Connection(points["3"], points["6"], false, [31.3], [76.5, 83.8])	//vertical
	
	//scala 0 - ruota idraulica
	connections["1"]["7"] = new Connection(points["1"], points["7"], false, [9], [40])	//vertical

	//scala 2 - incannatoio
	connections["3"]["8"] = new Connection(points["3"], points["8"], false, [], [])	//vertical
	
	//scala 2 - scatola dei colori
	connections["3"]["9"] = new Connection(points["3"], points["9"], false, [], [])	//vertical

	//scala 2 - bagno
	connections["3"]["10"] = new Connection(points["3"], points["10"], false, [], [76.5])	//vertical

	//scala 1 - biblioteca
	connections["2"]["11"] = new Connection(points["2"], points["11"], false, [81.4], [28, 25.9])	//vertical

	return connections
}