<?php
class Artigo{
    private $id_artigo;
    private $id_blogueiro_fk;
    private $nome_artigo;//nome do artigo vai ser o titulo da pagina
    private $url;
    private $data;
    private $thumbnail;

    public function setIdBlogueiro($id){
        $this->id_blogueiro_fk = $id;
    }
    public function getIdBlogueiro(){
        return $this->id_blogueiro_fk;
    }
    public function setIdArtigo($id){
        $this->id_artigo = $id;
    }
    public function getIdArtigo(){
        return $this->id_artigo;
    }
    public function setNomeArtigo($nomeArtigo){
        $this->nome_artigo = $nomeArtigo;
    }
    public function getNomeArtigo(){
        return $this->nome_artigo;
    }
    public function setUrl($url){
        $this->url = $url;
    }
    public function getUrl(){
        return $this->url;
    }
    public function setData($data){
        $this->data = $data;
    }
    public function getData(){
        return $this->data;
    }
    public function setThumbnail($thumbnail){
        $this->thumbnail = $thumbnail;
    }
    public function getThumbnail(){
        return $this->thumbnail;
    }
}