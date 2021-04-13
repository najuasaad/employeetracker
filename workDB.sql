DROP DATABASE IF EXISTS workDB;

CREATE DATABASE workDB;

USE workDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2), 
    department_id INTEGER(8),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(8), -- role_id (int to hold ref to role employee has) --
    manager_id INTEGER(8), -- manager_id (INT to hold ref to another employee that manages that employee, an id value from the same table)
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Accounting");
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 60000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesman", 50000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Michael", "Scott", 2); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Stanley", "Hudson", 2, 1); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Angela", "Martin", 1, 1)