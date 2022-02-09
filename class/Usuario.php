<?php
class Usuario{
    private $id;
    private $nome;
    private $email;
    private $senha;

    public function getId(){
        return $this->id;
    }
    public function setId($id){
        $this->id = $id;
    }
    public function getNome(){
        return $this->nome;
    }
    public function setNome($n){
        $this->nome = ucwords($n);
    }
    public function getEmail(){
        return $this->email;
    }
    public function setEmail($e){
        $this->email = strtolower($e);
    }
    public function getSenha(){
        return $this->senha;
    }
    public function setSenha($s){
        $this->senha = $s;
    }
}