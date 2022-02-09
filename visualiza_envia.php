<?php
session_start();
include "class/Artigo.php";
include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";

$email = "";
$id_blogueiro = "";
if($_SESSION["email"]){
    $email = $_SESSION["email"];

    if(isset($_SESSION["id_blogueiro"])){
        $id_blogueiro = $_SESSION["id_blogueiro"];
    }
    
}else{
    header("Location: login_blogueiro.html");
    exit();
}

$conteudo = htmlspecialchars($_POST["text_hidden"],ENT_QUOTES);
$publicar = htmlspecialchars($_POST["publicar"], ENT_QUOTES);
$titulo = htmlspecialchars($_POST["hidden_titulo"], ENT_QUOTES);
$textHiddenFotos = htmlspecialchars($_POST["text_hidden_fotos"], ENT_QUOTES);

if($publicar == "true"){
    /* formata para a url padrao permitida */
    $urlString = strtolower(preg_replace(array("/(á|à|ã|â|ä)/","/(Á|À|Ã|Â|Ä)/","/(é|è|ê|ë)/","/(É|È|Ê|Ë)/","/(í|ì|î|ï)/","/(Í|Ì|Î|Ï)/","/(ó|ò|õ|ô|ö)/","/(Ó|Ò|Õ|Ô|Ö)/","/(ú|ù|û|ü)/","/(Ú|Ù|Û|Ü)/","/(ñ)/","/(Ñ)/","/(ç)/","/(Ç)/"),explode(" ","a a e e i i o o u u n n c c"),$titulo));
    $explode = explode(" ",$urlString);
    $urlNoPadrao = implode("-",$explode);
    /* fim */
    $file = "articles/".$urlNoPadrao.".html";   
    

    if(file_exists($file)){
        echo "Blog já existe";
    }else{
        if($titulo == ""){
            echo "Preencha o titulo da pagina";
        }else{
            $primeiraFoto = "";
            if($textHiddenFotos !== ""){

                $arrayFotosVindoHidden = explode("|",$textHiddenFotos);
                $primeiraFoto = $arrayFotosVindoHidden[0];
                
                $caminho = "articles/img/";
                $pasta = mkdir($caminho.$urlNoPadrao);
                $novoCaminho = $caminho.$urlNoPadrao."/"; //articles/img/nome do artigo 
                
                /* move a foto da pasta img para outra pasta com o nome do blog */
                foreach($arrayFotosVindoHidden as $value){
                    $caminhoFoto = $caminho.basename($value);
                    if(file_exists($caminhoFoto)){
                        rename($caminhoFoto,$novoCaminho.$value);
                    }
                    
                }
            }else{
                //caso o blogueiro nao adicioanr uma foto, adiciona uma thumbnail no lugar
                $diretorio = dir("thumbnail");
                while($arquivo = $diretorio->read()){
                    if($arquivo == "thumbnail.png"){
                        $primeiraFoto = $arquivo;
                    }
                }
                $diretorio->close();
            }
            $data = date("Y/m/d");
            $artigo = new Artigo();
            $artigo->setNomeArtigo($titulo);
            $artigo->setIdBlogueiro($id_blogueiro);
            $artigo->setUrl($urlNoPadrao);
            $artigo->setData($data);
            $artigo->setThumbnail($primeiraFoto);

            $artigoDaoMysql = new ArtigoDaoMysql($pdo);
            $id_artigo = $artigoDaoMysql->add($artigo);
            
            $cont = '
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="../css/layout_blog.css">
                <title>'.$titulo.'</title>
                
            </head>
            <body data-id='.$id_artigo.'>   
                '.html_entity_decode($conteudo).'
                <script src="../js/modeloBlog.js"></script>
            </body>
            </html>
            ';
            
            
            
            file_put_contents($file,$cont);
            
            if(isset($_SESSION["id_post"])){
                //exclui do banco o post 
                $artigoDaoMysql->excluirPost($_SESSION["id_post"], $id_blogueiro);
                $_SESSION["id_post"] = "";
            }
            
            
            echo "Publicado com sucesso";
            
        }
    }
    
}else{
    
    $cont = '
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/layout_blog.css">
        <title>'.$titulo.'</title>
        
    </head>
    <body>   
        '.html_entity_decode($conteudo).'
        <script src="../js/modeloBlog.js"></script>
    </body>
    </html>
    ';
    echo $cont;
    
}