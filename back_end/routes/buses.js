const { Router } = require('express');
const {buses} = require('../controllers/buses')
const app = Router();

app.get('/buses', buses);
app.post('/buses', buses);
module.exports = app;
