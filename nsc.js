var express = require("express");
var app = express();
var server = require("http").Server(app);
var hbs = require("express-handlebars");
var io = require("socket.io")(server);
var converter = require('./converter');

app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use( express.static("public") );

app.get("/", function(req, res) {

  var styles = ["reset.css", "bootstrap.min.css", "layout.css", "media-queries.css"],
      urls = ["fonts.googleapis.com/css?family=Lato", "fonts.googleapis.com/css?family=Indie+Flower"],
      scripts = ["handlebars.min.js", "socket.io.min.js", "scripts.js"],
      title = "NSC",
      content = "Numeral systems converter",
      info1 = "There are conversions between number bases:",
      info2 = "binary (2), ternary (3), quaternary (4), quinary (5), senary (6), septem (7), octal (8), nonal (9), decimal (10), undecimal (11), duodecimal (12), tridecimal (13), tetradecimal (14), pentadecimal (15), hexadecimal (16)";
   
  var data = {
        styles: styles,
        urls: urls,
        scripts: scripts,
        title: title,
        content: content,
        info1: info1,
        info2: info2
  };

  res.render('home', data);

});

server.listen(8081, function() {

  console.log("The server was running at http://localhost:8081");

});

converter(io);
