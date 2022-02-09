window.onload = procurar;

async function procurar(){
    let body = document.getElementsByTagName("body")[0];
    let id = body.getAttribute("data-id");
    let req = await fetch("../buscarpublic.php?id="+id); 
    let json = await req.json();

    inseriDados(json);
}
function inseriDados(json){
    document.querySelector(".autor").innerText = json.blogueiro;
    document.querySelector(".data-publicacao").innerText = json.data;
}
let primeiroelem = document.getElementsByTagName("h1")[0];
let div = document.createElement("div");
div.innerHTML = "<span class='autor'></span> <span class='data-publicacao'></span>"
div.setAttribute("class","cont-autor");
let textAlign = primeiroelem.getAttribute("style");
let center = "";
let left = "";
//coloca as posição da div onde exibe informacoes do blogueiro conforme
//a posicao do titulo
if(textAlign == null){
    div.style.textAlign = "left";
}else{
    center = textAlign.indexOf("center");
    left = textAlign.indexOf("left");
}

if(center >= 0){
    div.style.textAlign = "center";
}
if(left >= 0){
    div.style.textAlign = "left";
}
////////////// fim //////////
primeiroelem.after(div);

////////////////define os caminhos das fotos blog ////////////
let fotos = document.querySelectorAll(".foto");
if(fotos.length > 0){
    pega();
}
async function pega(){
    let body = document.querySelector("body");
    let id = body.getAttribute("data-id");
    let req = await fetch("../pastaFotos.php?id="+id);
    let json = await req.json();
    
    fotos.forEach(elem => {
        let arquivoFoto = elem.getAttribute("data-nome");
        const caminho = json.url + "/" + arquivoFoto;
        elem.setAttribute("src",caminho);
    });
       
}
/////////// fim foto///////