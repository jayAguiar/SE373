//include libraries
var express = require("express");
var hbs = require('hbs');

//Instantiate express
var app = express();

//register where the partials are located
hbs.registerPartials(__dirname + '/views/partials');

//set up a javascript helper (javascript function) that can be called in the hbs file.
hbs.registerHelper('add', (a,b)=>{return a+b});

//For using encoded URLS (Post Data)
app .use(express.urlencoded());

//Sets the public directory as the front facing root directory
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

//Routes to the index.hbs and passes in a variable title
app.get('/', function(req, res,){
    res.render("index.hbs",{title:"Home Page"});
});

//Routes to the form.hbs and passes in a variable title
app.get('/form', function(req, res,){
    res.render("form.hbs",{title:"Form Page"});
});

//Routes to the about.hbs and passes in a data from the form.hbs submission. The junk variable is from Post data, while the parameters variable comes from the url using get.
app.all('/about', function(req, res){
    res.render("about.hbs", {title:"About Page",junk:req.body.message, parameters:req.query.words});
    console.log(req.query)
});


//Start up the server on port 3000.
app.listen(3000, ()=>{
    console.log("Server Running at Localhost:3000")
})