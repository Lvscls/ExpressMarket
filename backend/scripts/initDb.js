const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category_id INTEGER,
    price REAL,
    image_path TEXT
  )`);

  const productsData = [
    { name: "Chargeur", category_id: 3, price: 30, image_path: "chargeur.jpg" },
    { name: "iPhone 15", category_id: 1, price: 999, image_path: "iphone15.jpg" },
    { name: "iPad 2", category_id: 4, price: 400, image_path: "ipad2.jpg" },
    { name: "Airpods", category_id: 2, price: 120, image_path: "airpods.jpg" },
    { name: "Apple watch", category_id: 5, price: 124, image_path: "applewatch.jpg" },
    { name: "Airpods pro max", category_id: 2, price: 459, image_path: "airpods_pro_max.jpg" },
    { name: "iPhone 14", category_id: 1, price: 800, image_path: "iphone14.jpg" },
    { name: "Airpods 2", category_id: 2, price: 229, image_path: "airpods2.jpg" },
    { name: "Apple vision pro", category_id: 5, price: 2500, image_path: "apple_vision_pro.jpg" },
    { name: "Coque", category_id: 5, price: 28.99, image_path: "coque.jpg" }
  ];

  const insertProduct = db.prepare('INSERT INTO Products (name, category_id, price, image_path) VALUES (?, ?, ?, ?)');
  productsData.forEach(product => {
    const imagePath = path.join(__dirname, 'images', product.image_path);
    insertProduct.run(product.name, product.category_id, product.price, imagePath);
  });
  insertProduct.finalize();
  
  db.run(`CREATE TABLE IF NOT EXISTS Categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  )`);

  const categoriesData = [
    { name: "Télephone" },
    { name: "Ecouteurs" },
    { name: "Chargeur" },
    { name: "Tablette" },
    { name: "Autre" }
  ];

  const insertCategory = db.prepare('INSERT INTO Categories (name) VALUES (?)');
  categoriesData.forEach(category => {
    insertCategory.run(category.name);
  });
  insertCategory.finalize();

    db.run(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

});

db.close();

