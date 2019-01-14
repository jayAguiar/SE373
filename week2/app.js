var express = require("express");
var hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('add', (a,b)=>{return a+b});

app  .use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.get('/', function(req, res,){
    res.render("index.hbs",{title:"Home Page"});
});

app.get('/form', function(req, res,){
    res.render("form.hbs",{title:"Form Page"});
});



app.all('/about', function(req, res){
    res.render("about.hbs", {title:"About Page",junk:req.body.message, parameters:req.query.words});
    console.log(req.query)
});

app.listen(3000, ()=>{
    console.log("Server Running at Localhost:3000")
})