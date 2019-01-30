<?php
function GetPostValue($post){
	$value = NULL;
	if( isset($_POST[$post])){
		 $value = $_POST[$post];
	}
	return $value;
}
?>

<?php
echo '<head>
	<!--<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />-->
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />

	<link rel="stylesheet" href="../css/style.css" />
	<meta name="title" content="La Basse-Cour des Miracles" />
	<meta name="description" content="Association lucrative à but marginale"/>
	<meta name="keywords" content="La basse-cour des Miracles, Daniel Depoutot, Valentin Malartre, Pascal Zagari, Freakowsky Dela Nasa, Ben Bozob, Aude Charles & Macha Luchankina,Arts Plastiques, Mecanique, Electronique, Serigraphie, Dessin, Peinture, Decors, Installations, Association, Association de malfaiteurs, Maux-Faisants"/>
	
	<!-- Indexer et suivre -->
	<meta name="robots" content="index,follow" /> 
	<!--link href="http://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet" type="text/css"-->
	</head>';
?>
