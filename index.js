const express = require('express');
const pool = require('pg');
const app = express();
const connectionString = process.env.DATABASE_URL || "postgres://vbwooxkbxkjvbz:f8a15944d000f50dbcc8c2d1370bbd56d31533e2dd90ddfb61381b9dc2b84e8b@ec2-23-22-156-110.compute-1.amazonaws.com:5432/d9mfcl4vbslvf5?ssl=true";
const port = process.env.PORT || 8080;
clientPool = new pool({connectionString: connectionString});

app.listen(port);

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views'); // set up ejs for rendering html pages
app.set('view engine', 'ejs');