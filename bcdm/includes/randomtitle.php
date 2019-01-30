<?php

function IsIndex()
{
	$filename = basename($_SERVER['PHP_SELF']);

	if($filename == "index.php")
		return true;
	else
		return false;
}
require_once($_SERVER['DOCUMENT_ROOT'] . "/includes/jsonwrapper.php");

function ImagesInFolder($folder)
{
	$dir = opendir($folder);
	// Boucle pour lire le répertoire ligne par ligne
	while (false !== ($file = readdir($dir))) {
		// Stockage des noms de fichiers dans un tableau
		if ($file != "." && $file != "..")
		{		
			$list_file[] = $folder.'/'.$file;
		}
    }

	$imgs = json_encode($list_file);
	closedir($dir);
	return $imgs;
}

function RandomTurn()
{
	if(IsIndex()){
		$imgs = ImagesInFolder("images/turns/nasique");
	}
	else{
		$imgs = ImagesInFolder("../images/turns/dog");
	};
	
	return $imgs;
}

// Build Menu
function RandomImagePath($path)
{
	$dir = opendir($path);
	
	// Boucle pour lire le répertoire ligne par ligne
	while (false !== ($file = readdir($dir))) {
		// Stockage des noms de fichiers dans un tableau
		if ($file != "." && $file != "..") $list_file[] = $file;
    }
	
	$id = rand(0,count($list_file)-1); 
	$fname = $list_file[$id];
	closedir($dir);
	return '../images/background/'.$fname;
}

function RandomImage($dir)
{
	$img = RandomImagePath($dir);
	echo '<img class="background" src="'.$img.'"/>';
	//echo '<div class="background" style="background-image=url(\''.$img.'\')"></div><br/>';
	//echo '<div class="background" style="background-image=url('.$img.')"></div>';
	//background-image: url("../images/background/IMG_2169.jpg");
	//echo '<div class="background"></div>';
}

function RandomBackground()
{
	RandomImage($_SERVER['DOCUMENT_ROOT']."/images/background/");
}
?>