var mysql = require("mysql");
var inquirer = require("inquirer");
var asTable = require('as-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  // start(); 
  connection.query("SELECT * from products", 
    function (err, result, fields) {
      if (err) throw err;
      console.log(asTable(result));
    });
function mayIHelpYou(){
    inquirer.prompt([
      {
        type: 'input',
        name: 'ID',
        message: 'Enter ID of the product you would like to buy:'
      }, {
        type: 'input',
        name: 'ID',
        message: 'How many units?'
      }
    ]).then (function (placeOrder){
      if "placeOrder.ID > "git 

  });
}
