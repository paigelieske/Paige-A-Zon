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

// var total = new Number(parseFloat(res[0].price * qtyBuy)).toFixed(2)

function inventory() {
    console.log("Welcome to Paige-a-Zon");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var display = new table({
            head: ["Item ID", "Product Name", "Department", "Price", "In Stock"],
            colWidths: [10, 30, 30, 15, 10]
        });
        for (var i = 0; i < res.length; i++) {
            res[i].price = new Number(parseFloat(res[i].price)).toFixed(2);
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
        ])
        .then(function (answer) {
            var productToBuy = answer.purchaseID;
            if (productToBuy == "Q" || productToBuy == "q") {
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
                        makeSale(productToBuy, qtyBuy);
                    })
            }
        })
}

function makeSale(productToBuy, qtyBuy) {
    connection.query("SELECT * FROM products WHERE item_id = " + parseInt(productToBuy), function (err, res) {
        console.log("Checking stock for item " + res[0].product_name + ".......");
        if (err) throw (err);
        if (qtyBuy <= res[0].stock_quantity) {
            // console.log(qtyBuy);
            var total = new Number(parseFloat(res[0].price * qtyBuy)).toFixed(2);
            console.log("Congratulations - your item is in stock.");
            console.log("The total for item number " + res[0].item_id + ", product " + res[0].product_name + ", is $" + total + ".");
            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [res[0].stock_quantity - qtyBuy, productToBuy], function (err) {
                if (err) throw (err);
            });
        }
        else {
            console.log("I'm sorry, we don't have enough stock to complete your order.  Please try again.");
        }
        inventory();
        // connection.end();
    })
};
