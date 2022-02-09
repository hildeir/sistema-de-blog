<?php
include "interface/ArtigoDao.php";

class ArtigoDaoMysql implements ArtigoDao{
    private $pdo;

    public function __construct(PDO $pdo){
        $this->pdo = $pdo;
    }
    public function add(Artigo $a){
        $query = $this->pdo->prepare("INSERT INTO blogs (id_blogueiro_fk, nome_artigo, data, url, thumbnail) values(:id_blogueiro_fk, :nome_artigo,:data,:url, :thumbnail)");
        $query->bindValue(":id_blogueiro_fk",$a->getIdBlogueiro());
        $query->bindValue(":nome_artigo",$a->getNomeArtigo());
        $query->bindValue(":data",$a->getData());
        $query->bindValue(":url",$a->getUrl());
        $query->bindValue(":thumbnail",$a->getThumbnail());
        $query->execute();

        return $this->pdo->lastInsertId();
    }
    public function pegarDadosPublicacao($idArtigo){
        $query = $this->pdo->prepare("SELECT id_blogueiro_fk, data FROM blogs WHERE id_artigo = :idArtigo");
        $query->bindValue(":idArtigo",$idArtigo);
        $query->execute();

        if($query->rowCount() > 0){
            $result = $query->fetch();
            $id_blogueiro = $result["id_blogueiro_fk"];
            $data_publicacao = date('d/m/Y', strtotime($result['data']));

            $query = $this->pdo->prepare("SELECT nome FROM cadastro_blogueiros WHERE id_blogueiro = :id_blogueiro");
            $query->bindValue(":id_blogueiro",$id_blogueiro);
            $query->execute();

            $resultBlogueiro = $query->fetch();
            $nome = $resultBlogueiro["nome"];
            
            $array = array("blogueiro"=>$nome,"data"=>$data_publicacao);
            return $array;
        }
    }
    public function nomeArtigo($id_blogueiro){
        $sql = $this->pdo->prepare("SELECT nome_artigo FROM blogs WHERE id_blogueiro_fk = :id");
        $sql->bindValue(":id",$id_blogueiro);
        $sql->execute();

        if($sql->rowCount() > 0){
            $result = $sql->fetch();
            return $result["nome_artigo"];
        }
    }
    public function criarPost($idBlogueiro, $titulo, $conteudo){
        $data = date("Y/m/d");
        $sql = $this->pdo->prepare("INSERT INTO posts (id_blogueiro_fk, titulo_pagina, conteudo, data) VALUES (:id_blogueiro, :titulo, :conteudo, :data)");
        $sql->bindValue(":id_blogueiro", $idBlogueiro);
        $sql->bindValue(":titulo", $titulo);
        $sql->bindValue(":conteudo", $conteudo);
        $sql->bindValue(":data", $data);
        $sql->execute();
        $idPost = $this->pdo->lastInsertId();
        return array("msg"=>"Post salvo com sucesso","idPost"=>$idPost);
    }
    public function updatePost($id_post, $id_blogueiro, $titulo, $conteudo){
        $data = date("Y/m/d");
        $sql = $this->pdo->prepare("UPDATE posts SET titulo_pagina = :titulo, conteudo = :conteudo, data = :data WHERE id = :id_post AND id_blogueiro_fk = :id_blogueiro");
        $sql->bindValue(":titulo", $titulo);
        $sql->bindValue(":conteudo", $conteudo);
        $sql->bindValue(":data", $data);
        $sql->bindValue(":id_post",$id_post);
        $sql->bindValue(":id_blogueiro", $id_blogueiro);
        $sql->execute();

        return "Update com sucesso";
      
    }
    public function existePost($idBlogueiro, $titulo){
        $sql = $this->pdo->prepare("SELECT id FROM posts WHERE id_blogueiro_fk = :id AND titulo_pagina = :titulo");
        $sql->bindValue(":id",$idBlogueiro);
        $sql->bindValue(":titulo",$titulo);
        $sql->execute();

        if($sql->rowCount() > 0){
            $result = $sql->fetch();
            $array = array("return"=>true,"idPost"=>$result["id"]);
            return $array;
        }else{
            $array = array("return"=>false);
            return $array;
        }
    }
    public function allPosts($idBlogueiro){
        $sql = $this->pdo->prepare("SELECT * FROM posts WHERE id_blogueiro_fk = :id");
        $sql->bindValue(":id",$idBlogueiro);
        $sql->execute();
        $quant = $sql->rowCount();
        if($quant > 0){
            $result = $sql->fetchAll();
            $posts = [];
            foreach($result as $item){
                $post = array("id"=>$item["id"],"titulo"=>$item["titulo_pagina"], "data"=>date("d/m/Y",strtotime($item["data"])));
                array_push($posts,$post);
            }
            return $posts;
        }
    }
    public function allBlogs($idBlogueiro){
        $sql = $this->pdo->prepare("SELECT * FROM blogs WHERE id_blogueiro_fk = :id");
        $sql->bindValue(":id",$idBlogueiro);
        $sql->execute();
        $quant = $sql->rowCount();
        if($quant > 0){
            $result = $sql->fetchAll();
            $blogs = [];
            foreach($result as $item){
                $blog = array("id"=>$item["id_artigo"],"nome_blog"=>$item["nome_artigo"],"url"=>"articles/".$item["url"].".html", "data"=>date("d/m/Y",strtotime($item["data"])));
                array_push($blogs,$blog);
            }
            return $blogs;
        }
    }
    public function onlyPost($idPost,$idBlogueiro){
        $sql = $this->pdo->prepare("SELECT * FROM posts WHERE id = :idPost AND id_blogueiro_fk = :idBlogueiro");
        $sql->bindValue(":idPost",$idPost);
        $sql->bindValue(":idBlogueiro",$idBlogueiro);
        $sql->execute();

        if($sql->rowCount() > 0){
            $result = $sql->fetch();
            $retorno = array("titulo"=>$result["titulo_pagina"],"conteudo"=>$result["conteudo"]);

            return $retorno;
        }
    }
    public function getTotalPost($idBlogueiro){
        $sql = $this->pdo->prepare("SELECT * FROM posts WHERE id_blogueiro_fk = :idBlogueiro");
        $sql->bindValue(":idBlogueiro",$idBlogueiro);
        $sql->execute();

        return array("total"=>$sql->rowCount());
    }
    public function getTotalBlog($idBlogueiro){
        $sql = $this->pdo->prepare("SELECT * FROM blogs WHERE id_blogueiro_fk = :idBlogueiro");
        $sql->bindValue(":idBlogueiro",$idBlogueiro);
        $sql->execute();

        return array("total"=>$sql->rowCount());
    }
    public function pegaPastaFoto($id_artigo){
        $sql = $this->pdo->prepare("SELECT url FROM blogs WHERE id_artigo = :id_artigo");
        $sql->bindValue(":id_artigo",$id_artigo);
        $sql->execute();
        
        if($sql->rowCount() > 0){
            $result = $sql->fetch();

            return array("url"=>"img/".$result["url"]);
        }
    }
    public function excluirBlog($id_blog,$id_blogueiro){
        
        $sql = $this->pdo->prepare("SELECT url FROM blogs WHERE id_artigo = :id_artigo AND id_blogueiro_fk = :id_blogueiro");
        $sql->bindValue(":id_artigo",$id_blog);
        $sql->bindValue(":id_blogueiro",$id_blogueiro);
        $sql->execute();
        
        if($sql->rowCount() > 0){
            //exclui todas as fotos dentro da pasta e depois exclui a pasta
            $result = $sql->fetch();
            $caminho = "articles/img/".$result["url"];
            if(file_exists($caminho)){ 
                if($handle = opendir($caminho)){
                    while (false !== ($file = readdir($handle))) {
                        if($file != "." && $file != ".."){
                            unlink($caminho."/".$file);//remove os arquivos dentro da pasta
                        }
                    }
                    closedir($handle);
                    rmdir($caminho);//remove pasta
                }
            }
            unlink("articles/".$result["url"].".html");//remove a pagina do blog
        }
        
        $query = $this->pdo->prepare("DELETE FROM blogs WHERE id_artigo = :id_artigo AND id_blogueiro_fk = :id_blogueiro");
        $query->bindValue(":id_artigo",$id_blog);
        $query->bindValue(":id_blogueiro",$id_blogueiro);
        $query->execute();
        
    }

