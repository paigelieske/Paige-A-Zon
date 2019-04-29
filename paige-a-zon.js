var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "paigeazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    inventory();
});

function inventory() {
    console.log("Welcome to Paige-a-Zon");
    console.log("We have the following items: ");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var display = new table({
            head: ["Item ID", "Product Name", "Department", "Price", "In Stock"],
            colWidths: [10, 30, 30, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            display.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]);
        }
        console.log(display.toString());
        purchase();
    })
};

function purchase() {
    inquirer
        .prompt([
            {
                name: "purchaseID",
                type: "input",
                message: "What is the ID of the item you would like to purchase? [Quit with Q]"
            }
            // {
            //     name: "quantity",
            //     type: "input",
            //     message: "How many would you like"
            // }
        ])
        .then(function (answer) {
            var productToBuy = answer.purchaseID;
            if (productToBuy === "Q") {
                console.log("Come back soon!");
                connection.end();
            }
            else {
                inquirer.prompt({
                    name: "quantity",
                    type: "input",
                    message: "How many would you like?"
                })
                    .then(function (number) {
                        var qtyBuy = number.quantity;
                        // if (qtyBuy > 0 && qtyBuy < 1) {
                        //     console.log("You have purchased " + qtyBuy + " " + productToBuy);
                        // }
                        // else if (qtyBuy > 1) {
                        //     console.log("You have purchased " + qtyBuy + " " + productToBuy + "'s");
                        // }
                        // else {
                        //     console.log("I guess you changed your mind");
                        // }
                        makeSale(productToBuy, qtyBuy);
                    })
            }
        })
}

function makeSale(productToBuy, qtyBuy) {
    connection.query("SELECT * FROM products WHERE item_id = " + parseInt(productToBuy), function (err, res) {
        console.log(res[0].product_name);
        if (err) throw (err);
        if(qtyBuy <= res[0].stock_quantity) {
            console.log(qtyBuy);
            var total = res[0].price * qtyBuy;
            total = parseFloat(total);
            console.log("Your item is in stock.");
            console.log("The total for item number " + res[0].item_id + ", product " + res[0].product_name + ", is " + total + ".");
            // connection.query("UPDATE products SET stock_quantity = stock_quantity - ${qtyBuy} WHERE item_id = ${productToBuy}");
        }
        else {
            console.log("I'm sorry, we don't have enough stock to complete your order.  Please try again.");
        }
        connection.end();
    })
};
