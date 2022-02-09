<?php
session_start();
if(!isset($_SESSION["email"])){
    header("Location: login_blogueiro.html");
    exit();
}
$id_blogueiro = $_SESSION["id_blogueiro"];
include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";

$id_blog = filter_input(INPUT_GET,"id",FILTER_SANITIZE_SPECIAL_CHARS);
$artigoDaoMysql = new ArtigoDaoMysql($pdo);
$artigoDaoMysql->excluirBlog($id_blog,$id_blogueiro);

header("Location: home.php");