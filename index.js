const http = require('http');

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain');
res.end('Hello World.!!\nIts a nodejs sample app for HF..!!\nversion: 1.0.0');
});

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
