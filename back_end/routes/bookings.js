const { Router } = require('express');
const bookings = require('../controllers/booking')
const app = Router();

app.get('/bookings', bookings);
app.post('/bookings',bookings)
module.exports = app;
