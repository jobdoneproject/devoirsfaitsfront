// server.js
import { ProceduralRenderer3 } from '@angular/core/src/render3/interfaces/renderer';

const express = require('express');
const app = express();

// Run the app by serving the static files
// in the dist directory

app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default
// CleverCloud or Heroku port


app.listen(process.env.PORT || 8080);
