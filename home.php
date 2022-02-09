<?php
session_start();
if(!$_SESSION["email"]){
    header("Location: login_blogueiro.php");
}

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/home.css">
</head>
<body>
    <div class="conteiner">
        <header>
            <div class="conteiner-itens-header">
                <div class="logo-header">
                    <img src="img/logotipo.png">
                    
                </div>
                <div class="cont-icone-mobile">
                    <div class="icone-mobile">
                        <div>
                        </div>
                        <div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                
                <div class="search">
                    <form id="pesquisar">
                        <input type="text" name="text-pesquisar" id="text-pesquisar" placeholder="pesquisar blogs">
                        <input type="button" id="submit-pesquisar" value="pesquisar">
                    </form>
                </div>
                <div class="usuario">
                    <div>
                        Olá, <span><?php echo $_SESSION["nome"]; ?></span>
                        <br>
                        <a href="deslogar.php">deslogar</a>
                    </div>
                </div>
            <div>
        </header>
        <main>
            <div class="conteiner-posts">
                <div class="center-post">
                    <div class="conteiner-select">
                        <form id="form-buscar-posts">
                            <select class="tipo-posts" name="tipo-posts">
                                <option value="none">-- escolha --</option>
                                <option value="nao publicado">Posts nao publicados</option>
                                <option value="publicado">Posts publicados</option>
                            </select>
                        </form>
                        <div class="cont-totalBusca">
                            resultado <span class="totalPost"></span>
                        </div>
                    </div>
                    <div class="resultado-posts">

                       
                    </div>
                    <div class="conteiner-paginacao">
                        
                    </div>
                </div>
            </div>
        </main>
        <nav>
            <div class="botao-fechar-menu-mobile">
                X
            </div>
            <ul>
                <li>
                    <a href="editor.php">Criar Blog</a>
                </li>
            
            </ul>
        </nav>
    </div>
    <!-- model item post--->
    <div class="item-posts">
        <a href="" class="link-post">
            <div class="conteiner-inf-posts">
                <div class="titulo-pagina">titulo da pagina</div>
                <div class="data">data</div>
            </div>
        </a>

        <div>
            <a href="" class="excluirPost">excluir</a>
        </div>
    </div>
    <!-- fim -->
    <!-- model item pagina -->
    <div class="item-pg" style="padding:5px 8px;border:solid 2px black;">
        
    </div>
    <!-- fim -->

    <script src="js/home.js"></script>
</body>
</html>