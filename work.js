const mysql = require('mysql')
const myData = require('./root')

const connection = mysql.createConnection(myData)

const viewDBDepartment = () => {
    const afterConnection = () =>{   // return department info as a table 
        connection.query('SELECT * FROM department', (err, res) => {
            if (err) throw err;
            console.table(res)
            return res
        })
        connection.end
    }
    
    connection.connect((err) => {
        if (err) throw err;
        afterConnection()
    });
}

const viewDBRoles = () => {
    const afterConnection = () =>{   // return toles info as a table 
        connection.query('SELECT * FROM roles', (err, res) => {
            if (err) throw err;
            console.table(res)
            return res
        })
        connection.end
    }
    
    connection.connect((err) => {
        if (err) throw err;
        afterConnection()
    });
}

const viewDBEmployees = () => {
    const afterConnection = () =>{   // return employee info as a table 
        connection.query('SELECT * FROM employees', (err, res) => {
            if (err) throw err;
            console.table(res)
            return res
        })
        connection.end
    }
    
    connection.connect((err) => {
        if (err) throw err;
        afterConnection()
    });
}

// whenever something new is saved to sql, do a fresh pull and save to   

module.exports = { viewDBDepartment, viewDBRoles, viewDBEmployees }