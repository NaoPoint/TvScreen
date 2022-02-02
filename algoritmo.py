# Algoritmo dijkastra
import math

#costruzione del grafo
grafo = {}                      #creo un dizionario "grafo" in cui inserisco tutti i punti del grafo
grafo["inizio"] = {}            #definisco una corrispondenza interna al nodo
grafo["inizio"]["1"] = 4
grafo["inizio"]["2"] = 4        #ad ogni valore del grafo assegno una lista, che sarebbe il collegamento con un altro grafo,
grafo["inizio"]["3"] = 3        #a cui poi dò un valore (il costo del collegamento)
grafo["inizio"]["7"] = 3
grafo["inizio"]["8"] = 3

grafo["1"] = {}
grafo["1"]["2"] = 1


grafo["2"] = {}
grafo["2"]["1"] = 1
grafo["2"]["3"] = 3
grafo["2"]["4"] = 2

grafo["3"] = {}
grafo["3"]["2"] = 3
grafo["3"]["4"] = 1
grafo["3"]["6"] = 1
grafo["3"]["7"] = 2

grafo["4"] = {}
grafo["4"]["2"] = 2
grafo["4"]["3"] = 1
grafo["4"]["5"] = 1

grafo["5"] = {}
grafo["5"]["4"] = 1
grafo["5"]["6"] = 1

grafo["6"] = {}
grafo["6"]["3"] = 1
grafo["6"]["5"] = 1
grafo["6"]["7"] = 2

grafo["7"] = {}
grafo["7"]["3"] = 2
grafo["7"]["6"] = 2
grafo["7"]["8"] = 1

grafo["8"] = {}
grafo["8"]["7"] = 1

#dizionario dei costi iniziali (dal nodo start) che si conoscono (dei nodi collegati al nodo start)
costo_nodi = {}
costo_nodi["1"] = 4
costo_nodi["2"] = 4
costo_nodi["3"] = 3
costo_nodi["4"] = math.inf     #math.inf indica un valore infinito che non può essere superato da nessun altro collegamento
costo_nodi["5"] = math.inf
costo_nodi["6"] = math.inf
costo_nodi["7"] = 3
costo_nodi["8"] = 3

#lista nodi già elaborati, per non dover rielaborarli in continuazione
processati = []

#dizionario dei parent di ogni nodo
parents = {}
parents["1"] = "inizio"
parents["2"] = "inizio"
parents["3"] = "inizio"
parents["4"] = None
parents["5"] = None
parents["6"] = None
parents["7"] = "inizio"
parents["8"] = "inizio"


#funzione per trovare il nodo con costo minore che esamina il dizionario costo_nodi
def nodo_con_costo_minore(costo_nodi):
    costo_minimo = math.inf
    nodo_con_costo_minimo = None

    for n in costo_nodi:                #n sono i nodi
        costo_nodo = costo_nodi[n]
        if(costo_nodo < costo_minimo) and (n not in processati):    #confronta il nodo con costo minore che non sia nella lista dei processati
            costo_minimo = costo_nodo
            nodo_con_costo_minimo = n

    return nodo_con_costo_minimo


#algoritmo
nodo = nodo_con_costo_minore(costo_nodi)
while nodo is not None:                         #finchè ho nodi da elaborare
    costo_nodo = costo_nodi[nodo]               #costo del nodo corrente
    vicini = grafo[nodo]                        #vicini sono i nodi collegati al nodo corrente
    for n in vicini.keys():                     #keys() restituisce le chiavi come elenco
        nuovo_costo_nodo = costo_nodo + vicini[n]
        if costo_nodi[n] > nuovo_costo_nodo:
            costo_nodi[n] = nuovo_costo_nodo
            parents[n] = nodo

    processati.append(nodo)                     #aggiunge il nodo alla lista dei processati
    nodo = nodo_con_costo_minore(costo_nodi)

print(parents)

