<!DOCTYPE html>
<html lang="it">
	<head><?php define("ROOT", $_SERVER['SERVER_NAME'] == 'localhost' ? '.' : 'https://www.naopoint.com')?>
	
		<title>Nao Point</title>
		<meta name="description" content="Il futuro dei musei italiani">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="application-name" content="Nao Point">
		<meta name="author" content="Bachi Informati, naochallenge2022@gmail.com">
		<meta name="color-scheme" content="only light">
		<meta name="copyright" content="Apache 2.0 &copy; 2022">
		<meta name="creator" content="Pellegatta Simone, Andreotti Riccardo">
		<meta name="reply-to" content="naochallenge2022@gmail.com">
		<meta name="theme-color" content="#348cc5">

		<!--Fonts-->
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab" type="text/css" media="all">

		<!--Style-->
		<link rel="stylesheet" href="<?=ROOT?>/style.css" type="text/css" media="all">

		<!--Browsers-->
		<link rel="icon" href="<?=ROOT?>/favicon/favicon.ico" type="image/x-icon">
		<link rel="icon" href="<?=ROOT?>/favicon/favicon-16x16.png" type="image/png" sizes="16x16">
		<link rel="icon" href="<?=ROOT?>/favicon/favicon-32x32.png" type="image/png" sizes="32x32">
		<link rel="icon" href="<?=ROOT?>/favicon/favicon-48x48.png" type="image/png" sizes="48x48">
		<link rel="icon" href="<?=ROOT?>/favicon/favicon-96x96.png" type="image/png" sizes="96x96">
		<link rel="icon" href="<?=ROOT?>/favicon/favicon.svg" type="image/svg+xml">
		<link rel="manifest" href="<?=ROOT?>/manifest.webmanifest">

		<!--Preload-->
		<!--link rel="preload" as="image" imagesrcset=" 392w,  722w" imagesizes="(min-width: 61.25em) 722px, 392px"-->

		<style>
			body {
				margin: 0;	/*full screen*/
			}
			#container {
				display: flex;
				flex-flow: row nowrap;

				width: 100%;	/*temp*/
				aspect-ratio: 16/9;	/*tv aspect ratio*/
			}
			#map {
				height: 100%;	/*only way to make aspect ratio work*/
			}
			#map img {
				height: 100%;
				aspect-ratio: 6/5;	/*this could change*/
			}
			#secondary {
				flex-grow: 1;	/*for #container (parent)*/

				display: flex;
				flex-flow: column nowrap;
			}
			#park {
				flex-grow: 1;	/*this can grow (if different ratio for #map img)*/
				min-height: 0;	/*this can shrink*/
			}
			#hologram {
				aspect-ratio: 1/1;	/*temp: not mandatory*/
			}
		</style>
	</head>

	<body>
		<div id="container">
			<div id="map">
				<img src="<?=ROOT?>/img/map.png" alt="Mappa del museo" draggable="false" />
			</div>
			<div id="secondary">
				<img id="park"src="<?=ROOT?>/img/park.png" alt="Parcheggio del Nao" draggable="false" />
				<img id="hologram" src="<?=ROOT?>/img/hologram.png" alt="Ologramma" draggable="false" />
			</div>
		</div>
	</body>
</html>
