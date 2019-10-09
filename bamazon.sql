DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product VARCHAR(45) NULL,
    department VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    quantity INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product, department, price, quantity)
VALUES ("Nu Me Curling Wand", "Health and Beauty",125.00, 50);

INSERT INTO products (product, department, price, quantity)
VALUES ("Elastic Exercise Bands", "Sports and Outdoors",10.95, 600);

INSERT INTO products (product, department, price, quantity)
VALUES ("Pet Grooming Brush", "Pet Supplies",10.63, 88);

INSERT INTO products (product, department, price, quantity)
VALUES ("Silicon Baking Cups", "Kitchen and Dining",8.56, 1200);

INSERT INTO products (product, department, price, quantity)
VALUES ("Fujifilm Instax Mini Instant Film Value Pack", "Cameras and Photo",30.90, 400);

INSERT INTO products (product, department, price, quantity)
VALUES ("The Handmaid's Tale", "Books",7.99, 250);

INSERT INTO products (product, department, price, quantity)
VALUES ("Play-Doh Modeling Compound 10-Pack", "Toys and Games",7.99, 500);

INSERT INTO products (product, department, price, quantity)
VALUES ("$10 Xbox Gift Card", "Video Games",10.00, NULL);

INSERT INTO products (product, department, price, quantity)
VALUES ("Echo Dot (3rd Gen) - Charcoal", "Electronics",49.99, 1000);

INSERT INTO products (product, department, price, quantity)
VALUES ("Columbia Youth Boys' Fleece Jacket", "Clothing",52.99, 150);