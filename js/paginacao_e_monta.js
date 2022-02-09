export function atualizaPaginacao(pagina,tipoPost,dados){
    const exibicao = 5;//resultado a ser exibidos
    const exibePagina = 3;//paginas a ser exibidas
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

                    atualizaPaginacao(this,"publicado",dados);
                    montaBlog(exibicao,i,this);              
                    localStorage.setItem("pg",i+1);
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
                    
                    atualizaPaginacao(this,"publicado",dados);
                    montaBlog(exibicao,i,this);              
                    localStorage.setItem("pg",i+1);
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
    
                    atualizaPaginacao(this,"publicado",dados);
                    montaBlog(exibicao,i+1,this);              
                    localStorage.setItem("pg",i+1);
                    active();
                
                });
                localStorage.setItem("pg",1);
                clonePg.style.display = "block";
                conteinerPaginacao.appendChild(clonePg);
                
            }
            if(passos == exibePagina){
                break;
            }
            
           
        }
        
        montaBlog(exibicao,0);
        defineLastOuFirst();
        active(pagina);
                    
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
    function montaBlog(exibe,pgInicial,elementoPg)
    {
        const container_blogs = document.querySelector(".conteiner-blogs");
        container_blogs.innerHTML = "" //limpa os dados
        let totalPosts = dados.length;
        let paginaRecebida = "";
        if(elementoPg !== undefined){
            paginaRecebida = parseInt(elementoPg.innerText);
        }
        
        let posicaoInicialDados = "";
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
         
        for (let i = posicaoInicialDados; i < ate; i++) {
            let modeloClonar = document.querySelector(".item-blog");
            let clone = modeloClonar.cloneNode(true);
            let nome = clone.querySelector(".nome-blog");
            nome.innerHTML = dados[i].blog;
            let data = clone.querySelector(".data-blog");
            data.innerHTML = dados[i].data;
            let link_blog = clone.querySelector(".link-blog");
            link_blog.setAttribute("href",dados[i].url);
            link_blog.setAttribute("target","_blank");
            let thumbnail = clone.querySelector(".foto-blog");
            thumbnail.setAttribute("src",dados[i].thumbnail);
            clone.style.display = "block";
            container_blogs.appendChild(clone);
        }
    }
}

