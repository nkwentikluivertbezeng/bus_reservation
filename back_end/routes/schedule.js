const { Router } = require('express');
const schedules = require('../controllers/schedules')
const app = Router();

app.get('/schedules', schedules);
app.post('/schedules' , schedules);
app.delete('/schedule/:id', schedules);
module.exports = app;
