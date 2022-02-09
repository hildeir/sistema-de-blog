<?php
session_start();
if(!$_SESSION["email"]){
    header("Location: login_blogueiro.php");
}
$id_blogueiro = $_SESSION["id_blogueiro"];

include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";

$id_post = filter_input(INPUT_GET,"id",FILTER_SANITIZE_SPECIAL_CHARS);
$artigoDaoMysql = new ArtigoDaoMysql($pdo);
$artigoDaoMysql->excluirPost($id_post, $id_blogueiro);
header("Location: home.php");