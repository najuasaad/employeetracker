//             requires
const inquirer = require('inquirer')
const mysql = require('mysql')
const myData = require('./root')
const Employee = require('./classes/employee')
const Role = require('./classes/role')
const Department = require('./classes/department')

//           create connection
const connection = mysql.createConnection(myData)

//           sql function for queries -- call to begin 
const sqlConnect = () => {
  connection.connect((err) => {
      if (err) throw err;
      // console.log(`connected as id ${connection.threadId}`);
  })
  homePage(); 
}

//          arrays for propagating
const departmentOp = []
const departmentSift = []
const roleOp = []
const roleSift = []
const employeeOp = []
const employeeSift = []

//          inquirer questions
const home = [
  {
    type: 'list',
    message: 'What would you like to do now?',
    name: 'chooser',
    choices: [ 
      'add department',
      'add role',
      'add employee',
      'view department',
      'view role',
      'view employee',
      'update employee role',
      'delete department',
      'delete role',
      'delete employee',
    ]
  },
]

//           'home' page of options        
const homePage = () => {
  inquirer.prompt(home)
  .then(function(response){
    console.log("You have chosen " + response.chooser)
    if (response.chooser === 'add department') {
      addDepartment()
    } else if (response.chooser === 'add role') {
      addRole()
    } else if (response.chooser === 'add employee') {
      addEmployee()
    } else if (response.chooser === 'update employee role') {
      updateEmployeeRole();
    } else if (response.chooser === 'delete department') {
      whichDepartmentDeletes()
    } else if (response.chooser === 'delete role') {
      whichRoleDeletes()
    } else if (response.chooser === 'delete employee') {
      whichEmployeeDeletes()
    } else if (response.chooser === 'view department') {
      viewDBDepartment()   
    } else if (response.chooser === 'view role') {
      viewDBRoles();  
    } else {
      viewDBEmployees();  
    } 
  })
}

const mainMenu = () => {
  inquirer.prompt([{
    type: 'list',
    message: 'To perform another action:',
    name: 'mainMenu',
    choices: ['return to main menu']
  }]).then(function(response){
    if (response.mainMenu === 'return to main menu') { homePage(); } 
  })
}

//            functions handling 'home' page options

/* departments */
  //add through class
const addDepartment = () => {       // name
  inquirer
    .prompt([{
      type: 'input',
      message: 'What department would you like to add?',
      name: 'newDepartment'
  }])
  .then(function(response){
      let newDep = new Department(connection);
      newDep.addDBDepartment(response.newDepartment);
      console.log('New Department added!')
      mainMenu();
  })
}

  //view
const viewDBDepartment = () => {
  connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      console.log(" ")
      console.table(res)
      mainMenu();
  })
}

  //delete functions
const whichDepartmentDeletes = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    res.forEach(( item ) => {
      departmentOp.push(item.name);
      departmentSift.push(item)
    });
    nowChoose()
  })
}

const nowChoose = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Which department would you like to delete?',
      name: 'delDep',
      choices: departmentOp
    }
  ])
  .then(function(response){
    let doneFor = response.delDep
    deleteDepartment(doneFor)
  })
}

const deleteDepartment = (doneFor) => {
  connection.query(`DELETE FROM department WHERE name = "${doneFor}"`)
  console.log("Department deleted!")
  mainMenu();
}

/* roles */
  // add through class, first grab department list for inquirer
const addRole = () => {       // start with addRole to grab variables, then getRole()
  connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      res.forEach(( item ) => {
        departmentOp.push(item.name);
        departmentSift.push(item)
      });
      getRole()
  })
}

const getRole = () => {       // title, salary, dept id
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the title of the role being added?',
      name: 'roleTitle'
    },
    {
      type: 'input',
      message: 'What is the salary of the role being added?',
      name: 'roleSalary'
    },
    {
      type: 'list',
      message: 'Which department is this role in?',
      choices: departmentOp,
      name: 'department'
    }
  ])
  .then(function(response){
    let title = response.roleTitle
    let salary = response.roleSalary
    let department = response.department
    let obj = departmentSift.find(obj => obj.name === department)
    let department_id = obj.id

    let newRole = new Role(connection)
    newRole.addDBRole( title, salary, department_id );
    console.log('New Role added!')
    mainMenu();
  })
}

  // view
const viewDBRoles = () => {
  connection.query('SELECT role.id AS id, role.title AS title, role.salary AS salary, department.name AS department, department.id AS deptId FROM role LEFT JOIN department ON role.department_id = department.id;', (err, res) => {
      if (err) throw err;
      console.log(" ")
      console.table(res)
      mainMenu();
  })
}

  // delete functions
