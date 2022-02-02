#dati temporanei del grafico

#costruzione del grafo
grafo = {}	#creo un dizionario "grafo" in cui inserisco tutti i punti del grafo

grafo["inizio"] = {}	#definisco una corrispondenza interna al nodo
grafo["inizio"]["1"] = 4
grafo["inizio"]["2"] = 4	#ad ogni valore del grafo assegno una lista, che sarebbe il collegamento con un altro grafo,
grafo["inizio"]["3"] = 3	#a cui poi dò un valore (il costo del collegamento)
grafo["inizio"]["7"] = 3
grafo["inizio"]["8"] = 3

grafo["1"] = {}
grafo["1"]["2"] = 1

grafo["2"] = {}
grafo["2"]["3"] = 3
grafo["2"]["4"] = 2

grafo["3"] = {}
grafo["3"]["4"] = 1
grafo["3"]["6"] = 1
grafo["3"]["7"] = 2

grafo["4"] = {}
grafo["4"]["5"] = 1

grafo["5"] = {}
grafo["5"]["6"] = 1

grafo["6"] = {}
grafo["6"]["7"] = 2

grafo["7"] = {}
grafo["7"]["8"] = 1

grafo["8"] = {}
