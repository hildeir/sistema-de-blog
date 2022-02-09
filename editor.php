<?php
session_start();
if(!$_SESSION["email"]){
	header("Location: login_blogueiro.html");
}
$nome = $_SESSION["nome"];
$id_blogueiro = $_SESSION["id_blogueiro"];
$idPost = filter_input(INPUT_GET,"id", FILTER_SANITIZE_SPECIAL_CHARS);

include "class/ArtigoDaoMysql.php";
include "conecta_banco_mysql.php";

if(isset($idPost)){
	$artigoDaoMysql = new ArtigoDaoMysql($pdo);
	$retorno = $artigoDaoMysql->onlyPost($idPost, $id_blogueiro);
	if($retorno !== null){
		$titulo = $retorno["titulo"];
		$conteudo = $retorno["conteudo"];
	}
	$_SESSION["id_post"] = $idPost;
}

?>
<!doctype html>
<html>
<head>
	<title>Editor de texto</title>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="css/estilo-editor-texto.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
	<div class="cont-deslogar">
		<span>
		<?php
			echo "Olá ".$nome;
		?>
		</span>
		<a href="deslogar.php">deslogar</a>
	</div>
	
	<div class="conteiner-bts-artigo-publicar-visualizar">
		<div class="conteiner-bt-artigos">
			<a href="home.php">Home</a>
		</div>
		<div class="conteiner-bts">
			<input type="button" value="Publicar" onclick="publicar()">
			<input type="button" value="Visualizar" onclick="visualizar()"> 
			<input type="button" value="Salvar" onclick="salvar()">
		</div>
	</div>
	<div class="conteiner-editor">
		<form id="formText" method="post" action="visualiza_envia.php">
			
			Nome do blog
			
			<div contenteditable="true" id="titulo_pagina">
				<?php
					if(isset($titulo)){
						echo $titulo;
					}
				?>
			</div>
			
			<div id="textarea" name="textarea" contenteditable="true">
				<?php
					if(isset($conteudo)){
						echo $conteudo;
					}
				?>
			</div>
			
			<input type="hidden" class="text_hidden" name="text_hidden" value="">
			<input type="hidden" class="text_hidden_fotos" name="text_hidden_fotos" value="">
			<input type="hidden" class="text_hidden_titulo" name="hidden_titulo" value="">
			<input type="hidden" id="publicar" name="publicar" value="false">
			
		</form>
		<div class="selecaoFoto" contenteditable="false">
		</div>
		<div class="resizeCont" contenteditable="false">
			<div class="pontos top" contenteditable="false"></div>
			<div class="pontos bottom" contenteditable="false"></div>
			<div class="pontos left" contenteditable="false"></div>
			<div class="pontos right" contenteditable="false"></div>
		</div>
		
	</div>
	<script type="text/javascript" src="ferramenta-editor/editor.js"></script>
	<script type="text/javascript" src="js/salva-artigo.js"></script>
</body>
</html>