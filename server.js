const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')
const PORT = 8000

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  // load root
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  // API flips coin server side and returns result
  // heads & tails counters can't be modified
  else if (page == '/api') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        let flipRes = Math.floor(Math.random() * 2)
        const objToJson = {
          coin: flipRes,
          heads: 0,
          tails: 0,
        }
        res.end(JSON.stringify(objToJson));
  }
  // load stylesheet
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }
  // load javascript
  else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }
  // load heads image
  else if (page == '/images/heads.png'){
    fs.readFile('./images/heads.png', function(err, data) {
      res.writeHead(200, {'Content-Type': 'image/png' });
       res.write(data);
      res.end();
    });
  }
  // load tails image 
  else if (page == '/images/tails.png'){
    fs.readFile('./images/tails.png', function(err, data) {
      res.writeHead(200, {'Content-Type': 'image/png' });
       res.write(data);
      res.end();
    });
  }
  else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(process.env.PORT);
// server.listen(PORT); // comment in if testing locally
