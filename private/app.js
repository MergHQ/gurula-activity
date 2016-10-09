'use strict';
const server = require('express')();
const Analyser = require('./analyser');

var analyser = new Analyser();

server.get('/summary', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Content-Type', 'application/json');
  res.send(analyser.getStats());
});

server.listen(80);