const whichRoleDeletes = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    res.forEach(( item ) => {
      roleOp.push(item.title);
      roleSift.push(item)
    });
    nowChooseRole()
  })
}

const nowChooseRole = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Which role would you like to delete?',
      name: 'delRole',
      choices: roleOp
    }
  ])
  .then(function(response){
    let doneFor = response.delRole
    deleteRole(doneFor)
  })
}

const deleteRole = (doneFor) => {
  connection.query(`DELETE FROM role WHERE title = "${doneFor}"`)
  console.log("Role deleted!")
  mainMenu();
}

/* employees */
  // add with class after grabbing roles and manager options for inquirer
const addEmployee = () => {
  connection.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
      res.forEach(( role ) => {
          roleOp.push(role.title);
          roleSift.push(role)
      });
  })
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    res.forEach(( employee  ) => {
        employeeOp.push(employee.first_name + " " + employee.last_name)
        employeeSift.push(employee)
    });
    getEmployee()
  })
}

const getEmployee = () => {        // first name, last name, role id, manager id
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the employee's first name?",
      name: 'first_name'
    },
    {
      type: 'input',
      message: "What is the employee's last name?",
      name: 'last_name'
    },
    {
      type: 'list',
      message: "What is the employee's role?",
      choices: roleOp,
      name: 'roleTitle'
    },
    {
      type: 'list',
      message: "Who is the employee's manager?",
      choices: employeeOp,
      name: 'managerId'
    }
  ])
  .then(function(response){
    // declare all answers as variables, name remains the same
    let first_name = response.first_name
    let last_name = response.last_name
    let role_name = response.roleTitle
    let manager_name = response.managerId 
    let obj = roleSift.find(obj => obj.title === role_name)
    let obj2 = employeeSift.find(obj => obj.first_name + " " + obj.last_name === manager_name)
    let role_id = obj.id
    let manager_id = obj2.id
    // go through array and find the role_name and manager_name and grab the ids that match

    let newEmployee =new Employee(connection) 
    newEmployee.addDBEmployee(first_name, last_name, role_id, manager_id)
    console.log('New Employee added!')
    mainMenu();
  })
}

  // view
const viewDBEmployees = () => {
  connection.query('SELECT employee.id AS id, employee.first_name AS first, employee.last_name AS last, role.title AS title, role.salary AS salary, employee.manager_id AS managerId, department.name AS department FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;', (err, res) => {
      if (err) throw err;
      console.log(" ")
      console.table(res)
      mainMenu();
  })
}

  // update functions
const updateEmployeeRole = () => {
  connection.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
      res.forEach(( role ) => {
          roleOp.push(role.title);
          roleSift.push(role)
      });
  })
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    res.forEach(( employee  ) => {
        employeeOp.push(employee.first_name + " " + employee.last_name)
        employeeSift.push(employee)
    });
    getUpdate()
  })
}

const getUpdate = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Choose an employee to update:',
      choices: employeeOp,
      name: 'upEmp'
    },
    {
      type: 'list',
      message: "What is the employee's new role?",
      choices: roleOp,
      name: 'roleTitle'
    },
  ])
  .then(function(response){
    let emp = response.upEmp
    let roleup = response.roleTitle
    let obj = roleSift.find(obj => obj.title === roleup)
    let personObj = employeeSift.find(obj => obj.first_name + " " + obj.last_name === emp)
    let role_id = obj.id
    let emp_id = personObj.id

    commitUpdate(role_id, emp_id);
  })
}

const commitUpdate = (role_id, emp_id) => {
  connection.query(`UPDATE employee SET role_id = ${role_id} WHERE id = ${emp_id}`, (err, res) => {
    if (err) throw err;
    console.log("Employee updated!")
    mainMenu();
  })
}

  // delete functions
const whichEmployeeDeletes = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    res.forEach(( item ) => {
      employeeOp.push(item.first_name + " " + item.last_name);
      employeeSift.push(item)
    });
    nowChooseEmployee()
  })
}

const nowChooseEmployee = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Which employee would you like to delete?',
      name: 'delEmp',
      choices: employeeOp
    }
  ])
  .then(function(response){
    let doneFor = response.delEmp
    let obj = employeeSift.find(obj => obj.first_name + " " + obj.last_name === doneFor)
    let emp_id = obj.id
    deleteEmployee(emp_id)
  })
}

const deleteEmployee = (emp_id) => {
  connection.query(`DELETE FROM employee WHERE id = ${emp_id}`)
  console.log("Role deleted!")
  mainMenu();
}

sqlConnect();



// department class
    //id
    //name 

// role class 
    //id
    //title
    //salary
    //dept id

// employee class  
    //first
    //name
    //role_id
    //manager id

    