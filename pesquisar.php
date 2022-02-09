<?php
session_start();
if(!$_SESSION["email"]){
    header("Location: login_blogueiro.php");
}
include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";
$id_blogueiro = $_SESSION["id_blogueiro"];
$artigoDao = new ArtigoDaoMysql($pdo);

$req = filter_input(INPUT_POST,"text-pesquisar",FILTER_SANITIZE_SPECIAL_CHARS);
$result = $artigoDao->pesquisaOnlyBlogs($id_blogueiro,$req);

if($result == null){
    echo json_encode(null);
}else{
    echo json_encode($result);
}