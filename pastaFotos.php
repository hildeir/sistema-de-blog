<?php
//pega a pasta de onde esta armazenada as fotos do blog
include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";

$id_artigo = filter_input(INPUT_GET,"id", FILTER_SANITIZE_SPECIAL_CHARS);
$artigoDaoMysql = new ArtigoDaoMysql($pdo);
$retornoNomePasta = $artigoDaoMysql->pegaPastaFoto($id_artigo);
echo json_encode($retornoNomePasta);