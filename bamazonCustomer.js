const mysql = require("mysql");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "dance",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  runBamazon();
});

let runBamazon = function() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Welcome to Bamazon, What would you like to do?",
      choices: ["Display all items available for sale", "Place an order"]
    })
    .then(function(answer) {
      if (answer.action == "Display all items available for sale") {
        displayItems();
      } else {
        placeOrder();
      }
    });
};

// display all items for sale
let displayItems = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
  });
  runBamazon();
};

// in place order, there will also be an inquirer prompt
let placeOrder = function() {
  inquirer
    .prompt([
      {
        name: "order",
        type: "input",
        message: "What is the id of the product?",
        validate: function(value) {
          if (isNaN(value) == false) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?",
        validate: function(value) {
          if (isNaN(value) == false) {
            return true;
          } else {
            return false;
          }
        }
      }
    ])
    .then(function(answer) {
      //if id === id && amount <= amount in db in the available to purchase then allow purchase.
      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
          if (
            res[i].order == parseInt(answer.order) &&
            res[i].quantity > parseInt(answer.quantity)
          ) {
            let query = "UPDATE products SET ? WHERE ?";
            connection.query(query, [answer.quantity, answer.order]);
          }
        }
      });

      // else if - unable to process order

      // for (let i = 0; i < res.length; i++) {
      //   if (res[i].id == parseInt(answer.order)) {
      //     if (res[i].quantity >= parseInt(answer.quantity)) {
      //       connection.query("UPDATE products SET ? WHERE ?", [
      //         {
      //         }
      //       ], function(err, res){
      //         console.log("Order successfully placed!")
      //         runBamazon()
      //       }
      //     } else {
      //       console.log("Insufficient quantity! Order was not placed");
      //       runBamazon();
      //     }
      //   } else {
      //     console.log(
      //       "Sorry this is not an id available for order, currently."
      //     );
      //     runBamazon();
      //   }
      // }
    });
};
