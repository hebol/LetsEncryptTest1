'use strict';

require('letsencrypt-express').create({

  server: 'staging'

  , email: 'info@optires.se'

  , agreeTos: true

  , approveDomains: [ 'www.optires.se' ]

  , app: require('express')().use('/', function (req, res) {
    res.end('Hello, World!');
  })

}).listen(80, 443);