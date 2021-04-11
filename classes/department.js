const mysql = require('mysql')
const myData = require('./root')

const connection = mysql.createConnection(myData)

class Department {
    constuctor (name) {
        this.name = name
    }   
    addDepa(){             //adds new table
        connection.query('INSERT INTO department VALUES (${this.name})', (err, res) => {
                if (err) throw err;
                connection.end()
            }
        )
    }
}

connection.connect((err) => {
    if (err) throw err;
    addDepa()
});

module.exports = Department