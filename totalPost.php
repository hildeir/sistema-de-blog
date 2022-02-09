<?php
session_start();
if(!$_SESSION["email"]){
    header("Location: login_blogueiro.php");
}
$idBlogueiro = $_SESSION["id_blogueiro"];
include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";

$requisicao = file_get_contents("php://input");

$objReq = json_decode($requisicao);

if($objReq->buscar == "nao publicado"){
    $artigoDaoMysql = new ArtigoDaoMysql($pdo);
    $retorno = $artigoDaoMysql->getTotalPost($idBlogueiro);
    echo json_encode($retorno);
}
if($objReq->buscar == "publicado"){
    $artigoDaoMysql = new ArtigoDaoMysql($pdo);
    $retorno = $artigoDaoMysql->getTotalBlog($idBlogueiro);
    echo json_encode($retorno);
}