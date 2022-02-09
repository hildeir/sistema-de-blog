function logar(){
    let form = document.querySelector("#form");
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let password_repete = document.querySelector("#password-repete").value;

    if(email == "" || password == "" || password_repete == ""){
        alert("campos vazios");
    }else{
        let arroba = email.indexOf("@");
        let enviaRequisicaoForm = false;

        if(password != password_repete){
            alert("senha não compativeis");
        }else if(password.length < 8 || password_repete < 8){
            alert("a senha deve conter no minimo 8 caracteres");
        }
        /******** valida email ********/
        else if(arroba >= 0){
            let aposArroba = email.substr(arroba+1);
            if(aposArroba != ""){//se encontra uma string apos o arroba
                if(aposArroba.length > 1){
                    let ponto = email.indexOf(".");
                    if(ponto == -1){
                        alert("nao encontrado o ponto");
                    }else{
                        let aposPonto = email.substr(ponto+1);
                        if(aposPonto != ""){
                            if(aposPonto.length > 1){
                                enviaRequisicaoForm = true;
                            }
                        }else{
                            alert("nao encontrado caracter depois do ponto");
                        }
                    }
                }else{
                    alert("nao encontrado ponto");
                }
                
            }else{
                alert("erro email,não encontrado caracter depois do arroba");
            }
        }else{
            alert("erro email, arroba não encontrado");
        }
        
        
        if(enviaRequisicaoForm == true){

            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onload = function(){
                let response = this.responseText;
                if(response != "true"){
                    alert(response);
                    
                }else{

                    window.location.href = "home.php";
                }
            }
            xmlHttp.open("POST","login_blogueiro.php");
            let formulario = new FormData(form);
            xmlHttp.send(formulario);

        }
        
    }
}