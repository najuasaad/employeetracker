
class Employee {
    constructor (connection) {
        this.connection = connection;
    }  
    addDBEmployee(first_name, last_name, role_id, manager_id){          //adds new table , role_id, manager_id
        this.connection.query("INSERT INTO employee SET ?",
        { first_name: first_name, last_name: last_name, role_id: role_id, manager_id: manager_id }, 
        (err, res) => {
                if (err) throw err;
                return true
        })
    } 
}

module.exports = Employee