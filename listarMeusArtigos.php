<?php
session_start();
include "class/Artigo.php";
include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";

if($_SESSION["email"]){
    $email = $_SESSION["email"];

    if(isset($_SESSION["id_blogueiro"])){
        $id_blogueiro = $_SESSION["id_blogueiro"];
    }
}else{
    header ("Location: login_blogueiro.html");
}

$artigoDaoMysql = new ArtigoDaoMysql($pdo);
