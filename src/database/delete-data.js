const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no  banco de dados
const db = new sqlite3.Database("./src/database/database.db")


module.exports = db


// utilizar o objeto de banco de dados para nossas operações

// 4- deletar dados da tabela
db.serialize(() => {

    db.run(`DELETE FROM places WHERE id = ?`, [44], 
        console.log("Registro deletado com sucesso")

    )

})
   