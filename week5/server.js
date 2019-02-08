const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'))
const MongoClient = require('mongodb').MongoClient;
app.use(express.urlencoded({extended:false}));

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
  // ... start the server
  if (err) return console.log(err)
  db = client.db('test')

    app.get('/json/:name', (req, res) => {
        console.log(req.params.name)
        db.collection('jayTest').find({name:req.params.name}).toArray(function (err, result) {
            if (err){throw err} 
            //console.log(result);
            res.send(result);
            //res.render('index.html');
            //console.log(result);
        })
    })

    app.get("/form", (req,res)=>{
        res.sendFile(__dirname + "/public/form.html");
    })

    app.get("/result", (req,res)=>{
        res.sendFile(__dirname+"/public/result.html");
    })

    app.post('/insert', (req, res) => {
        db.collection('jayTest').insert({name:req.body.name, age:req.body.age});
        //console.log(req.body.name);
        res.sendFile(__dirname+"/public/result.html");
    })

   

app.listen(3000, function() {
    console.log('listening on 3000')
  })
})