<?php
include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";

$idArtigo = filter_input(INPUT_GET,"id");
$artigoDaoMysql = new ArtigoDaoMysql($pdo);

$array = $artigoDaoMysql->pegarDadosPublicacao($idArtigo);

echo json_encode($array);