var express = require("express");
var spit = require("./exports/log.js");
var mongoose = require('mongoose');
var kitty = require("./schema/kitten.js");


//var kitten = kittySchema;
//console.log(kitty);

var app = express();
spit.bog("hello");
app.use(express.static(__dirname + "/public"));

mongoose.connect('mongodb://localhost/Kittens', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected!")
});

app.get("/",(req, res)=>{
    res.sendFile("index.html");
})

var silence = new kitty({ name: 'Silence' });
silence.meow();
var bobo = new kitty();
bobo.meow();
var bobo = new kitty();
bobo.meow();

app.get("/kitty",(req, res)=>{
    kitty.find({ name: /^Silence/ }, function (err, cat) {
        if (err) return console.error(err);
        //console.log(cat);
        if(!cat)
            {
                silence.save(function (err, cat) {
                    if (err) return console.error(err);
                    cat.announceSaving();
                });
            }
        else
        {
            res.send(cat);
        }
      });
})

app.listen(3000,()=>{
    console.log("Running on port 3000");
})