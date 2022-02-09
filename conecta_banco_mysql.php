<?php
include "setting_db_mysql.php";
try{
    $pdo = new PDO(
        sprintf("mysql:host=%s;dbname=%s;port=%s;charset=%s",
        $config["host"],
        $config["dbname"],
        $config["port"],
        $config["charset"]
        ),
        $config["usuario"],
        $config["password"]
    );
}catch(Exception $e){
    echo "Erro: ".$e->getMessage();
}