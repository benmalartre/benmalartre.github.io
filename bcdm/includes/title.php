<?php
echo '<link rel="stylesheet" href="../css/title.css" />';
			
// Build Menu
function InsertTitle($title = "",$top="50%",$align="center")
{
	echo '<div class="title" style="top:'.$top.'; text-align:'.$align.'">'.$title.'</div>';
}
?>