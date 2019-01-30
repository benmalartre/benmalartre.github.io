<?php

function customSearch($keyword, $arrayToSearch){
    foreach($arrayToSearch as $key => $arrayItem){
        if( stristr( $arrayItem, $keyword ) ){
            return $key;
        }
    }
}

function BuildProjects($clef){
	//$split = explode(",",$projects);
	// requete mySQL
	$sql = 'SELECT * FROM projects WHERE clef="'.$clef.'"';  

	// on lance la requête (mysql_query) et on impose un message d'erreur si la requête ne se passe pas bien (or die)
	$req = mysql_query($sql) or die('Erreur SQL !<br />'.$sql.'<br />'.mysql_error());  
	
	echo '<div id="projects"><strong>Projects:</strong><br>';
	while($data = mysql_fetch_array($req, MYSQL_ASSOC)){
		if(intval($data['havelink'])){
			echo '- <a href=http://'.$data['link'].' target="_blank"><strong>'.$data['name'].'
			('.$data['type'].')</strong> </a>'.$data['description'].'
			<br>';
		}
		
		else{
			echo '- <strong>'.$data['name'].'
			('.$data['type'].')</strong> '.$data['description'].'
			<br>';
		}
	}
	
	mysql_free_result ($req);  
	/*
	for($i=0;$i<count($split);$i++){
		echo '- '.$split[$i].'<br>';
	}
	*/
	echo '</div>';
}

function WriteYear($current,$date){
	$exp = explode('-',$date);
	$year = intval($exp[0]);
	if($year != $current){
		echo '<div id="year"><strong>'.$exp[0].'</strong></div>';
		$current = $year;
	}
	return $current;
}

function BuildDate($date){

	$MONTHS = array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");

	$exp = explode('-',$date);
	return $MONTHS[intval($exp[1])-1].' '.$exp[0];

}

function BuildCV()
{
	include($_SERVER['DOCUMENT_ROOT'] . "/includes/connexion.php");
	echo '<link rel="stylesheet" href="../css/cv.css" />'."\n";
	//echo '<div id="cv_title"> resumé </div>';
	echo 	"<div id='cv'>"; 

	// requete mySQL
	$sql = 'SELECT * FROM cv ORDER BY start DESC';  

	// on lance la requête (mysql_query) et on impose un message d'erreur si la requête ne se passe pas bien (or die)
	$req = mysql_query($sql) or die('Erreur SQL !<br />'.$sql.'<br />'.mysql_error());  
	$counter = 0;
	$first = 0;
	$year = 2001;
	// on loop le tableau juste recuperé
	while ($data = mysql_fetch_array($req, MYSQL_ASSOC))  
	{
		$year = WriteYear($year,$data['end']);
		//if($counter==$first)
		{

			//$desc = $data['DESCRIPTION'];
			//$short_desc = substr($desc,0,160);
			//<div id="job">'.$short_desc.'...</div><br/>
			$key = $data['clef'];
			$img = '../images/thumbs/'.$key.'_Thumb.jpg';
			$lnk = $key.'.php';
			$sd = BuildDate($data['start']);
			$ed = BuildDate($data['end']);
			
			echo '
			<section>
			<div style="display:block">
			<div id="place">'.$sd.'-'.$ed.str_repeat('&nbsp;', 25).'<strong>'.$data['place'].'</strong></div>
			<div id="job"><strong>'.$data['job'].'</strong></div>';
			
			BuildProjects($key);
			
			echo '<div id="tools"><strong>Tools:</strong><br>'.$data['tools'].'</div>
			</section>
			';
		}
		$counter += 1;
	}

	// on libère l'espace mémoire alloué pour cette interrogation de la base
	mysql_free_result ($req);  
	mysql_close ();
	echo "</div>";  
}
?>