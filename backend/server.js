const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const wantedRoutes = require('./routes/wantedRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();
const PORT = process.env.PORT || 4000;
const ORIGIN = 'http://localhost:3000' // CHANGE THIS IF YOU WANT.

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());



// database connection
const dbURI = '' // put your db URI here
mongoose.connect(dbURI, { useNewUrlParser:  true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then((result) => {
      app.listen(PORT);
      console.log('Database Connected.');
      console.log(`Listening on port ${PORT}`);
    })
    .catch((err) => console.log(err));


// app routes
app.use(wantedRoutes);
app.use(authRoutes);