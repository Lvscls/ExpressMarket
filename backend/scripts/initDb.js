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
        description TEXT
      )`);
      
      const productsData = [
        { name: "Chargeur", category_id: 3, price: 30, description: "Un chargeur rapide pour vos appareils électroniques." },
        { name: "iPhone 15", category_id: 1, price: 999, description: "Le dernier iPhone avec des fonctionnalités révolutionnaires." },
        { name: "iPad 2", category_id: 4, price: 400,  description: "Une tablette puissante pour la productivité et les loisirs." },
        { name: "Airpods", category_id: 2, price: 120, description: "Des écouteurs sans fil pour une expérience audio sans effort." },
        { name: "Apple watch", category_id: 5, price: 124, description: "Une montre intelligente pour suivre votre activité et rester connecté." },
        { name: "Airpods pro max", category_id: 2, price: 459, description: "La version haut de gamme des écouteurs Airpods avec une qualité audio exceptionnelle." },
        { name: "iPhone 14", category_id: 1, price: 800,  description: "Une mise à jour élégante et puissante de l'iPhone." },
        { name: "Airpods 2", category_id: 2, price: 229,  description: "La deuxième génération des écouteurs Airpods avec une meilleure autonomie et une connexion plus stable." },
        { name: "Apple vision pro", category_id: 5, price: 2500, description: "Un écran haute définition pour des performances visuelles exceptionnelles." },
        { name: "Coque", category_id: 5, price: 28.99, description: "Une coque de protection élégante pour votre appareil Apple." }
      ];
      

  const insertProduct = db.prepare('INSERT INTO Products (name, category_id, price, description) VALUES (?, ?, ?, ?)');
  productsData.forEach(product => {
    insertProduct.run(product.name, product.category_id, product.price, product.description);
  });
  insertProduct.finalize();

  db.run(`CREATE TABLE IF NOT EXISTS ProductImages (
    id INTEGER PRIMARY KEY,
    product_id INTEGER,
    image_path TEXT,
    FOREIGN KEY(product_id) REFERENCES Products(id)
)`);

    const productImagesData = [
    { product_id: 1, image_path: "chargeur.png" },
    { product_id: 2, image_path: "iphone15.png" },
    { product_id: 3, image_path: "ipad2.png" },
    { product_id: 4, image_path: "airpods.png" },
    { product_id: 5, image_path: "applewatch.png" },
    { product_id: 6, image_path: "airpodspro.png" },
    { product_id: 7, image_path: "iphone14.png" },
    { product_id: 8, image_path: "airpods2.png" },
    { product_id: 9, image_path: "applevisionpro.png" },
    { product_id: 10, image_path: "coque.png" },
    { product_id: 2, image_path: "iphone15-2.png" },
    ];

    const insertProductImage = db.prepare('INSERT INTO ProductImages (product_id, image_path) VALUES (?, ?)');
    productImagesData.forEach(productImage => {
    insertProductImage.run(productImage.product_id, productImage.image_path);
    }
    );

    insertProductImage.finalize();

  
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

    db.run(`CREATE TABLE IF NOT EXISTS CspReports (
      id INTEGER PRIMARY KEY,
      documentUri TEXT,
      referrer TEXT,
      violatedDirective TEXT,
      blockedUri TEXT,
      originalPolicy TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

});

db.close();

