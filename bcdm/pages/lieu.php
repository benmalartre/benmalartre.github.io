<!DOCTYPE html>
<html>
	<?php include($_SERVER['DOCUMENT_ROOT'] . "/includes/head.php");?>
	
   <body style="background:rgb(50,50,50)">
		<?php
			require_once($_SERVER['DOCUMENT_ROOT'] . "/includes/menu.php");
			require_once($_SERVER['DOCUMENT_ROOT'] . "/includes/randomimage.php");
			require_once($_SERVER['DOCUMENT_ROOT'] . "/includes/randomcolor.php");
			
			$bg_color = RandomColor();
			$fg_color = RandomColor();
			BuildMenu("home","#FFFFFF");
			RandomBackgroundImage();
			$scripts = "../scripts";
			
			echo " <canvas class='title' height='512' width='512' id='canvas'></canvas>";
			echo '<script type="text/javascript" src="'.$scripts.'/size.js"></script>'."\n";
			echo '<script type="text/javascript" src="'.$scripts.'/mouse.js"></script>'."\n";
			echo '<script type="text/javascript" src="'.$scripts.'/manager.js"></script>'."\n";
			echo '<script src="'.$scripts.'/image.js"></script>';

			//
			include($_SERVER['DOCUMENT_ROOT'] . "/includes/footer.php");
			//echo "<div class='title'>La basse-cour des miracles</div>";
			//echo "h1 { font-family: ‘Metrophobic’, Arial, serif; font-weight: 400; }";
		?>
	</body>
	
	
</html>