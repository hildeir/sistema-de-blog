window.onload = inicia;
function inicia(){
    toolbar.install("formText"); 
} 
var imgWidth = 500; 
var imgHeight = 500;

let toolbar = {
    altura: "auto",
    install: function(form){
        let formText = document.querySelector("#"+form);
        let toolbar = document.createElement("div"); //toolbar
        toolbar.setAttribute("class","toolbar");
        toolbar.style.height = this.altura;
        toolbar.style.display = "flex";
        let first_child = formText.childNodes;
        formText.insertBefore(toolbar,first_child[0]); 

        /* criar as ferramentas */
        let ferramentas = this.ferramentas;
        let ferramentas_titulos = this.ferramentas.conjTitulos;
        for (const i in ferramentas) {
            if(ferramentas[i].name !== undefined){
                
                if(ferramentas[i].name == "inserirImagem"){
                    let label = document.createElement("label");
                    let form = document.createElement("form"); 
                    form.setAttribute("id","formUploadFoto");
                    /* adiciona a classe */
                    let classe = form.classList.contains("ferramentaToolbar");
                    if(classe != null || classe != undefined){
                        form.classList.add("ferramentaToolbar");
                    }
                    /* fim classe */
                    label.setAttribute("for","upload");
                    let elemUpload = document.createElement("input");
                    elemUpload.setAttribute("type","file");
                    elemUpload.setAttribute("id","upload");
                    elemUpload.setAttribute("name","upload");
                    elemUpload.setAttribute("data-name", ferramentas[i].name);
                    elemUpload.setAttribute("onchange","uploadFoto()");
                    elemUpload.style.display = "none";
                    let img = document.createElement("img");
                    img.setAttribute("src",ferramentas[i].img);
                    
                    label.appendChild(img);
                    form.appendChild(label);
                    form.appendChild(elemUpload);
                    toolbar.appendChild(form);
                }else{
                    let elem = document.createElement("div");//crie a ferramenta
                    elem.setAttribute("id",ferramentas[i].name);
                    elem.setAttribute("onclick","acao(this)");
                    elem.setAttribute("data-name",ferramentas[i].name);
                     /* adiciona a classe */
                    let classe = elem.classList.contains("ferramentaToolbar");
                    if(classe != null || classe != undefined){
                        elem.classList.add("ferramentaToolbar");
                    }
                    /* fim classe */
                    let img = document.createElement("img");
                    img.setAttribute("src",ferramentas[i].img);
                    elem.appendChild(img);
                    toolbar.appendChild(elem);
                }

              
                
            }
            
        }
        if(ferramentas_titulos){

            let select = document.createElement("select");//cria select
            let div = document.createElement("div");
            select.setAttribute("id","conjTitulos");
            select.setAttribute("onchange","acaoConjTitulos(this.value)");
            select.style.height = "25px";
             /* adiciona a classe */
             let classe = div.classList.contains("selectFerramenta");
             if(classe != null || classe != undefined){
                div.classList.add("selectFerramenta");
             }
             /* fim classe */
            /* cria os option e coloca dentro do select e depois dentro do toolbar */
            for (const i in ferramentas_titulos) {
                let option = document.createElement("option"); 
                option.value = ferramentas_titulos[i].name;
                option.innerText = ferramentas_titulos[i].name;
                select.appendChild(option);
            }
            
            div.appendChild(select)
            toolbar.appendChild(div);
        }
        
        
           
    },
    ferramentas: {

        bold:{
            name: "editorBold",
            img: "ferramenta-editor/icons/bold.png",
            acao: function(){
                document.execCommand("bold");
                
            }
        },
        italico: {
            name:"editorItalico",
            img: "ferramenta-editor/icons/italico.png",
            acao: function(){
                document.execCommand("italic");
            }
        },
        underline: {
            name: "editorUnderline",
            img: "ferramenta-editor/icons/underline.png",
            acao: function(){
                document.execCommand("underline");
            }
        },
        textoCentro:{
            name: "texto centro",
            img: "ferramenta-editor/icons/justifycenter.png",
            acao: function(){
                document.execCommand("justifyCenter",false);
            }
        },
        textoLeft:{
            name: "texto esquerda",
            img: "ferramenta-editor/icons/justifyleft.png",
            acao: function(){
                document.execCommand("justifyLeft",false);
            }
        },
        inserirImagem:{
            name: "inserirImagem",
            img: "ferramenta-editor/icons/imagem.png",
            acao: function(form){
               
                let verificacao = function(elemento){
                    let tipo = elemento.type;
                    let extensaoPermitida = ["image/jpg","image/jpeg","image/png"];
                    let result = "";
                    
                    for(let i = 0; i < extensaoPermitida.length; i++){
                        if(tipo == extensaoPermitida[i]){
                            result = true;
                            break;
                        }else{
                            result = false;
                        }
                    }    
                    return result;
                };
                let item = document.querySelector("#upload").files[0];
                let resultado = verificacao(item);
                if(resultado)//se a arquivo for uma imagem entra nesta condição
                {
                    
                    const xHttp = new XMLHttpRequest();
                    xHttp.onreadystatechange = function(){
                        if(this.readyState == 4 && this.status == 200){
                            let objImg = JSON.parse(this.responseText);
                           
                            if(objImg.sucess){
                               
                                document.querySelector("#textarea").focus();
                                
                                let numero = Math.floor(Math.random()*10000);
                                let idImg = "imgUpload-"+numero;
                                let img = `<table class='tableFoto'>
                                    <tr>
                                        <td class='contImg' style='position: relative;'>
                                            <img class='foto' data-nome='${objImg.nome}' id='${idImg}' style='width:${imgWidth}px; height: ${imgHeight}px' src='articles/img/${objImg.nome}'>
                                        </td>
                                    </tr>
                                </table>`
                                document.execCommand('insertHTML', false, img);
                                /*
                                document.querySelector("#"+idImg).addEventListener("mouseover",function(){
                                    overfoto(idImg);
                                });
                                document.querySelector("#"+idImg).addEventListener("mouseout",function(){
                                    outfoto();
                                });
                                  */
                                let foto = document.querySelector("#"+idImg);
                                foto.setAttribute("onmouseover","overfoto('"+idImg+"')");  
                                foto.setAttribute("onmouseout","outfoto()"); 
                                
                            }else{
                                alert("erro ao criar foto, tente novamente");
                            }
                            
                        }
                    }
                    xHttp.open("POST","upload-imagem.php");
                    let formdata = new FormData(form);
                    xHttp.send(formdata); 
                    
                }else{
                    alert("permitido apenas fotos");
                }
            }
        },
        conjTitulos:{
            normal: {
                name: "normal",
                acao: function(){
                    document.execCommand('formatBlock', false, 'p');
                }
            },
            titulo: {
                name: "titulo",
                acao: function(){
                    document.execCommand('formatBlock', false, 'h1');
                }
            },
            subtitulo: {
                name: "subtitulo",
                acao: function(){
                    
                    document.execCommand('formatBlock', false, 'h2');
                   
                }
            }
           
        }
       
    }
   
};

