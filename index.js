//        requires
const inquirer = require('inquirer')
const work = require('./work')
const Employee = require('./classes/employee')
const Role = require('./classes/role')
const Department = require('./classes/department')


//        inquirer questions
const initQuestions = [
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
      'update employee',
    ]
  },
]

const departmentQuestions = [
  {
    type: 'input',
    message: 'What department would you like to add?',
    name: 'newDepartment'
  }
]

const employeeQuestions = [
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
    choices: viewRoles(),
    name: 'roleTitle'
  },
  {
    type: 'list',
    message: "Who is the employee's manager?",
    choices: viewEmployees(),
    name: 'managerId'
  }
]

const roleQuestions = [
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
    choices: viewDepartments(),
    name: 'department'
  }
]

//        'home' page of options        
const init = () => {
  inquirer.prompt(initQuestions)
  .then(function(response){
    if (response.chooser === 'add department') {
      addDepartment()
    } else if (response.chooser === 'add role') {
      addRole()
    } else if (response.chooser === 'add employee') {
      addEmployee()
    } else if (response.chooser === 'view department') {
      work.viewDBDepartment()
    } else if (response.chooser === 'view role') {
      work.viewDBRoles()
    } else if (response.chooser === 'view employee') {
      work.viewDBEmployees()
    } else {
      updateEmployee()
    }
  })
}

//          functions handling 'home' page options
const addDepartment = () => {       // name
  inquirer.prompt(departmentQuestions)
  .then(function(response){
      let newDep = new Department(response.newDepartment)
      newDep.addDBDepartment();
      init();
        //run required function that stores this to db
        // run addName(newDep)
  })
}

const addRole = () => {       // title, salary, dept id, 
  inquirer.prompt(roleQuestions)
  .then(function(response){
    let title = response.roleTitle
    let salary = response.roleSalary
    let department = response.department
    department = department.id
    let newRole = new Role(title, salary, department)
    newRole.addDBRole();
    init();
  })
}

const addEmployee = () => {      // first name, last name, role id, manager id
  inquirer.prompt(employeeQuestions)
  .then(function(response){
    let first_name = response.first_name
    let last_name = response.last_name
    let role_id = response.roleTitle
    let manager_id = response.managerId
    let newEmployee =new Employee(first_name, last_name, role_id, manager_id)
    newEmployee.addDBEmployee
  })
}

const updateEmployee = () => {

}

const handleDepChoice = () => {
  let choices = work.viewDBDepartment();
  choices.filter()
}



// department class
    //id
    //name //add name //view name

// role class // require department class
    //id
    //title
    //salary
    //dept id

// employee class  //require role class
    //id
    //first
    //name
    //role_id
    //manager id