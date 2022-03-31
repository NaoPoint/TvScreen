# Algoritmo dijkastra
import math

class Algorithm:
	inizio = 'naopoint'	#nome del punto iniziale
	graph = {}	#grafico inviato da javascript
	costo_nodi = {}	#dizionario dei costi iniziali (dal nodo start) che si conoscono (dei nodi collegati al nodo start)
	parents = {}	#dizionario dei parent di ogni nodo
	processati = []	#lista nodi già elaborati, per non dover rielaborarli in continuazione

	def calculate():
		#importante resettare chiamata precedente
		__class__.costo_nodi = {}
		__class__.parents = {}
		__class__.processati = []

		#copia i costi dei collegamenti al nodo opposto
		for i in list(__class__.graph):	#altrimenti non posso aggiungere nodi al grafo
			for j in __class__.graph[i]:
				if j not in __class__.graph:	#aggiungo se non esiste l'elemento opposto
					__class__.graph[str(j)] = {}

				if i != __class__.inizio:	#esclusione di inizio: non ha senso tornare indietro
					__class__.graph[j][i] = __class__.graph[i][j]	#collegamenti copiati nel valore inverso

		num_nodi = len(__class__.graph) - 1	#numero totale del nodi (tolgo inizio)

		#inizializzazione dizionario costo_nodi
		for costo_nodo in range(num_nodi):
			costo_nodo = str(costo_nodo + 1)	#stringa per chiave dizionario (0-7 ---> 1-8)

			if costo_nodo in __class__.graph[__class__.inizio]:
				__class__.costo_nodi[costo_nodo] = __class__.graph[__class__.inizio][costo_nodo]	#il costo iniziale viene pescato dal grafo
			else:
				__class__.costo_nodi[costo_nodo] = math.inf	 #math.inf indica un valore infinito che non può essere superato da nessun altro collegamento

		#inizializzazione dizionario parents
		for parent in range(num_nodi):
			parent = str(parent + 1)	#stringa per chiave dizionari (0-7 ---> 1-8)

			if __class__.costo_nodi[parent] < math.inf:	#se il costo e' infinito non e' collegato a naopoint
				__class__.parents[parent] = __class__.inizio
			else:
				__class__.parents[parent] = "none"

		#algoritmo
		nodo = __class__.nodoConCostoMinore()
		while nodo is not None:	#finchè ho nodi da elaborare
			costo_nodo = __class__.costo_nodi[nodo]	#costo del nodo corrente
			vicini = __class__.graph[nodo]	#vicini sono i nodi collegati al nodo corrente
			for n in vicini:	#n: lista delle chiavi
				nuovo_costo_nodo = costo_nodo + vicini[n]
				if __class__.costo_nodi[n] > nuovo_costo_nodo:
					__class__.costo_nodi[n] = nuovo_costo_nodo
					__class__.parents[n] = nodo

			__class__.processati.append(nodo)	#aggiunge il nodo alla lista dei processati
			nodo = __class__.nodoConCostoMinore()

		return num_nodi	#per ajax

	#funzione per trovare il nodo con costo minore che esamina il dizionario costo_nodi
	def nodoConCostoMinore():
		costo_minimo = math.inf
		nodo_con_costo_minimo = None

		for nodo in __class__.costo_nodi:	#nodo sono le chiavi del costo nodi
			costo_nodo = __class__.costo_nodi[nodo]	#estrazione del costo dalla chiave
			if(costo_nodo < costo_minimo) and (nodo not in __class__.processati):	#confronta il nodo con costo minore che non sia nella lista dei processati
				costo_minimo = costo_nodo
				nodo_con_costo_minimo = nodo

		return nodo_con_costo_minimo

	def bestPath(num):
		num = str(num)	#1..num_nodi
		percorso = [num]	#si resetta ogni volta

		while __class__.parents[num] != __class__.inizio:	#a ritroso
			percorso.append(str(__class__.parents[num]))	#aggiunti i nodi in cui passo
			num = __class__.parents[num]
		
		percorso.append(__class__.inizio)	#punto iniziale in ogni caso
		return list(reversed(percorso))	#dall'inizio alla fine

	def findPath():
		print(__class__.parents)
		for i in range(1, len(__class__.parents) + 1):	#1..num_nodi
			percorso = __class__.bestPath(i)
			print(i, round(__class__.costo_nodi[str(i)], 2), sep=' - ', end=': ')	#no a capo

			for nodo in percorso:
				print(nodo, end=' ')	#stampa di tutti i nodi
			print()	#fine riga