let selecaofoto = {
    largura: "",
    altura:"",
    abrir: function(objfoto){

        let id = objfoto.id;
        let foto = document.querySelector("#"+id);
        let selecionado = foto.getAttribute("data-selected");
        if(selecionado == "false" || selecionado == null){
            /* remove selecao de outras fotos */
            let fotos = document.querySelectorAll(".foto");
            for (let i = 0; i < fotos.length; i++) {
                let fotoatual = fotos[i].getAttribute("id");
                if(fotoatual != id){
                    //remove outras selecao sem ser que esta atualmente selecionado
                    selecaofoto.fechar(fotos[i]);
                }
            }
            /* fim */
            if(foto != null){
                foto.setAttribute("data-selected","true");
            }
        
            /*cria o popdown */
            let popdown = document.createElement("div");
            popdown.setAttribute("class","popdown");
            popdown.setAttribute("contenteditable","false");
            popdown.style.cursor = "pointer";
            /* fim popdown */

            /* adiciona o elemento popdown depois da .tableFoto */
            let tables = document.querySelectorAll(".tableFoto");            
            for (let i = 0; i < tables.length; i++) {
                let foto = tables[i].querySelector(".foto");
                let pai = tables[i].parentNode;
                let selecionado = foto.getAttribute("data-selected");
                if(selecionado == "true"){
                    pai.insertBefore(popdown,tables[i].nextSibling);
                }
            }
            /* fim */
         
            popdown.addEventListener("mouseover",overPopdown);
            popdown.addEventListener("mouseout",outPopdown);
            let width = foto.width;
            localStorage.setItem("imgselecionadowidth",width);
            this.largura = width;
           
            selecaofoto.criarselecaoimg(foto);
            selecaofoto.criarresize(foto);
            selecaofoto.inseriFerramentasPopdown(popdown,id);
            selecaofoto.posicaopopdown(popdown,id);
           
        }
       
   
    },
    fechar: function(elemfoto){

        elemfoto.setAttribute("data-selected","false");
        
        let popdown = document.querySelector(".popdown");
        if(popdown != null || popdown != undefined){
            popdown.remove();
            selecaofoto.removeselecaoimg(elemfoto);
            selecaofoto.removeresize(elemfoto);
        }
        
    },
    ferramentas:{
        justifyCenter:{
            name: "justify center",
            img: "ferramenta-editor/popdown icons/justifycenter.png",
            acao: function(idFoto){
                let elemFoto = document.querySelector("#"+idFoto);
                let table = elemFoto.closest(".tableFoto");
                table.setAttribute("align","center");
                selecaofoto.fechar(elemFoto);
            }
        },
        justifyLeft: {
            name: "justify left",
            img: "ferramenta-editor/popdown icons/justifyleft.png",
            acao: function(idFoto){
                let elemFoto = document.querySelector("#"+idFoto);
                let table = elemFoto.closest(".tableFoto");
                table.setAttribute("align","left");
                selecaofoto.fechar(elemFoto);
            }
        }
    },
    inseriFerramentasPopdown: function(popdown,idFoto){
        let ferramentas = selecaofoto.ferramentas;
        for (const i in ferramentas) {
            let img = document.createElement("img");
            img.setAttribute("src",ferramentas[i].img);
            popdown.appendChild(img); 
            
            img.addEventListener("click",function(){
                ferramentas[i].acao(idFoto);
            });   
        }
        
    },
    posicaopopdown: function(popdown,idFoto){
        let img = document.querySelector("#"+idFoto);
        let imgLargura = document.querySelector("#"+idFoto).width;
		let tela = document.querySelector("#textarea").clientWidth;
        let table = img.closest(".tableFoto");
        let alignText = table.getAttribute("align");
        

        if(alignText == "left" || alignText == null){
            let elem = document.querySelector("#"+idFoto);
            let estilo = window.getComputedStyle(elem);
            let valoresBorda = estilo.getPropertyValue("border");
            let borda = valoresBorda.substr(0,3);
            popdown.style.left = borda;
        }
        if(alignText == "center"){
            let meioTela = tela / 2; 
            let meioImg = imgLargura / 2;
            let posicao = meioTela - meioImg;
            popdown.style.left = posicao+"px";
        
        }

    },
    criarselecaoimg: function(elemimg){
        let tdConteiner = elemimg.closest(".contImg");
        let selecao = document.querySelector(".selecaoFoto");
        let clone = selecao.cloneNode(true);
        clone.style.display = "block";
        clone.setAttribute("contenteditable","true");
        let largura = elemimg.width;
        let altura = elemimg.height;
        clone.style.width = largura+"px";
        clone.style.height = altura+"px";
        tdConteiner.appendChild(clone);
    },
    removeselecaoimg: function(elemimg){
        let tdConteiner = elemimg.closest(".contImg");
        let selecao = tdConteiner.querySelector(".selecaoFoto");
        if(selecao != null){
            selecao.remove();
        }
        
    },
    criarresize: function(elemimg){
        let tdConteiner = elemimg.closest(".contImg");
        let resize = document.querySelector(".resizeCont");
        let clone = resize.cloneNode(true);
        clone.style.display = "block";
        let largura = elemimg.width;
        let altura = elemimg.height;
        clone.style.width = largura+"px";
        clone.style.height = altura+"px";
        tdConteiner.appendChild(clone);

       
        let pontoLeft = document.querySelector(".left");
        pontoLeft.addEventListener("mousedown",mousedown);

        let pontoRight = document.querySelector(".right");
        pontoRight.addEventListener("mousedown",mousedown);

        let pontoTop = document.querySelector(".top");
        pontoTop.addEventListener("mousedown",mousedown);

        let pontoBottom = document.querySelector(".bottom");
        pontoBottom.addEventListener("mousedown",mousedown);
        
    },
    removeresize: function(elemimg){
        let tdConteiner = elemimg.closest(".contImg");
        let resize = tdConteiner.querySelector(".resizeCont");
        if(resize != null){
            resize.remove();
        }
        
    }
};
let verificaSelecaoFoto = {
    procura: function(){
        let imagens = document.getElementsByTagName("img");
        for (let i = 0; i < imagens.length; i++) {
            let result = imagens[i].getAttribute("data-selected");
            if(result == "true"){
                selecaofoto.fechar(imagens[i]);
                
            }
        }
        
    }
};
let imagem = {
    apagar : async function(foto){
        let nomeFoto = foto.getAttribute("data-nome");
        let req = await fetch("apagarImg.php",{
            method: "post",
            body: JSON.stringify(nomeFoto),
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            }
        });
        let json = await req.json();
    }
}
/* backspace "apagar" a tabela onde esta a foto e fecha a selecao*/
document.addEventListener("keyup",function(e){
    let contImg = document.querySelectorAll(".contImg");
    
    if(e.keyCode == 8){    
        contImg.forEach((elem)=>{
            let foto = elem.getElementsByTagName("img")[0];
            if(foto == undefined){
                let table = elem.closest(".tableFoto");
                let popdown = document.querySelector(".popdown");
                table.remove();
                popdown.remove();
            }else{
                let selecionado = foto.getAttribute("data-selected");
                if(selecionado == "true"){
                    let table = elem.closest(".tableFoto");
                    let popdown = document.querySelector(".popdown");
                    imagem.apagar(foto);
                    table.remove();
                    popdown.remove();
                    
                }
                
            }
        });       
        
    }
})
/* fim */
function mousedown(e){
    let pontoLeft = e.target.classList.contains("left");
    let pontoRight = e.target.classList.contains("right");
    let pontoTop = e.target.classList.contains("top");
    let pontoBottom = e.target.classList.contains("bottom");
    
    let textArea = document.querySelector("#textarea");
    textArea.addEventListener("mousemove",mousemove);
    textArea.addEventListener("mouseup",mouseup);
    
    let fotos = document.querySelectorAll(".foto");
    let usarFoto = "";
    fotos.forEach(elem=>{
        let selecionado = elem.getAttribute("data-selected");
        if(selecionado == "true"){
            usarFoto = elem;
        }
    });
    let table = usarFoto.closest(".tableFoto");
    let conteinerimg = usarFoto.closest(".contImg");
    let resizeCont = conteinerimg.querySelector(".resizeCont");
    let rec = resizeCont.getBoundingClientRect();

    
    function mousemove(e){
    
        if(pontoLeft){
            let offleft = table.offsetLeft + textArea.offsetLeft;
            let moveleft = e.clientX - offleft;

            resizeCont.style.width = rec.width - (moveleft + 3) + "px";
            resizeCont.style.left = moveleft + "px";

            let novowidth = Math.abs(moveleft - rec.width);//converte numero negativo para positivo
            selecaofoto.largura = novowidth;//define a propriedade com nova largura para foto

        }else if(pontoRight){
            let offleft = table.offsetLeft + textArea.offsetLeft;
            let move = e.pageX - offleft;
            resizeCont.style.width = move + "px";
            selecaofoto.largura = move;

        }else if(pontoTop){
            let movetop;
            if(textArea.scrollTop == 0){
                movetop = e.pageY - (table.offsetTop + textArea.offsetTop);
            }else{
                let y =  table.offsetTop - textArea.scrollTop;
                movetop = e.pageY - (y + textArea.offsetTop);
                
            }
            

            resizeCont.style.height = rec.height - (movetop + 3) + "px";
            resizeCont.style.top = movetop + "px";

            let novoheight = Math.abs(movetop - rec.height)//converte numero negativo para positivo
            selecaofoto.altura = novoheight;
        }
        
        else if(pontoBottom){
           
            let move;
            if(table.offsetTop == 0){
                let y = (textArea.scrollTop + e.pageY) - textArea.offsetTop;
                move = y;
            }else{
                let y =  table.offsetTop - textArea.scrollTop;
                move = e.pageY - (y + textArea.offsetTop);
            }
            
            resizeCont.style.height = move + "px";
            selecaofoto.altura = move;
            
        }
        

    }
    function mouseup(){
        textArea.removeEventListener("mousemove",mousemove);
        textArea.removeEventListener("mouseup",mouseup);
        
        redimensionalargura(usarFoto);//define nova largura da foto
        redimensionaAltura(usarFoto);
        selecaofoto.fechar(usarFoto);
    }
}

