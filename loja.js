///Tarefa 1: Dados iniciais
const nomeLoja = "LariCel";

let produtos = [
    
    {nome: "Celular", categoria: "Dispositivo Movel", preco: 1000, quantidade: 50, vendidos: 30 },
    {nome: "Capinha de celular", categoria: "Acessorio", preco: 10.5, quantidade: 20, vendidos: 30 },
    {nome: "Notebook", categoria: "Dispositivo Movel", preco: 2000, quantidade: 60, vendidos: 80 },
    {nome: "Tablete", categoria: "Dispositivo Movel", preco: 1004.50, quantidade: 54, vendidos: 39 },
    {nome: "Camera", categoria: "Dispositivo Movel", preco: 1500, quantidade: 4, vendidos: 60 },
    {nome: "Monitor", categoria: "Periferico", preco: 500, quantidade: 3, vendidos: 100 },
    
]

///Tarefa 2: listagem dos produtos

function listarProdutos(produtos) {
    let k, tam = produtos.length;

    for(k = 0; k < tam; k++){

        console.log(`${k + 1}. Nome: ${produtos[k].nome} | categoria: ${produtos[k].categoria} | preço: R$${produtos[k].preco} | quantidade: ${produtos[k].quantidade} un. | ${produtos[k].vendidos} vendidos`)
    }
                
}

///Tarefa 3: adicionar produtos novos

function cadastrarProduto(produtos, nome, categoria, preco, quantidade){

    let novo = {
        nome: formatarNome(nome),
        categoria: categoria,
        preco: preco,
        quantidade: quantidade,
        vendidos: 0,
    }
    
    produtos.push(novo);

    return produtos.length;
}

///tarefa 4: calcula o total que contem no estoque
function calcularValorEstoque(produtos){
    let k, soma = 0, multi, tam = produtos.length;

    for(k = 0; k < tam; k ++){

        multi = produtos[k].quantidade * produtos[k].preco;

        soma = soma + multi;

    }

    return soma;
}
/// tarefa 5: busca um produto 
function buscarProduto(produtos, termo){
    let k, tam = produtos.length;
    
    let termo_minusculo = termo.toLowerCase();

    for(k = 0; k < tam; k ++){

    let produto_minusculo = produtos[k].nome.toLowerCase();

    if(produto_minusculo.includes(termo_minusculo)){

        return produtos[k];
    }

    }
    return null;
}

///Tarefa 6: procura um produto em falta
function produtosEmFalta(produtos, minimo) {

    let k, tam = produtos.length, falta = [];

    for(k = 0; k < tam; k++){

        if(produtos[k].quantidade < minimo){
            falta.push(produtos[k]);
            
        }
    }

    return falta;
}

///Tarefa 7: aplica desconto
function aplicarDesconto(produtos, categoria, percentual){

    let k, tam = produtos.length, cont = 0;

    for(k = 0; k < tam; k ++){

        if(produtos[k].categoria.toLowerCase() === categoria.toLowerCase()){

            let novopreco = produtos[k].preco - ((produtos[k].preco * percentual)/100);

            produtos[k].preco = novopreco;

            cont++;
        }

        
    }
    return cont;
}
///Tarefa 8: registra vendas feitas

function registrarVenda(produtos, nome, quantidade){

    let procura =  buscarProduto(produtos, nome);

    if (procura === null || procura.quantidade < quantidade) {
        return false;
    }

    procura.quantidade = procura.quantidade - quantidade;
    procura.vendidos = procura.vendidos + quantidade;
    return true;
}

///Tarefa 9: Padronizar nomes
function formatarNome(texto) {

    let limpo = texto.trim();

    let primeira = limpo.charAt(0).toUpperCase();

    let resto = limpo.slice(1).toLowerCase();

    return primeira + resto;

}

///Tarefa 10: Salvar e recuperar em JSON

function converterParaJSON(produtos) {
    return JSON.stringify(produtos);
}

function lerJSON(texto) {
    return JSON.parse(texto);
}

///Tarefa 11: Relatorio geral do LariCel
function gerarRelatorio(nome, produtos){

    let valorTotal = calcularValorEstoque(produtos);
    let emFalta = produtosEmFalta(produtos, 5);

    console.log(`===== RELATÓRIO: ${nome.toUpperCase()} =====`);
    console.log(`Produtos cadastrados: ${produtos.length}`);
    console.log(`Valor total em estoque: R$ ${valorTotal}`);
    console.log(`Produtos com estoque baixo: ${emFalta.length}`);

    for (let k = 0; k < emFalta.length; k++) {
        console.log(`- ${emFalta[k].nome} (${emFalta[k].quantidade} un.)`);
    }
}

console.log("--- Tarefa 2: listar ---");

listarProdutos(produtos)

console.log("--- Tarefa 3: cadastrar ---");

let total = cadastrarProduto(produtos, "Carregador", "Conector", 30, 60);


console.log(`Produto cadastrado! Agora a loja tem ${total} produtos\n`);

console.log("--- Tarefa 4: valor do estoque ---");

let valor = calcularValorEstoque(produtos);

console.log(`Valor do estoque: R$${valor}\n`);

console.log("--- Tarefa 5: buscar ---");

let buscando = buscarProduto(produtos, "capinha de celular");

console.log(`${buscando === null? "Produto não encontrado" : `Encontrado: ${buscando.nome} - R$ ${buscando.preco}`}\n`);

console.log("--- Tarefa 6: em falta ---");

let emFalta = produtosEmFalta(produtos, 5);

console.log(`Produtos com menos de 5 unidades: ${emFalta.length}\n`);

console.log("--- Tarefa 7: Aplicação de desconto ---");

let quant = aplicarDesconto(produtos, "Dispositivo Movel", 10);

let mudado = buscarProduto(produtos, "celular");

console.log(`${quant} produtos receberam desconto \nNovo preço do Celular: R$${mudado.preco}\n`);

console.log("--- Tarefa 8: registra vendas feitas ---");

if (registrarVenda(produtos, "Celular", 3)) {

    let vendido = buscarProduto(produtos, "Celular");

    console.log(`Venda realizada! ${vendido.nome}: ${vendido.quantidade} un. em estoque, ${vendido.vendidos} vendidos.\n`);
}

if (registrarVenda(produtos, "Monitor", 10) === false) {

    console.log("Venda não realizada: estoque insuficiente ou produto inexistente.\n");
}

console.log("--- Tarefa 9: formatar nome ---");

console.log(formatarNome(`CapiNha de SiLiCone`));

console.log("\n--- Tarefa 10: Salvar e recuperar em JSON ---");

let textoJSON = converterParaJSON(produtos);
console.log(typeof textoJSON);

let recuperados = lerJSON(textoJSON);
console.log(`Itens recuperados: ${recuperados.length} | Primeiro: ${recuperados[0].nome}`);

console.log("--- Tarefa 11: relatório ---");
gerarRelatorio(nomeLoja, produtos);