const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const options = {
    origin: "http://localhost:3000",
    credentials: true,
}
app.use(cors(options));
app.use(cookieParser());
const metarRouter = require('./routes/metar');
const authRouter = require('./routes/auth');
const session = require('express-session');
const passport = require('passport');
const port = 4000;

app.listen(port);
app.use(session({
    secret: "ILOVEEXPRESS",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 360000}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/metar', metarRouter);
app.use('/auth', authRouter);