'use strict';

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/monorail_test';

const mongodb = require('mongodb').MongoClient;

const validator = require('validator');

const seneca = require('seneca')({
  tag: 'lookups'
});

seneca.use('mesh', {
  pin: 'role:lookups',
  bases: ['127.0.0.1']
});

seneca.add('role:lookups,cmd:findByTerm', (msg, done) => {

  mongodb.connect(MONGODB_URL, (err, db) => {
    if (err) return done(err);
    const query = {};
    const isString = typeof msg.term === 'string';
    if (isString && validator.isIP(msg.term)) query.ipAddress = msg.term;
    else if (isString && validator.isMongoId(msg.term)) query.node = msg.term;
    else if (msg.term) query.macAddress =
      (Array.isArray(msg.term) ? msg.term : [msg.term]).map((term) => term.toLowerCase());
    db.collection('lookups').find(query).toArray((err, docs) => {
      db.close();
      done(err, docs);
    });
  });
});

seneca.ready(() => {
  console.log('lookups:', seneca.id);
});
