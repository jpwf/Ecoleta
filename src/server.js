// requerimento do arquivo de servidor express
const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

// confirugrar pasta pública
server.use(express.static("public"))
// habilitar o uso do rq.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// utilizando template engine

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
    watch: true
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

server.post("/savepoint", (req, res) => {

    // req.body: o corpo do nosso formulário
    //  console.log(req.body)

    // inserir dados no banco de dados
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
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]
    function afterinsertdata(err) {
        if (err) {
            return console.log(err)
            return res.send("Erro de cadastro")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true })
    

    }
    db.run(query, values, afterinsertdata)
     
    })

server.get("/search", (req, res) => {

    const search = req.query.search
    if(search == ""){
        // pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }


    

        
    


    // pegar os dados no banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }


        const total = rows.length



        // mostrat a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })





})

server.get("/adm", (req, res) => {
    return res.render("adm.html")
})

server.get("/root", (req, res) =>{
    return res.render("root.html")
})

server.get("/blocked", (req, res) =>{
    return res.render("blocked.html")
})

const port = 4000

// ligar o servidor
server.listen(port, () =>{
    console.log(`Server running on port: ${port} `)
})


