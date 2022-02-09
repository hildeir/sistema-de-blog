<?php
session_start();
if(!$_SESSION["email"]){
    header("Location: login_blogueiro.php");
}
include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";
$id_blogueiro = $_SESSION["id_blogueiro"];
$artigoDao = new ArtigoDaoMysql($pdo);
$pesq = filter_input(INPUT_GET,"p",FILTER_SANITIZE_SPECIAL_CHARS);
$result = $artigoDao->totalPesquisaBlogs($id_blogueiro,$pesq);
echo json_encode($result);