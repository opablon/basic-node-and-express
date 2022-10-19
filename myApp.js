let express = require('express');
let app = express();
let bodyParser = require('body-parser')

app.use(function simpleLogger(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  if (process.env['MESSAGE_STYLE'] === "uppercase") {
    res.json({ message: "HELLO JSON" });;
  } else {
    res.json({ message: "Hello json" });
  };
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time});
});

app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word});
});

app.get("/name", (req, res) => {
  let { first: firstName, last: lastName } = req.query;
  res.json({name: `${firstName} ${lastName}`});
});

app.post('/name', (req, res) => {
  let { first: firstName, last: lastName } = req.body;
  res.json({name: `${firstName} ${lastName}`});
});

 module.exports = app;
