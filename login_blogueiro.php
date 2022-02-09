<?php
session_start();

include "conecta_banco_mysql.php";
include "class/Usuario.php";
include "class/UsuarioDaoMysql.php";

if($_SERVER["REQUEST_METHOD"] != "POST"){
    header("Location: login_blogueiro.html");
    exit;
}else{
    $usuarioDao = new UsuarioDaoMysql($pdo);
    $email = filter_input(INPUT_POST,"email");
    $password = filter_input(INPUT_POST,"password");
    $repete_password = filter_input(INPUT_POST,"repete-password");

    if($email == false || $password == false || $repete_password == false){
        
        echo "erro!";
    }else{
        if($password != $repete_password){
            
            echo "senha não compativeis";
        }else if(strlen($password) < 8 || strlen($repete_password) < 8){
            
            echo "a senha deve conter no minimo 8 caracteres";
        }
        /* cadastro do usuario */
        if($usuarioDao->findByEmail($email) === false){
            //usuario não cadastrado
            echo "Usuário não cadastrado";
        }else{
            $usuario = new Usuario();
            $usuario->setEmail($email);
            $usuario->setSenha($password);
            
            $resposta = $usuarioDao->logar($usuario);

            if($resposta["logar"] === false){
                echo $resposta["textErro"];
            }else{
                $_SESSION["email"] = $usuario->getEmail();
                $_SESSION["nome"] = $usuario->getNome();
                $_SESSION["id_blogueiro"] = $usuario->getId();
                
                echo "true";
            }
        }  
    }
}