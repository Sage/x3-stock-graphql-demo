const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const proxySettings = require('./proxy-settings');

const portNumber = process.argv[2] || 3000;
const server = express();

server.use(express.static(path.resolve('./build')));
server.use('/demo', proxy(proxySettings));

server.listen(3000, () => {
    console.log(`Running on ${portNumber}`);
});
