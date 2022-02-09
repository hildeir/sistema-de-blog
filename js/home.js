window.onload = apagaStorage();
function apagaStorage(){
    localStorage.removeItem("pg");
    
}
let formBuscarPosts = document.querySelector("#form-buscar-posts");
formBuscarPosts.addEventListener("change", busca);

const exibicao = 3;//resultado a ser exibidos
const exibePagina = 5;//paginas a ser exibidas
let dados = "";
////////////// pesquisar
const submit = document.querySelector("#submit-pesquisar");
const form = document.querySelector("#pesquisar");
let resultado = document.querySelector(".resultado-posts");
submit.addEventListener("click",pesquisa);

function pesquisa(){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            resultado.innerHTML = "";
            if(this.responseText !== "null"){
                let resultado = JSON.parse(this.responseText); 
                dados = resultado;
                let quantPosts = document.querySelector(".totalPost");
                let pesquisarText = document.querySelector("#text-pesquisar").value;
                quantPosts.innerText = ""; //limpa o total
            
                let promise = totalPesquisa(pesquisarText); /// faz a requisao para saber o total de resultado que retorno apos a busca
                promise.then(function(resultado){
                    quantPosts.innerText = resultado; /// exibe o total da pesquisa
                    //monta o resultado da busca
                    montaBlog(exibicao,0);
                    atualizaPaginacao(0,"publicado"); //0 = pagina inicial 
                    armazenaPg(1);
                    active();
                }).catch(function(erro){
                    quantPosts.innerText = "Erro";
                });
                
                
            }
            
        }
    };
    xmlhttp.open("post","pesquisar.php");
    const formObj = new FormData(form);
    xmlhttp.send(formObj);
}
async function totalPesquisa(pesquisa){
    let req = await fetch("totalPesquisaBlogs.php?p="+pesquisa);
    let json = await req.json();
    return json;
}
////////////////
function busca(e){
    
    let resultadoPosts = document.querySelector(".resultado-posts");
    let xmlhttp = new XMLHttpRequest();
    
    resultadoPosts.innerHTML = "carregando.....";

    if(e.target.value == "none"){
        /* limpa os campos caso o usuario escolher opcao none*/
        resultadoPosts.innerHTML = "";
        let conteinerPaginacao = document.querySelector(".conteiner-paginacao");
        conteinerPaginacao.innerHTML = "";
        let quantPosts = document.querySelector(".totalPost")
        quantPosts.innerHTML = "";
        //oculta o texto "resultado"
        const cont_total_resultado = document.querySelector(".cont-totalBusca");
        cont_total_resultado.style.display = "none";
    }
    if(e.target.value == "nao publicado"){
        ////////////////////////// posts salvos //////////////////////////////
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let resultadoObj = JSON.parse(this.responseText);

                resultadoPosts.innerHTML = ""; // limpa os resultados dos dados
                /*faz a busca total dos posts */
                let select = document.querySelector(".tipo-posts");
                let totalBusca = buscaTotal(select.value);

                /* quando receber a requisicao entao monta os dados etc... */
                totalBusca.then(function(resultado){
                    let quantPosts = document.querySelector(".totalPost");
                    quantPosts.innerText = resultado;
                    //exibe o texto "resultado" e o valor do resultado
                    const cont_total_resultado = document.querySelector(".cont-totalBusca");
                    cont_total_resultado.style.display = "block";

                    dados = resultadoObj;
                    const paginaInicial = 0;
                    if(resultado == 0){
                        resultadoPosts.innerHTML = "Não há nenhum dados";
                    }else{
                        montaPost(exibicao,0);
                        atualizaPaginacao(paginaInicial,"nao publicado");
                        armazenaPg(1);
                        active();
                    }
                   
                }).catch(function(erro){
                    resultadoPosts.innerHTML = "Erro";
                });

            }
            
        }

        xmlhttp.open("post","buscarPosts.php");
        let formData = new FormData(formBuscarPosts);
        xmlhttp.send(formData);
        
        
    }else if(e.target.value == "publicado"){
        ////////////////////////// blogs publicado //////////////////////////////
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let resultadoObj = JSON.parse(this.responseText);

                resultadoPosts.innerHTML = ""; // limpa os resultados dos dados
                /*faz a busca total dos posts */
                let select = document.querySelector(".tipo-posts");
                let totalBusca = buscaTotal(select.value);

                /* quando receber a requisicao entao monta os dados etc... */
                totalBusca.then(function(resultado){
                    let quantPosts = document.querySelector(".totalPost");
                    quantPosts.innerText = resultado;

                    //exibe o texto "resultado" e o valor do resultado
                    const cont_total_resultado = document.querySelector(".cont-totalBusca");
                    cont_total_resultado.style.display = "block";

                    dados = resultadoObj;
                    const paginaInicial = 0;
                    if(resultado == 0){
                        resultadoPosts.innerHTML = "Não há nenhum dados";
                    }else{
                        montaBlog(exibicao,0);
                        atualizaPaginacao(paginaInicial,"publicado");
                        armazenaPg(1);
                        active();
                    }
                    
                }).catch(function(erro){
                    resultadoPosts.innerHTML = "Erro";
                });
                
            }
            
        }
        xmlhttp.open("post","buscarPosts.php");
        let formData = new FormData(formBuscarPosts);
        xmlhttp.send(formData);
   
    }
    
}
function atualizaPaginacao(pagina,tipoPost){
    let totalBusca = dados.length;
    let totalPaginacao = Math.ceil(totalBusca / exibicao);
    const conteinerPaginacao = document.querySelector(".conteiner-paginacao");
    const modelItem = document.querySelector(".item-pg");
    let idPagina = "";
    if(pagina != 0){
        idPagina = pagina.getAttribute("data-id");
    }
    
    if(idPagina == "last"){//se for a ultima pagina avanca paginacao
        let passos = 0;
        conteinerPaginacao.innerHTML = "" //limpa as paginas
        let pg = parseInt(pagina.innerText);

        for (let i = pg - 1; i < totalPaginacao; i++) {
            passos += 1;
            if(passos <= exibePagina){ //exibicao da pagina
                
                let clonePg = modelItem.cloneNode(true);
                clonePg.innerText = i+1;
                clonePg.addEventListener("click",function(){
                    if(tipoPost == "nao publicado"){
                        
                        atualizaPaginacao(this,"nao publicado");
                        montaPost(exibicao,i,this);
                    }else{
                        
                        atualizaPaginacao(this,"publicado");
                        montaBlog(exibicao,i,this);
                    }                  
                    armazenaPg(i+1);
                    active();
                
                });
                clonePg.style.display = "block";
                conteinerPaginacao.appendChild(clonePg);
                
            }
            if(passos == exibePagina){
                break;
            }         
           
        }
        defineLastOuFirst();
        
        
    }else if(idPagina == "first"){ //se for a primeira pagina volta a paginacao
        conteinerPaginacao.innerHTML = "" //limpa as paginas
        let pg = parseInt(pagina.innerText);//ex: 3
        let volta = "";
        if(pg > 1){
            let passos = "";
            if(pg <= exibePagina){
                while(pg > 0){
                    pg -= 1;
                    volta = pg;
                }
            }else if(pg > exibePagina){
                let acimaExibicaoPg = pg - totalPaginacao;//quantas casa esta acima da exibicao da pagina
                if(acimaExibicaoPg == 0){ //o zero quer dizer que esta na ulltima pagina
                    volta = totalPaginacao - exibePagina;
                }else{
                    passos = pg - acimaExibicaoPg; //passos para traz,recuar a pagina
                    while(passos > acimaExibicaoPg){
                        pg -= 1;
                        volta = pg;
                    }
                }
                
            }
            
        }
        let passos = 0;
        for (let i = volta; i < totalPaginacao; i++) {
                     
            passos += 1;
            if(passos <= exibePagina){ //exibicao da pagina
                
                let clonePg = modelItem.cloneNode(true);
                clonePg.innerText = i+1;
                clonePg.addEventListener("click",function(){
                    
                    if(tipoPost == "nao publicado"){
                        
                        atualizaPaginacao(this,"nao publicado");
                        montaPost(exibicao,i,this);
                    }else{
                        
                        atualizaPaginacao(this,"publicado");
                        montaBlog(exibicao,i,this);
                    }
                    
                    armazenaPg(i+1);
                    active();
                
                });
                clonePg.style.display = "block";
                conteinerPaginacao.appendChild(clonePg);
                
            }
            if(passos == exibePagina){
                break;
            }
            
        }
        defineLastOuFirst();
       
    }
    if(pagina == 0){
        let passos = 0;
        conteinerPaginacao.innerHTML = "" //limpa as paginas
        for (let i = pagina; i < totalPaginacao; i++) {
         
            passos += 1;
            if(passos <= exibePagina){ //exibicao da pagina
                
                let clonePg = modelItem.cloneNode(true);
                clonePg.innerText = i+1;
                clonePg.addEventListener("click",function(){
                    
                    if(tipoPost == "nao publicado"){
                        
                        atualizaPaginacao(this,"nao publicado");
                        montaPost(exibicao,i,this);
                    }else{
                        
                        atualizaPaginacao(this,"publicado");
                        montaBlog(exibicao,i,this);
                    }
                    
                    armazenaPg(i+1);
                    active();
                
                });
                clonePg.style.display = "block";
                conteinerPaginacao.appendChild(clonePg);
                
            }
            if(passos == exibePagina){
                break;
            }
            
           
        }
        defineLastOuFirst();
        active(pagina);
                    
    }
}
function armazenaPg(pg){
    localStorage.setItem("pg",pg);
}
function defineLastOuFirst(){
    /* define quem é o primeiro e o último filho da paginacao */
    const conteinerPaginacao = document.querySelector(".conteiner-paginacao");
    let totalPg = conteinerPaginacao.children.length;

    for (let i = 0; i < totalPg; i++) {

        let atributoFirst = conteinerPaginacao.children[i].getAttribute("data-id");
        let atributoLast = conteinerPaginacao.children[i].getAttribute("data-id");

        if(atributoFirst !== undefined || atributoLast !== undefined){
            conteinerPaginacao.children[i].removeAttribute("data-id");
        }
    }
    

    let ultimoPg = conteinerPaginacao.children[totalPg - 1];
    let primeiraPg = conteinerPaginacao.children[0];
    if(ultimoPg !== undefined){
        ultimoPg.setAttribute("data-id","last");
    }
    if(primeiraPg !== undefined){
        primeiraPg.setAttribute("data-id","first");
    }
    
}
function active(){
    const conteinerPg = document.querySelector(".conteiner-paginacao");
    for (let i = 0; i < conteinerPg.children.length; i++) {
        conteinerPg.children[i].classList.remove("active");
    }
   
    let pg = localStorage.getItem("pg");
    for (let i = 0; i < conteinerPg.children.length; i++) {
        if(conteinerPg.children[i].innerText == pg){
            conteinerPg.children[i].classList.add("active");
            break;
        }
    }
}
function montaBlog(exibe,pgInicial,elementoPg){
    let itemPosts = document.querySelector(".item-posts");
    let resultadoPosts = document.querySelector(".resultado-posts");
    let totalPosts = parseInt(document.querySelector(".totalPost").innerText);
    let paginaRecebida = "";
    if(elementoPg !== undefined){
        paginaRecebida = parseInt(elementoPg.innerText);
    }
    
    let posicaoInicialDados = "";
    resultadoPosts.innerHTML = ""; // limpa os resultados
    if(pgInicial == 0){
        posicaoInicialDados = 0;
    }else if(paginaRecebida > 0){
        /* inicia na primeira posicao de exibicao dos dados conforme a pagina
        em que está,pagina 2, pagina 3 etc
        para percorrer aos dados corretamente em ordem 0123456...*/
        posicaoInicialDados = (paginaRecebida * exibicao) - exibicao;  
    }
    let ate = posicaoInicialDados + exibe;//ate onde os dados deve ser exibidos 

    /*se a posicao final for maior que a exibicao de dados definido
    entao mostra apenas os restantes que falta */
    if(ate > totalPosts){ 
        let restante = totalPosts - posicaoInicialDados;//valor de quanto falta para chegar no total
        ate = posicaoInicialDados + restante;
    }
    /* fim */
    for(let i = posicaoInicialDados; i < ate; i++){

        let clonePost = itemPosts.cloneNode(true);
        clonePost.style.display = "flex";
        clonePost.setAttribute("data-id",dados[i].id);
        let tituloPagina = clonePost.querySelector(".titulo-pagina");
        tituloPagina.innerText = dados[i].nome_blog;//.........
        let data = clonePost.querySelector(".data");
        data.innerText = dados[i].data; //....
        let excluirPost = clonePost.querySelector(".excluirPost");
        let hrefExcluirPost = "excluir_blog?id="+ dados[i].id;
        excluirPost.setAttribute("href",hrefExcluirPost);
        
        let href = dados[i].url;
        let elemA = clonePost.querySelector(".link-post");
        elemA.setAttribute("href",href);
        elemA.setAttribute("target","_blank");

        resultadoPosts.appendChild(clonePost);
        
    }
    /* confirma se deseja realmente remove o post */
    let excluirPost = document.querySelectorAll(".excluirPost");
    excluirPost.forEach((element) => {
        element.addEventListener("click",confirma);
    });
    /* fim */

}
function montaPost(exibe,pgInicial,elementoPg){

    let itemPosts = document.querySelector(".item-posts");
    let resultadoPosts = document.querySelector(".resultado-posts");
    let totalPosts = parseInt(document.querySelector(".totalPost").innerText);
    let paginaRecebida = "";
    if(elementoPg !== undefined){
        paginaRecebida = parseInt(elementoPg.innerText);
    }
    
    let posicaoInicialDados = "";
    resultadoPosts.innerHTML = ""; // limpa os resultados
    if(pgInicial == 0){
        posicaoInicialDados = 0;
    }else if(paginaRecebida > 0){
        /* inicia na primeira posicao de exibicao dos dados conforme a pagina
        em que está,pagina 2, pagina 3 etc
        para percorrer aos dados corretamente em ordem 0123456...*/
        posicaoInicialDados = (paginaRecebida * exibicao) - exibicao;  
    }
    let ate = posicaoInicialDados + exibe;//ate onde os dados deve ser exibidos 

    /*se a posicao final for maior que a exibicao de dados definido
    entao mostra apenas os restantes que falta */
    if(ate > totalPosts){ 
        let restante = totalPosts - posicaoInicialDados;//valor de quanto falta para chegar no total
        ate = posicaoInicialDados + restante;
    }
    /* fim */
    for(let i = posicaoInicialDados; i < ate; i++){
        
        let clonePost = itemPosts.cloneNode(true);
        clonePost.style.display = "flex";
        clonePost.setAttribute("data-id",dados[i].id);
        let tituloPagina = clonePost.querySelector(".titulo-pagina");
        tituloPagina.innerText = dados[i].titulo;//.........
        let data = clonePost.querySelector(".data");
        data.innerText = dados[i].data; //....
        let excluirPost = clonePost.querySelector(".excluirPost");
        
        let hrefExcluirPost = "excluir_post?id="+ dados[i].id;
        excluirPost.setAttribute("href",hrefExcluirPost);
        let href = "editor.php?id="+ dados[i].id;
        let elemA = clonePost.querySelector(".link-post");
        elemA.setAttribute("href",href);

        resultadoPosts.appendChild(clonePost);
        
    }
    /* confirma se deseja realmente remove o post */
    let excluirPost = document.querySelectorAll(".excluirPost");
    excluirPost.forEach((element) => {
        element.addEventListener("click",confirma);
    });
    /* fim */
}
async function buscaTotal(valor){
    if(valor !== "none"){
        let req = await fetch("totalPost.php",{
            method: "post",
            body: JSON.stringify({buscar: valor}),
            headers:{
                "Content-Type": "application/json"
            }
        });
        let json = await req.json();
        return json.total;
    }else{
        //limpa o resultado total caso o usuario escolher nenhuma busca */
        let quantPosts = document.querySelector(".totalPost");
        quantPosts.innerText = "";
    }
}
/* confirma se deseja remover o post */
function confirma(e){
    if(confirm("Deseja realmente remove-lo ?")){
        return true;
    }else{
        e.preventDefault();
    }
}
////abre e fechar menu mobile
const menuAside = document.querySelector("nav");
const botaoMobile = document.querySelector(".icone-mobile");
botaoMobile.addEventListener("click",abre);
function abre(){
    menuAside.style.left = "0px";
}
const botaoFechar = document.querySelector(".botao-fechar-menu-mobile");
botaoFechar.addEventListener("click",fechar);
function fechar(){
    menuAside.style.left = "-95px";
}