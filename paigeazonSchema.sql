DROP DATABASE IF EXISTS paigeazon_db;

CREATE DATABASE paigeazon_db;

USE paigeazon_db;

CREATE TABLE products (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(5) NOT NULL,
    PRIMARY KEY (item_id)
    );

USE paigeazon_db;

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Krispy Kreme Coffee", "Food & Non-Alcoholic Beverages", 12.05, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Coke Zero", "Food & Non-Alcoholic Beverages", 1.55, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Whispering Angel", "Wine", 19.80, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Nobilo", "Wine", 11.85, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Tank Top", "Clothing", 6.15, 27);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Maxi Dress", "Clothing", 31.50, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("The Brady Bunch Party Game", "Toys & Games", 13.95, 9);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Crate Creatures", "Toys & Games", 6.55, 3);

