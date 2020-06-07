const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no  banco de dados
const db = new sqlite3.Database("./src/database/database.db")


module.exports = db


// utilizar o objeto de banco de dados para nossas operações

db.serialize(() => {



    // 4- deletar dados da tabela

    db.run(`DELETE FROM places WHERE id = ?`, [], function(err){
        if (err) {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso")

    })
}) 