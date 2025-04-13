// server.js
const http = require('http');
const url = require('url');
const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  console.log(`Request received for path: ${path}`);
  if (path === '/hello') {
    const name = parsedUrl.query.name || 'you';
    res.end(`Hello ${name}!`);
  } else {
    res.end('Hello from Node.js!');
  }
});

server.listen(PORT, () => {
  console.log(`WITH HELLO ENDPOINT`);
  console.log(`Server running on port ${PORT}`);
});
