async function salvar(){
    const textarea = document.querySelector("#textarea").innerHTML;
    const titulo_pagina = document.querySelector("#titulo_pagina").innerText;

    let dados = JSON.stringify({conteudo: textarea, titulo: titulo_pagina});
    
    let req = await fetch("salva-artigo.php",{
        method: "post",
        body: dados,
        headers: {
            "Content-Type": "application/json"
        }
    });
    let json = await req.json();
    alert(json.mensagem);
}