function overPopdown(e){
    e.target.addEventListener("click",function(){
    
        let textarea = document.querySelector("#textarea");
        textarea.removeEventListener("click",fechaselecao);

    });
}
function outPopdown(e){
    let textarea = document.querySelector("#textarea");
    textarea.addEventListener("click",fechaselecao);
    
}

function overfoto(fotoid){
   
    let elemfoto = document.querySelector("#"+fotoid);
    let textarea = document.querySelector("#textarea");
    elemfoto.addEventListener("click",function(){
        textarea.removeEventListener("click",fechaselecao);
        selecaofoto.abrir(elemfoto);
    });
}
function outfoto(){
    let textarea = document.querySelector("#textarea");
    textarea.addEventListener("click",fechaselecao);
    
}
function redimensionalargura(img){
    
    img.style.width = selecaofoto.largura + "px";

}
function redimensionaAltura(img){
    img.style.height = selecaofoto.altura + "px";
}
function fechaselecao(e){
    let table = e.target.querySelector(".tableFoto");
    if(table != null || table != undefined){
        let fotos = table.querySelectorAll(".foto");

        if(fotos != null || fotos != undefined){
            fotos.forEach(elem=>{
                let selecionado = elem.getAttribute("data-selected");
                if(selecionado == "true"){
                    
                    if(table != undefined || table != null){
                        let img = table.getElementsByTagName("img")[0];
                        selecaofoto.fechar(img);           
                    }
                }
            }); 
        }
    }
    
}
function acao(elem){
    let ferramenta = elem.getAttribute("data-name");
    let obj = toolbar.ferramentas;
    
    for (const i in obj) {
        if(obj[i].name == ferramenta){
            obj[i].acao();
        }
    }
}
function acaoConjTitulos(nomeFerramentaTitulos){
    let obj = toolbar.ferramentas.conjTitulos;
    
    for (const i in obj) {
        if(obj[i].name == nomeFerramentaTitulos){
            obj[i].acao();
        }
    }
    
}
function uploadFoto(){
    let form = document.querySelector("#formUploadFoto");
    toolbar.ferramentas.inserirImagem.acao(form);
}
function visualizar(){
    verificaSelecaoFoto.procura();// se a foto estiver com selecao remove

    let form = document.querySelector("#formText");
    let x = document.querySelector(".text_hidden");
    let textArea = document.querySelector("#textarea").innerHTML;
    let hiddenTituloPagina = document.querySelector(".text_hidden_titulo");
    let tituloPagina = document.querySelector("#titulo_pagina").innerText;
    let publicar = document.querySelector("#publicar");
    x.value = textArea;
    hiddenTituloPagina.value = tituloPagina;
    publicar.value = "false";
    
    form.setAttribute("target","_blank");
    form.submit();
    form.removeAttribute("target");
}
function publicar(){
    verificaSelecaoFoto.procura();// se a foto estiver com selecao remove

    let form = document.querySelector("#formText");
    let conteudoHidden = document.querySelector(".text_hidden");
    let hiddenFotos = document.querySelector(".text_hidden_fotos");
    let textArea = document.querySelector("#textarea").innerHTML;
    let publicar = document.querySelector("#publicar");
    const tituloPagina = document.querySelector("#titulo_pagina").innerText;
    let hiddenTitulo = document.querySelector(".text_hidden_titulo");
    publicar.value = "true";
    conteudoHidden.value = textArea;
    hiddenTitulo.value = tituloPagina;
    hiddenFotos.value = addFotosHidden();
    let h1existe = existeH1();//verifica se existe um titulo no inicio do blog
    if(tituloPagina == ""){
        alert("preencha o titulo da pagina");
    }else if(!h1existe){
        alert("coloque um título para o seu blog");
    }else{
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onload = function(){
            let response = this.responseText;
            alert(response);
            document.location = "editor.php";
        }
        let formulario = new FormData(form);
        xmlHttp.open("POST","visualiza_envia.php");
        xmlHttp.send(formulario);
        
    }
    
}
function addFotosHidden(){
    let fotos = document.querySelectorAll(".foto");
    let fotosArray = [];
    fotos.forEach((elem)=>{
        let nomeFoto = elem.getAttribute("data-nome");
        fotosArray.push(nomeFoto);
    });
    return fotosArray.join("|");
}
// verifica se existe o dom <h1> na primeira linha no blog
function existeH1(){
    const textAreaConteudo = document.querySelector("#textarea").innerHTML;
    const dom = new DOMParser().parseFromString(textAreaConteudo,"text/html");
    const h1 = dom.querySelectorAll("h1")[0];
   
    
    console.log(h1);
    const primeiroFilho = dom.querySelector("body").firstChild;
    if(primeiroFilho == h1){
        return true;
    }else{
        return false;
    }
}
const nomePagina = document.querySelector("#titulo_pagina");
nomePagina.addEventListener("keydown",cancela);
function cancela(e){
    //cancela a quebra de linha quando usuario teclar
    if(event.keyCode === 13){
        e.preventDefault();
    }
}