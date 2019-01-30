<?php
// Build Menu
function BuildMenu($item = "",$color)
{
	// list of menu titles
	$titles = array("home","lieu","projets","gens");
	$buttons = array("home","lieu","projets","gens");
	$active = array(NULL,NULL,NULL,NULL);
	
	for($i=0;$i<count($titles);$i++)
	{
		if ($item == $titles[$i])
			$active[$i] = "active";
	};
 
echo '
<link rel="stylesheet" href="../css/menu.css" />
  <div id="top-menu" >
  <ul>';
  for($i=0;$i<count($titles);$i++)
	echo '<li><a href="../pages/'.$titles[$i].'.php" style="color:#'.$color.'" class="'.$active[$i].'">'.$buttons[$i].'</a></li>';
  echo '  
  </ul>
  </div>';

}

function BuildList($items,$id,$cat,$page)
{
	echo '<link rel="stylesheet" href="../css/list.css" />';
	echo '<div id="list-menu">'."\n\t";
	echo '<ul>'."\n\t\t";
	
	for($i=0;$i<count($items);$i++)
	{
		if($i==$id){
			echo '<li><a href="'.$page.'?id='.$i.'&cat='.$cat.'" class="active">'.$items[$i].'</a></li>'."\n\t\t";
		}
		else{
			echo '<li><a href="'.$page.'?id='.$i.'&cat='.$cat.'">'.$items[$i].'</a></li>'."\n\t\t";

		}
	}
	
	echo '</ul>'."\n";
	echo '</div>'."\n";
}

function BuildSubList($items,$id,$cat,$page)
{

	echo '<div id="list-submenu">'."\n\t";
	echo '<ul>'."\n\t\t";
	
	$nbl = count($items);
	$hu = round($nbl*0.5);
	$hd = $nbl-$hu;
	$nbi = count($items);
	$start = 0;
	$end = $nbi;
	$prev = false;
	$next = false;
	if($nbi>$nbl){
		if($id-$hu>0){
			$prev = true;
			$start = $id-$hu-1;
		}
		if($id+$hd<$nbi){
			$next = true;
		}
		$end = min($nbi,max($id+$hd,$nbl));
	}
	if($prev){
		echo '<li><a href="'.$page.'?id='.($start+1).'&cat='.$cat.'">...</a></li>'."\n\t\t";
		//echo '<li><a href="'.$page.'?id='.($start+1).'&cat='.$cat.'"><img src="../images/icons/up.png" /></a></li>'."\n\t\t";
		$start++;
	}
		
	for($i=$start;$i<$end;$i++)
	{
		if($i==$id){
			echo '<li><a href="'.$page.'?id='.$i.'&cat='.$cat.'" class="active">'.$items[$i].'</a></li>'."\n\t\t";
		}
		else{
			echo '<li><a href="'.$page.'?id='.$i.'&cat='.$cat.'">'.$items[$i].'</a></li>'."\n\t\t";

		}
	}
	
	if($next)
		echo '<li><a href="'.$page.'?id='.($end).'&cat='.$cat.'">...</a></li>'."\n\t\t";
		//echo '<li><a href="'.$page.'?id='.($end).'&cat='.$cat.'"><img src="../images/icons/down.png" /></a></li>'."\n\t\t";
	
	echo '</ul>'."\n";
	echo '</div>'."\n";
}

?>