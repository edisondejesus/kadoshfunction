<?php
include'conexion.php';
require 'libs/Smarty.class.php';
include'logic.php';


$ob = new Clinica($conn);
$dat =    $ob->citas_general($conn,'assoc');

$smarty = new Smarty;


$smarty->assign("datos",$dat);
$smarty->assign("goro","alex");






?>