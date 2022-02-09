<?php
include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";

$artigoDao = new ArtigoDaoMysql($pdo);

$result = $artigoDao->allblogsAutores();
echo json_encode($result);