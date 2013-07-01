var express = require('express');
var app = express();
app.get('/hello.txt', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});
app.use(express.bodyParser());
app.use(express.methodOverride());
//The 404 Route (ALWAYS Keep this as the last route)
//app.get('*', function(req, res){
  //res.send('what???', 404);
//});
// "app.router" positions our routes
// above the middleware defined below,
// this means that Express will attempt
// to match & call routes _before_ continuing
// on, at which point we assume it's a 404 because
// no route has handled the request.

app.use(app.router);

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H "Accept: application/json"
// $ curl http://localhost:3000/notfound -H "Accept: text/plain"

app.use(function(req, res, next){
  res.status(404);

  // default to plain-text. send()
  res.type('txt').send('Not found custom message');
});
app.listen(3000);
console.log('Listening on port 3000');
