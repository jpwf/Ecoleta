// requerimento do arquivo de servidor express
const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta pública
server.use(express.static("public"))
// habilitar o uso do rq.body(corpo do nosso formulário) na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// utilizando template engine

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
    watch: true
})
nunjucks.configure("public/scripts", {
        watch: true,
        noCache: true
})
nunjucks.configure("public/styles", {
    watch: true,
    noCache: true
})
// configurar caminhos da minha aplicação
// pagina inicial
// req: requisição
// res: resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    // console.log(req.query)
    
    return res.render("create-point.html")

    // req.query: query strings da nossa url

})
//Rota de envio do formulário
server.post("/savepoint", (req, res) => {

    // req.body: o corpo do nosso formulário
    //  console.log(req.body)

    // inserir dados no banco de
//Corpo da tabela vazia, pronta para receber valores
        const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (
                ?,?,?,?,?,?,?
            );
        `
//Associação dos valores do formulário com a tabela        
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]
// Função que trata erros. Caso não haja erro, retorna "Cadastrado com sucesso", seguido da própria tabela preenchida com os valores cadastrados pelo usuário
    function afterinsertdata(err) {
        if (err) {
            return console.log(err)
            return res.send("Erro de cadastro")
        }
        console.log("Cadastrado com sucesso")
        //printa no console o contexto do escopo, nesse caso o contexto é a própria tabela preenchida com valores do formulário
        console.log(this)
        //"Encadeiamento"  de scripts
        //Pois renderiza a página create-point com o método saved = true,
        //Na página create-point existe um bloco de condição, que caso o método saved seja true, ele renderiza a página "pointed-created"
        return res.render("create-point.html", { saved: true })
    

    }
    //Usa o banco de dados para rodar os objetos(tabela e valores da tabela) dentro da rota savepost, além de rodar a função de tratamento
    db.run(query, values, afterinsertdata)
     
    })

server.get("/search", (req, res) => {

    const search = req.query.search
    if(search == ""){
        // se pesquisa for igual a vazia:
            //renderiza a página search-results com 0 resultados
        return res.render("search-results.html", { total: 0 })
    }

    // pegar os dados no banco de dados
    //Seleciona tudo da tabela places que tenha o container city igual ao valor da pesquisa, passando erro e row(fileira) como parâmetros da função
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        //Se não houver erro, a constante total recebe o tamanho da fileira(quantidade de elementos) 
        const total = rows.length



        // mostra a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })





})

server.get("/adm", (req, res) => {
    return res.render("adm.html")
})

server.get("/root", (req, res) =>{
    return res.render("root.html")
})


const port = 4000

// ligar o servidor
server.listen(port, () =>{
    console.log(`Server running on port: ${port} `)
})


