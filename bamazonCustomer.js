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
        runBamazon();
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
    console.log("Click any letter button to return back to the main menu");
  });
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
      connection.query(
        `SELECT * FROM products WHERE ?`,
        [
          {
            id: answer.order
          }
        ],
        function(err, product) {
          if (err) throw err;

          if (product[0].quantity >= answer.quantity) {
            cashOut(product, answer.quantity);
          } else {
            console.log("Out of Stock");
            setTimeout(displayItems, 5000);
            return;
          }
        }
      );
    });
};

function cashOut(product, quantity) {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Are you sure?",
        name: "confirm"
      }
    ])
    .then(ans => {
      if (ans.confirm) {
        connection.query(
          `UPDATE products SET quantity = quantity - ${quantity} WHERE id = ${product[0].id}`
        );
        console.log(
          `Thanks for shopping enjoy, your new ${product[0].product}`
        );
        connection.end();
      } else {
        return connection.end();
      }
    });
}
