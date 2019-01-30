<?php 
$_password =  htmlspecialchars($_POST['password']);

if($_password == "bendover2000")
{
	header('Location:../pages/admin/admin.php');
}
else
{
	header('Location: ../pages/admin.php');   
}
?>
