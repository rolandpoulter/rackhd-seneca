'use strict';

const API_PORT = process.env.API_PORT || 8000;

const express = require('express');

const seneca = require('seneca')({
  tag: 'api'
});

seneca.use('mesh', {
  isbase: true
});

const api = express();

api.get('/lookups/:term', (req, res) => {
  seneca.act({
    role: 'lookups',
    cmd: 'findByTerm',
    term: req.params.term
  }, (err, out) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(out);
  });
});

seneca.ready(() => {
  api.listen(API_PORT, () => {
    console.log('API listening on ', API_PORT);
  });
});
