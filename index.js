const mysql = require('mysql');
const root = require('./root.js')
const inquirer = require('inquirer')




connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    //afterConnection();
    connection.end();

  });