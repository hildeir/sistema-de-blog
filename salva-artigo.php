<?php
session_start();
if(!$_SESSION["email"]){
    header("Location: login_blogueiro.php");
}
$id_blogueiro = $_SESSION["id_blogueiro"];

include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";

$json = file_get_contents("php://input");
$data = json_decode($json);
$artigoDaoMysql = new ArtigoDaoMysql($pdo);
$existePost = $artigoDaoMysql->existePost($id_blogueiro, $data->titulo);//retorno logico em string e o id do post

if($existePost["return"]){
    //se exite o post com o titulo da pagina pego pela requisicao e do usuario logado, entao faz o update
    $idPost = $existePost["idPost"];
    $mensagemRetorno = $artigoDaoMysql->updatePost($idPost, $id_blogueiro, $data->titulo, $data->conteudo);
    //se existe ids das fotos,entao define o id do post para as fotos
    if($_SESSION["ids_img"] !== ""){ 
        $ids_img = $_SESSION["ids_img"];
        $artigoDaoMysql->defineIdPostNasImg($idPost,$id_blogueiro,$ids_img);
        $_SESSION["ids_img"] = [];
    }
    $mensagem = array("mensagem"=>$mensagemRetorno);
    echo json_encode($mensagem);
}else{
    //se nao existe post, cria o post
    $mensagemRetorno = $artigoDaoMysql->criarPost($id_blogueiro, $data->titulo, $data->conteudo);
    $idPost = $mensagemRetorno["idPost"];//id do post
    //define o id do post nas imagens da tabela imgpost
    $ids_img = $_SESSION["ids_img"];
    $artigoDaoMysql->defineIdPostNasImg($idPost,$id_blogueiro,$ids_img);
    $_SESSION["ids_img"] = [];

    $mensagem = array("mensagem"=>$mensagemRetorno["msg"]);
    echo json_encode($mensagem);
}