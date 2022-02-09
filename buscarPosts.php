<?php
session_start();
if(!$_SESSION["email"]){
    header("Location: login_blogueiro.php");
}
$id_blogueiro = $_SESSION["id_blogueiro"];

include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";

$tipopost = filter_input(INPUT_POST, "tipo-posts",FILTER_SANITIZE_SPECIAL_CHARS);
if($tipopost == "nao publicado"){
    $artigoDaoMysql = new ArtigoDaoMysql($pdo);
    $resultBusca = $artigoDaoMysql->allPosts($id_blogueiro);
    echo json_encode($resultBusca);
}
if($tipopost == "publicado"){
    $artigoDaoMysql = new ArtigoDaoMysql($pdo);
    $resultBusca = $artigoDaoMysql->allBlogs($id_blogueiro);

    echo json_encode($resultBusca);
}