<?php
session_start();
if(!isset($_SESSION["email"])){
    header("Location: login_blogueiro.html");
}
$id_blogueiro = $_SESSION["id_blogueiro"];
$json = file_get_contents("php://input");
$data = json_decode($json);

include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";

$artigoDaoMysql = new ArtigoDaoMysql($pdo);
$existeFoto = $artigoDaoMysql->existeImagem($id_blogueiro,$data);

//caso exista a imagem no banco de dados exlui a foto 
//no servidor e exclui o nome da foto no banco de dados
if($existeFoto != "" && $existeFoto != false){
    $file = "articles/img/".basename($existeFoto);

    if(file_exists($file)){
        unlink($file);
        $artigoDaoMysql->excluiImagem($id_blogueiro,$existeFoto);
        echo json_encode(array("response"=>"sucess"));
    }
}