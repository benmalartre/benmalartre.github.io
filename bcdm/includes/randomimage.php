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
	$folder2 = str_replace($_SERVER['DOCUMENT_ROOT'],"..",$folder);
	// Boucle pour lire le répertoire ligne par ligne
	while (false !== ($file = readdir($dir))) {
		// Stockage des noms de fichiers dans un tableau
		if ($file != "." && $file != "..")
		{		
			$list_file[] = $folder2.$file;
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
function RandomImagePath($path,$id=-1)
{
	$dir = opendir($path);
	$folder = str_replace($_SERVER['DOCUMENT_ROOT'],"..",$path);
	// Boucle pour lire le répertoire ligne par ligne
	while (false !== ($file = readdir($dir))) {
		// Stockage des noms de fichiers dans un tableau
		if ($file != "." && $file != "..") $list_file[] = $file;
    }
	
	if($id==-1 or $id>count($list_file)-1)
		$id = rand(0,count($list_file)-1); 

	$fname = $list_file[$id];
	closedir($dir);
	return $folder.$fname;
}

function RandomImage($dir)
{
	$img = RandomImagePath($dir);
	return $img;
	//echo '<div class="background" style="background-image=url(\''.$img.'\')"></div><br/>';
	//echo '<div class="background" style="background-image=url('.$img.')"></div>';
	//background-image: url("../images/background/IMG_2169.jpg");
	//echo '<div class="background"></div>';
}

function RandomBackgroundImage()
{
	echo '<img class="background" src="';
	echo RandomImage($_SERVER['DOCUMENT_ROOT']."/images/background/");
	echo '">';
}

function RandomKoople(){
	$id = rand(0,7); 
	$bg = RandomImagePath($_SERVER['DOCUMENT_ROOT']."/images/BG/",$id);
	$fg = RandomImagePath($_SERVER['DOCUMENT_ROOT']."/images/FG/",$id);
	$koople[] = $bg;
	$koople[] = $fg;
	return $koople;
}

function RandomCalendar(){
	$bg = RandomImagePath($_SERVER['DOCUMENT_ROOT']."/images/calendrier2018/nb/",0);
	$fg = RandomImagePath($_SERVER['DOCUMENT_ROOT']."/images/calendrier2018/nb/",1);
	$calendar[] = $bg;
	$calendar[] = $fg;
	return $calendar;
}

function RandomBG(){
return RandomImage($_SERVER['DOCUMENT_ROOT']."/images/NBBG/");
}
function RandomFG(){
return RandomImage($_SERVER['DOCUMENT_ROOT']."/images/NBFG/");
}
function RandomTitle(){
//return RandomImage($_SERVER['DOCUMENT_ROOT']."/images/title/");
return RandomImage($_SERVER['DOCUMENT_ROOT']."/images/FG/");
}

function AllTitles(){
	return ImagesInFolder($_SERVER['DOCUMENT_ROOT']."/images/FG/");
}


?>
