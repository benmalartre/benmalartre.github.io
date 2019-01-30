
<!DOCTYPE html>
<html><?php include($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");?>
	
   <body style="background:rgb(255,66,120)">
		<?php
			require_once($_SERVER['DOCUMENT_ROOT'] . "/includes/menu.php");
			require_once($_SERVER['DOCUMENT_ROOT'] . "/includes/randomimage.php");
			BuildMenu("test");
			//RandomBackground();
			$title_image = RandomTitle();
			$scripts = "../scripts";
			if(IsIndex())$scripts = "scripts";
			echo " <canvas class='title' height='1000' width='1000' id='title_canvas'></canvas>";
			echo '<script src="'.$scripts.'/image.js"></script>';
			echo '<script> drawImage("'.$title_image.'");</script>';
		?>
</html>