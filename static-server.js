const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const portNumber = process.argv[2] || 3000;
const server = express();

server.use(express.static(path.resolve('./build')));

server.use(
    '/demo',
    proxy({
        secure: false,
        xfwd: false,
        target: 'https://apidemo.sagex3.com',
        changeOrigin: true,
    }),
);

server.listen(3000, () => {
    console.log(`Running on ${portNumber}`);
});
