const mysql = require('mysql')
const myData = require('./root')
const role = require('./role')

const connection = mysql.createConnection(myData)

class Employee {
    constuctor (name) {
        this.name = name
    }   
    addEmployee(){             //adds new table
        connection.query(
            'INSERT INTO employee VALUES (first_name, last_name, role_id, manager_id)', (err, res) => {
                if (err) throw err;
                connection.end()
            }
        )
    }
    updateEmployee(){
        connection.query(
            ''
        )
    }
}

connection.connect((err) => {
    if (err) throw err;
    addDepa()
});

module.exports = Employee