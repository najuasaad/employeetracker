const mysql = require('mysql')
const myData = require('../root')

const connection = mysql.createConnection(myData)

class Employee {
    constuctor (name) {
        this.name = name
    }   
    addDBEmployee(){          //adds new table
        const afterConnection = () =>{   // return department info as a table 
            connection.query(
                'INSERT INTO employee VALUES (first_name, last_name, role_id, manager_id)', (err, res) => {
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

module.exports = Employee