    public function excluirPost($id_post,$id_blogueiro){
        $query = $this->pdo->prepare("DELETE FROM posts WHERE id = :id AND id_blogueiro_fk = :id_blogueiro");
        $query->bindValue(":id",$id_post);
        $query->bindValue(":id_blogueiro",$id_blogueiro);
        $query->execute();
    }
    public function existeImagem($id_blogueiro,$imagem){
        $query = $this->pdo->prepare("SELECT * FROM imgpost WHERE id_blogueiro = :id_blogueiro AND img = :imagem");
        $query->bindValue(":id_blogueiro",$id_blogueiro);
        $query->bindValue(":imagem",$imagem);
        $query->execute();
        
        if($query->rowCount() > 0){
            $result = $query->fetch();
            return $result["img"];
        }else{
            return false;
        }
    }
    public function guardaImagem($id_blogueiro,$imagem){
        $query = $this->pdo->prepare("INSERT INTO imgpost (id_blogueiro, img) VALUES (:id_blogueiro,:imagem)");
        $query->bindValue(":id_blogueiro",$id_blogueiro);
        $query->bindValue(":imagem",$imagem);
        $query->execute();

        return $this->pdo->lastInsertId();
    }
    public function excluiImagem($id_blogueiro,$imagem){
        $query = $this->pdo->prepare("DELETE FROM imgpost WHERE id_blogueiro = :id_blogueiro AND img = :imagem");
        $query->bindValue(":id_blogueiro",$id_blogueiro);
        $query->bindValue(":imagem",$imagem);
        $query->execute();
    }
    public function defineIdPostNasImg($idPost,$id_blogueiro,$ids_img){
        
        foreach($ids_img as $valor){
            $query = $this->pdo->prepare("UPDATE imgpost SET id_post = :id_post WHERE id = :id_img AND id_blogueiro = :id_blogueiro");
            $query->bindValue(":id_post",$idPost);
            $query->bindValue(":id_img",$valor);
            $query->bindValue(":id_blogueiro",$id_blogueiro);
            $query->execute();
        } 
    }
    public function pesquisaOnlyBlogs($id_blogueiro,$pesq){
        //uma unica frase
        $query = $this->pdo->prepare("SELECT * FROM blogs WHERE id_blogueiro_fk = :id_blogueiro AND nome_artigo LIKE CONCAT('%',:pesq, '%')");
        $query->bindValue(":id_blogueiro",$id_blogueiro);
        $query->bindValue(":pesq",$pesq);
        $query->execute();

        if($query->rowCount() > 0){
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            $totalBusca = $query->rowCount();
            foreach($result as $valor){
                $array[] = array("id"=>$valor["id_artigo"],"nome_blog"=>$valor["nome_artigo"],"url"=>"articles/".$valor["url"].".html", "data"=>date('d-m-Y', strtotime($valor['data'])));
            }
    
            return $array;
        }

    }
    public function totalPesquisaBlogs($id_blogueiro,$pesq){
        $query = $this->pdo->prepare("SELECT * FROM blogs WHERE id_blogueiro_fk = :id_blogueiro AND nome_artigo LIKE CONCAT('%',:pesq, '%')");
        $query->bindValue(":id_blogueiro",$id_blogueiro);
        $query->bindValue(":pesq",$pesq);
        $query->execute();

        if($query->rowCount() > 0){
            $totalBusca = $query->rowCount();
            return array($totalBusca);
        }
    }
    public function allblogsAutores(){
        $query = $this->pdo->prepare("SELECT nome_artigo, data, url, thumbnail FROM blogs");
        $query->execute();

        if($query->rowCount() > 0){
            $result = $query->fetchAll();
            foreach($result as $valor){
                //caso o blogueiro nao tem foto, adiciona uma thumbnail propria
                if($valor["thumbnail"] == "thumbnail.png"){
                    $array[] = array("blog"=>$valor["nome_artigo"],
                    "data"=>date("d/m/Y", strtotime($valor["data"])),
                    "url"=>"articles/".$valor["url"].".html",
                    "thumbnail"=>"thumbnail/".$valor["thumbnail"]);
                }else{
                    $array[] = array("blog"=>$valor["nome_artigo"],
                    "data"=>date("d/m/Y", strtotime($valor["data"])),
                    "url"=>"articles/".$valor["url"].".html",
                    "thumbnail"=>"articles/img/".$valor["url"]."/".$valor["thumbnail"]);
                }
                
            }
        }
        return $array;
    }
    public function pegaBlogs($pesquisar){
        $query = $this->pdo->prepare("SELECT nome_artigo, data, url, thumbnail FROM blogs WHERE nome_artigo LIKE CONCAT ('%', :pesquisar ,'%')");
        $query->bindValue(":pesquisar",$pesquisar);
        $query->execute();
        if($query->rowCount() > 0){
            $result = $query->fetchAll();
            
            foreach($result as $valor){
                //caso o blogueiro nao tem foto, adiciona uma thumbnail propria
                if($valor["thumbnail"] == "thumbnail.png"){
                    $array[] = array("blog"=>$valor["nome_artigo"],
                    "data"=>date("d/m/Y", strtotime($valor["data"])),
                    "url"=>"articles/".$valor["url"].".html",
                    "thumbnail"=>"thumbnail/".$valor["thumbnail"]);
                }else{
                    $array[] = array("blog"=>$valor["nome_artigo"],
                    "data"=>date("d/m/Y", strtotime($valor["data"])),
                    "url"=>"articles/".$valor["url"].".html",
                    "thumbnail"=>"articles/img/".$valor["url"]."/".$valor["thumbnail"]);
                }
                
            }
            return $array;
        }
        
    }
}