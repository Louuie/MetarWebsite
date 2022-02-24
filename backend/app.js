const express = require('express');
const metarRouter = require('../backend/routes/metar');
const app = express();
const cors = require('cors');
const port = 4000;

app.listen(port);
app.use(cors())

app.use('/metar', metarRouter);