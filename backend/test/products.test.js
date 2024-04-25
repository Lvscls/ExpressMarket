const assert = require('assert');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const csrf = require('csrf');

const router = require('../manageProducts'); 

const app = express();
app.use(bodyParser.json());
app.use('/', router);
const tokens = new csrf();
const secret = 'secret'; 

const csrfToken = tokens.create(secret);

describe('Test de l\'API de gestion des produits', function() {

  it('Devrait ajouter un nouveau produit', function(done) {
    request(app)
      .post('/')
      .set('x-csrf-token', csrfToken)
      .send({
        name: 'Nouveau Produit',
        category_id: 1,
        price: 10.99,
        description: 'Description du nouveau produit',
        images: ['image1.jpg', 'image2.jpg']
      })
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, "Produit ajouté avec l'ID: 16");
        done();
      });
  });

  it('Devrait mettre à jour un produit existant', function(done) {
    request(app)
      .put('/1')
      .set('x-csrf-token', csrfToken)
      .send({
        name: 'Produit Mis à Jour',
        category_id: 2,
        price: 15.99,
        description: 'Nouvelle description du produit mis à jour'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, "Produit avec l'ID 1 modifié");
        done();
      });
  });

  it('Devrait supprimer un produit existant', function(done) {
    request(app)
      .delete('/1')
      .set('x-csrf-token', csrfToken)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, "Produit avec l'ID 1 supprimé");
        done();
      });
  });
});
