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
			//BuildMenu("home","#FFFFFF");
			//RandomBackgroundImage();
			$imgs = RandomCalendar();
			
			$bg_path = $imgs[0];
			$fg_path = $imgs[1];
			$title_paths = AllTitles();
			$title_color = RandomColor();
			$scripts = "../scripts";
			if(IsIndex())$scripts = "scripts";
			
			echo " <img src='' id='bg_image'>";
			echo " <canvas height='800' width='600' id='background'></canvas>";
			echo " <a href=''><canvas height='800' width='600' id='title'></canvas></a>";
			echo '<script type="text/javascript" src="'.$scripts.'/audio.js"></script>'."\n";
			echo '<script type="text/javascript" src="'.$scripts.'/size.js"></script>'."\n";
			echo '<script type="text/javascript" src="'.$scripts.'/mouse.js"></script>'."\n";
			echo '<script type="text/javascript" src="'.$scripts.'/manager.js"></script>'."\n";
			echo '<script type="text/javascript" src="'.$scripts.'/image.js"></script>';
			echo '<script type="text/javascript" src="'.$scripts.'/xmas.js"></script>';
			echo '<script type="text/javascript" src="'.$scripts.'/title.js"></script>';
			//echo '<script> drawImage("'.$title_background.'","'.$color1.'");</script>';
			//echo '<script> drawImage("'.$title_image.'","'.$color2.'");</script>';
			echo '<script type="text/javascript">';
			echo 'var m = new Manager();
			var size = GetWindowSize();
			/*
			if(audioInitialized){
				var drum = new DrumMachine();
				var synth = new Voicer(33,55);
				drum.Init();
				synth.Init();
				m.AddObject(drum);
				m.AddObject(synth);
			}
			else alert("Audio Isn\'t Initialized!!!")
			*/
			var bg = new AnimatedBackground("'.$bg_path.'","'.$bg_color.'","'.$fg_path.'","'.$fg_color.'",size.width,size.height);
			m.AddObject(bg);
			/*
			var xmas = new XMasBackground(size.width,size.height);
			m.AddObject(xmas);
			*/
			//var title = new Title('.$title_paths.');
			//m.AddObject(title);
			setInterval(function(){m.Update(mouseX,mouseY)},1000/60);</script>';
			//echo '<script> drawTitle("'.$title_background.'","'.$color1.'""'.$title_image.'","'.$color2.'");</script>';*/
			//echo '<div class="content" style="background:rgba(0,0,0,0)"></div>';
			//echo '<script type="text/javascript" src="'.$scripts.'/size.js"></script>'."\n";
			//
			//include($_SERVER['DOCUMENT_ROOT'] . "/includes/footer.php");
			//echo "<div class='title'>La basse-cour des miracles</div>";
			//echo "h1 { font-family: ‘Metrophobic’, Arial, serif; font-weight: 400; }";
		?>
	</body>
	
	
</html>
