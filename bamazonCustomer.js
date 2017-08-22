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
connection.connect(function(err){
  if (err) throw err;
  takeOrder();
});

// function which takes in customer request
function takeOrder() { 
// query the database for all items available
connection.query("SELECT * FROM products", function (err, results) {
  if (err) throw err;
  console.log(asTable(results));
  // once you have the items, prompts the user for productID and qty desired
  inquirer
    .prompt([
      {
        name: 'choice',
        type: 'input',
        message: 'Enter ID of product you would like to buy:'
      },
      {
        name: 'qty',
        type: 'input',
        message: 'How many units to buy?',
        validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
          return false;
        }
      }
    ])
    .then(function(answer) {  
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[ i ].item_id === answer.choice) {
          chosenItem = results[ i ];
          console.log(results[i]);
        }
      }
      // if qty requested is available
      if (chosenItem.stock_quantity > parseInt(answer.qty)) {
        // quantity requested was available, so update db, let the user know, and start over
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: ((chosenItem.stock_quantity) - (parseInt(answer.qty)))
            },
            {
              id: chosenItem.id
            }
          ],
          function (error) {
            if (error) throw err;
            console.log("Your total: $");
            takeOrder();
          }
        );
      }
      else {
        // bid wasn't high enough, so apologize and start over
        console.log("Insufficient quantity! Try again...");
        takeOrder();
      }
    });
  });
}