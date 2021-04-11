const mysql = require('mysql')
const myData = require('../root')

const connection = mysql.createConnection(myData)

class Role {
    constuctor (name) {
        this.name = name
    }   
    addDBRole(){          //adds new table
        const afterConnection = () =>{   // return department info as a table 
            connection.query(
                'INSERT INTO role VALUES (title, salary, dept_id)', (err, res) => {
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

module.exports = Role