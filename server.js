// server.js
//import { ProceduralRenderer3 } from '@angular/core/src/render3/interfaces/renderer';

var fs = require('fs');
var http = require('http');
var https = require('https');

var options = {
  key: fs.readFileSync('sslcert/private.key'),
  cert: fs.readFileSync('sslcert/certificate.crt')
};

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
// Add headers for CORS
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Request headers you wish to allow
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

// Start the app by listening on the default
// CleverCloud or Heroku port

httpServer.listen(process.env.PORT || 80);
httpsServer.listen(8443);

