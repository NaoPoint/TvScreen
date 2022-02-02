# Algoritmo dijkastra
import math
from graphdata import *

num_nodi = 8	#numero totale del nodi

#copia i costi dei collegamenti al nodo opposto
for i in grafo:
	for j in grafo[i]:
		if i != "inizio":	#esclusione di "inizio": non ha senso tornare indietro
			grafo[j][i] = grafo[i][j]	#collegamenti copiati nel valore inverso

costo_nodi = {}	#dizionario dei costi iniziali (dal nodo start) che si conoscono (dei nodi collegati al nodo start)
parents = {}	#dizionario dei parent di ogni nodo

#inizializzazione dizionario costo_nodi
for costo_nodo in range(num_nodi):
	costo_nodo = str(costo_nodo + 1)	#stringa per chiave dizionario (0-7 ---> 1-8)

	if costo_nodo in grafo["inizio"]:
		costo_nodi[costo_nodo] = grafo["inizio"][costo_nodo]	#il costo iniziale viene pescato dal grafo
	else:
		costo_nodi[costo_nodo] = math.inf	 #math.inf indica un valore infinito che non può essere superato da nessun altro collegamento

#inizializzazione dizionario parents
for parent in range(num_nodi):
	parent = str(parent + 1)	#stringa per chiave dizionari (0-7 ---> 1-8)

	if costo_nodi[parent] < math.inf:	#se il costo e' infinito non e' collegato ad inizio
		parents[parent] = "inizio"
	else:
		parents[parent] = "none"

#funzione per trovare il nodo con costo minore che esamina il dizionario costo_nodi
def nodo_con_costo_minore(costo_nodi):
	costo_minimo = math.inf
	nodo_con_costo_minimo = None

	for nodo in costo_nodi:	#nodo sono le chiavi del costo nodi
		costo_nodo = costo_nodi[nodo]	#estrazione del costo dalla chiave
		if(costo_nodo < costo_minimo) and (nodo not in processati):	#confronta il nodo con costo minore che non sia nella lista dei processati
			costo_minimo = costo_nodo
			nodo_con_costo_minimo = nodo

	return nodo_con_costo_minimo

processati = []	#lista nodi già elaborati, per non dover rielaborarli in continuazione

#algoritmo
nodo = nodo_con_costo_minore(costo_nodi)
while nodo is not None:	#finchè ho nodi da elaborare
	costo_nodo = costo_nodi[nodo]	#costo del nodo corrente
	vicini = grafo[nodo]	#vicini sono i nodi collegati al nodo corrente
	for n in vicini:	#n: lista delle chiavi
		nuovo_costo_nodo = costo_nodo + vicini[n]
		if costo_nodi[n] > nuovo_costo_nodo:
			costo_nodi[n] = nuovo_costo_nodo
			parents[n] = nodo

	processati.append(nodo)	#aggiunge il nodo alla lista dei processati
	nodo = nodo_con_costo_minore(costo_nodi)

print(parents.values())	# final output