const express = require('express');
const app = express();

const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg');
const clientPool = new Pool({connectionString: connectionString});

const port = process.env.PORT || 8080;
app.listen(port);

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views'); // set up ejs for rendering html pages
app.set('view engine', 'ejs');