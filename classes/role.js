
class Role {
    constructor (connection) {
        this.connection = connection;
    }   
    addDBRole(title, salary, department_id){          //adds new table
        this.connection.query("INSERT INTO role SET ?",
        { title: title, salary: salary, department_id: department_id },
        (err, res) => {
            if (err) throw err;
            return true;
        })
    } 
}

module.exports = Role
