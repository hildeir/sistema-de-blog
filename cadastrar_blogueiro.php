<?php
include "conecta_banco_mysql.php";
include "class/Usuario.php";
include "class/UsuarioDaoMysql.php";

if($_SERVER["REQUEST_METHOD"] != "POST"){
    header("Location: cadastrar_blogueiro.html");
}else{

    $usuarioDao = new UsuarioDaoMysql($pdo);

    $nome = filter_input(INPUT_POST,"nome");
    $email = filter_input(INPUT_POST,"email",FILTER_VALIDATE_EMAIL);
    $password = filter_input(INPUT_POST,"password");
    $repete_password = filter_input(INPUT_POST,"repete-password");

    if($nome == false || $email == false || $password == false || $repete_password == false){
    
        echo "erro!";
    }else{
        if($password != $repete_password){
            
            echo "senha não compativeis";
        }else if(strlen($password) < 8 || strlen($repete_password) < 8){
            
            echo "a senha deve conter no minimo 8 caracteres";
        }
        /* cadastro do usuario */
        if($usuarioDao->findByEmail($email) === false){
            //nao encontrou usuario adiciona novo usuario
            $usuario = new Usuario();
            $usuario->setNome($nome);
            $usuario->setEmail($email);
            $usuario->setSenha($password);
            
            $result = $usuarioDao->add($usuario);

            if($result["sucess"]){
                //em caso de sucesso
                $array = array(
                    "sucess" =>$result["sucess"],
                    "redireciona"=>$result["redireciona"]
                );
                
                echo json_encode($array);
                
            }else{
                $array = array(
                    "sucess" =>$result["sucess"],
                    "redireciona"=>$result["textResposta"]
                );
                echo json_encode($array);
            }
        }else{
            echo "usuario já existe";
        }  
    }
}