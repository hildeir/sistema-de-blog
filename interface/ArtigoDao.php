<?php
interface ArtigoDao{
    public function add(Artigo $a);
    public function pegarDadosPublicacao($idArtigo);
    public function nomeArtigo($idBlogueiro);
    public function updatePost($idPost, $idBlogueiro, $titulo, $conteudo);
    public function criarPost($idBlogueiro, $titulo, $conteudo);
    public function existePost($idBlogueiro, $titulo);
    public function allPosts($idBlogueiro);
    public function allBlogs($idBlogueiro);
    public function onlyPost($idPost,$idBlogueiro);
    public function getTotalPost($idBlogueiro);
    public function getTotalBlog($idBlogueiro);
    public function pegaPastaFoto($id_artigo);
    public function excluirBlog($id_blog,$id_blogueiro);
    public function excluirPost($id_post,$id_blogueiro);
    public function existeImagem($id_blogueiro,$imagem);
    public function guardaImagem($id_blogueiro,$imagem); //salva a imagem no banco 
    public function excluiImagem($id_blogueiro,$imagem);
    public function defineIdPostNasImg($idPost,$id_blogueiro,$ids_img); 
    public function pesquisaOnlyBlogs($id_blogueiro,$pesq);
    public function totalPesquisaBlogs($id_blogueiro,$pesq);
    public function allblogsAutores();
    public function pegaBlogs($pesquisar);
}