<!-- connexion to database -->
<?php
$db = mysql_connect('localhost','root','') or die ("Can't connect to SQL server");
//$db = mysql_connect('benmalartre.free.fr','benmalartre','bendover2000') or die ("erreur de connexion");
mysql_select_db('benmalartre',$db) or die ("erreur de connexion base");
?>