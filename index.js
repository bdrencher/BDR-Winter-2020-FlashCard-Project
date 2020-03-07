const express = require('express');
const app = express();
const port = process.env.PORT || 8888;

app.listen(port);

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views'); // set up ejs for rendering html pages
app.set('view engine', 'ejs');