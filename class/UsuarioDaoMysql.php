<?php
include "interface/UsuarioDao.php";

class UsuarioDaoMysql implements UsuarioDao{
    private $pdo;

    public function __construct(PDO $pdo){
        $this->pdo = $pdo;
    }

    public function add(Usuario $u){
        $query = $this->pdo->prepare("insert into cadastro_blogueiros (nome,email,senha) values (:nome,:email,:senha)");
        $query->bindValue(":nome",$u->getNome());
        $query->bindValue(":email",$u->getEmail());

        $password = password_hash($u->getSenha(),PASSWORD_DEFAULT);
        if($password === false){
            $result["sucess"] = false;
            $result["textResposta"] = "Erro ao cadastrar, tente novamente";
            return $result;
        }else{
            $query->bindValue(":senha",$password);
            $query->execute();
            $result["sucess"] = true;
            $result["redireciona"] = "editor.php";
            return $result;
        }
    }
    public function findById($id){

    }
    public function findAll(){

    }
    public function update(Usuario $u){

    }
    public function delete($id){

    }
    public function findByEmail($email){
        $query = $this->pdo->prepare("select * from cadastro_blogueiros where email = :email");
        $query->bindValue(":email", $email);
        $query->execute();

        if($query->rowCount() > 0){
            return true;
        }else{
            return false;
        }
    }
    public function logar(Usuario $u){
        $query = $this->pdo->prepare("select * from cadastro_blogueiros where email = :email");
        $query->bindValue(":email",$u->getEmail());
        $query->execute();

        if($query->rowCount() > 0){
            $result = $query->fetch();
            if(password_verify($u->getSenha(),$result["senha"])){
                //entrar
                $resposta["logar"] = true;
                //$resposta["id_blogueiro"] = $result["id_blogueiro"]; 
                $u->setId($result["id_blogueiro"]);
                $u->setNome($result["nome"]);
                return $resposta;
            }else{
                $resposta["logar"] = false;
                $resposta["textErro"] = "senha errada";
                
                return $resposta;
            }
        }else{
            //usuario nao encontrado
            $resposta["logar"] = false;
            $resposta["textErro"] = "usuário não encontrado";
        }
    }
}