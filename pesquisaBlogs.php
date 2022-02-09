<?php
include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";

$artigoDao = new ArtigoDaoMysql($pdo);
$pesquisa = filter_input(INPUT_GET,"pesq",FILTER_SANITIZE_SPECIAL_CHARS);
$retorno = $artigoDao->pegaBlogs($pesquisa);
echo json_encode($retorno);