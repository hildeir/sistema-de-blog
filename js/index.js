reqBlogs();
import {atualizaPaginacao} from './paginacao_e_monta.js';

async function reqBlogs(){
    let req = await fetch("./todosBlogsAutores.php");
    let json = await req.json();
    atualizaPaginacao(0,"publicado",json);
}
const bt_pesquisar = document.querySelector("#bt-pesquisar");
bt_pesquisar.addEventListener("click", pesquisa);

async function pesquisa(){
    const pesq = document.querySelector("#pesquisar").value;
    let req = await fetch("./pesquisaBlogs.php?pesq="+pesq);
    let json = await req.json();
    atualizaPaginacao(0,"publicado",json);
}