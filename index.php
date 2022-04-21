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
		<meta name="creator" content="Pellegatta Simone, Andreotti Riccardo, Jacopo Nava, Michela Acciaretti, Matteo Maino, Ivan Conte, Pietro Panzeri">
		<meta name="reply-to" content="naochallenge2022@gmail.com">
		<meta name="theme-color" content="#348cc5">

		<!--Fonts-->
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab" type="text/css" media="all">

		<!--Style-->
		<link rel="stylesheet" href="<?=ROOT?>/style.css" type="text/css" media="all">

		<!--Javascript & jQuery-->
		<script src="jquery-3.6.0.min.js"></script>
		<!--script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script-->
		<script src="mapdata.js" defer></script>
		<script src="script.js" defer></script>

		<!--Favicon-->
		<link rel="icon" href="<?=ROOT?>/favicon/favicon.ico" type="image/x-icon">
		<link rel="icon" href="<?=ROOT?>/favicon/favicon-16x16.png" type="image/png" sizes="16x16">
		<link rel="icon" href="<?=ROOT?>/favicon/favicon-32x32.png" type="image/png" sizes="32x32">
		<link rel="icon" href="<?=ROOT?>/favicon/favicon-48x48.png" type="image/png" sizes="48x48">
		<link rel="icon" href="<?=ROOT?>/favicon/favicon-96x96.png" type="image/png" sizes="96x96">
		<link rel="manifest" href="<?=ROOT?>/manifest.webmanifest">

		<!--Preload-->
		<!--link rel="preload" as="image" imagesrcset=" 392w,  722w" imagesizes="(min-width: 61.25em) 722px, 392px"-->
	</head>

	<body>
		<div id="container">
			<img src="<?=ROOT?>/img/map.png" alt="Mappa del museo" draggable="false" />
		</div>

		<canvas id="canvas"></canvas>
	</body>
</html>
