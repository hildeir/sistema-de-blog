<?php
session_start();
if(!isset($_SESSION["email"])){
    header("Location: login_blogueiro.html");
}
$id_blogueiro = $_SESSION["id_blogueiro"];

$uploaddir = "articles/img/";
$numeroAleatorio = rand(0,10000000000000);
$nomeArquivo = $numeroAleatorio.$_FILES["upload"]["name"];
$uploadfile = $uploaddir.$nomeArquivo;
$arrayFotos = [];
$arrayIdsImg = [];

include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";
$artigoDaoMysql = new ArtigoDaoMysql($pdo);

if(move_uploaded_file($_FILES["upload"]["tmp_name"], $uploadfile)){
    
    $id = $artigoDaoMysql->guardaImagem($id_blogueiro,$nomeArquivo);
    
    if(isset($_SESSION["ids_img"])){
        array_push($_SESSION["ids_img"], $id);
    }else{
        $_SESSION["ids_img"] = [];
        array_push($_SESSION["ids_img"], $id);
    }
    
    
    $array = array("sucess"=>true,"nome"=>$nomeArquivo);
    echo json_encode($array);
}else{
    $array = array("sucess"=>false);
    echo json_encode($array);
}