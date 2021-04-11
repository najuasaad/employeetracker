const mysql = require('mysql')
const myData = require('./root')
const dep = require('./department')

const connection = mysql.createConnection(myData)

class Role {
    constuctor (name) {
        this.name = name
    }   
    addRole(){             //adds new table
        connection.query(
            'INSERT INTO role VALUES (title, salary, dept_id)', (err, res) => {
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

module.exports = Role