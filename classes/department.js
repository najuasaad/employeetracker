
class Department {
    constructor (connection) {
        this.connection = connection;
    }   

    addDBDepartment(deptname){          //adds new table
        this.connection.query("INSERT INTO department SET ?", 
        { name: deptname },
        (err, res) => {
            if (err){
                console.log(err);
                throw err;
            }
            return true;
        });
    }
}

module.exports = Department