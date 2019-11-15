// dependency for inquirer npm package
let inquirer = require("inquirer");

// constructor function used to create programmers objects
function Programmer(product, quantity) {
  this.product = product;
  this.quantity = quantity;
}

// creates the printInfo method and applies it to all programmer objects
Programmer.prototype.printInfo = function() {
  console.log("Product Id: " + this.product + "\nQuantity: " + this.quantity);
};

// runs inquirer and asks the user a series of questions whose replies are
// stored within the variable answers inside of the .then statement.
inquirer
  .prompt([
    {
      name: "product",
      message: "What is the product ID number, you would like to purchase?"
    },
    {
      name: "quantity",
      message: "How many units would you like to buy?"
    }
  ])
  .then(function(answers) {
    // initializes the variable newProgrammer to be a programmer object which will take
    // in all of the user's answers to the questions above
    var newProgrammer = new Programmer(answers.product, answers.quantity);
    // printInfo method is run to show that the newProgrammer object was successfully created and filled
    newProgrammer.printInfo();
  });
