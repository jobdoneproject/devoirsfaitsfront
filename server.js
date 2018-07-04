// server.js
//import { ProceduralRenderer3 } from '@angular/core/src/render3/interfaces/renderer';

var fs = require('fs');
var http = require('http');
var https = require('https');

var options = {
  key: fs.readFileSync('ca.key', 'utf8'),
  cert: fs.readFileSync('ca.crt', 'utf8'),
  passphrase: 'Rickan1234'
};


//var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
console.log(app.routes);

//
//app.get('*', app.routes.index);
//// serve index and view partials
// app.get('/', routes.index);
// // redirect all others to the index (HTML5 history)
// app.get('*', routes.index);

app.get('/', function (req, res) { res.redirect('/index.html') });
//Gestion du CORS
//Dans le cas d'une execution de Angular sur un serveur différent du BackEnd !
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});



// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

// Start the app by listening on the default
// CleverCloud or Heroku port

httpServer.listen(process.env.PORT || 80);
httpsServer.listen(8443);

