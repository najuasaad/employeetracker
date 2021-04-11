const mysql = require('mysql')
const myData = require('../root')

const connection = mysql.createConnection(myData)

class Department {
    constuctor (name) {
        this.name = name
    }   
    addDBDepartment(){          //adds new table
        const afterConnection = () =>{   
            connection.query('INSERT INTO department VALUES (${data.newDepartment})', (err, res) => {
                if (err) throw err;
                connection.end()
            }
            )
            connection.end
        }
        
        connection.connect((err) => {
            if (err) throw err;
            afterConnection()
        });
    }
}

module.exports = Department