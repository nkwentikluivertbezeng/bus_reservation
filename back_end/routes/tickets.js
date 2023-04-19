const { Router } = require('express');
const tickets = require('../controllers/ticket')
const app = Router();

app.get('/tickets', tickets);

module.exports = app;
