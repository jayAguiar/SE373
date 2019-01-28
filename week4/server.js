const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('grid', (a)=>{
    console.log('what?')
    var msg ='';
    msg += '<table>';
    
    for(let i= 0; i < a; i++)
    {
        msg+='<tr>';
        for(let i= 0; i < a; i++)
        {
            color = `#${(Math.random()*0xFFFFFF<<0).toString(16)}`;
            msg+=`<td style='background-color:${color};'>`;
            msg+=`<p class='black'>${color}</p>`;
            msg+=`<p class='white'>${color}</p>`;
            msg+='</td>';
        }  
        msg+='</tr>';
    }
    msg += '</table>'
    return new hbs.handlebars.SafeString(msg);
})

hbs.registerHelper('error404', ()=>{
    console.log('what?')
    var msg ='';
    msg += '<table>';
    var a = Math.round(Math.random()*30+20);
    var classes = ['still','rotate','shrink'];
    for(let i= 0; i < a; i++)
    {
       
            msg+=`<p class='${classes[Math.floor(Math.random()*2.9)]}'>`;
            msg+=`404`;
            msg+='</p>';
        
    }
    return new hbs.handlebars.SafeString(msg);
})

hbs.registerHelper('options', ()=>{
    var a =[3,4,5,10,20];
    msg ='';
    for(let i= 0; i < a.length; i++)
    {
       msg+=`<option>${a[i]}</option>`;
    }
    return new hbs.handlebars.SafeString(msg);
})


/*app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>
    {
        if(err){
            console.log('Unable to append to server.log.');
        }
    });
    next();
});*/

 /*app.use((req, res, next)=>{
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance'
    });
    next();
}); */

app.use(express.static(__dirname +'/public'));
app.use(express.urlencoded({extended:false}));
hbs.registerHelper('getCurrentYear', ()=>new Date().getFullYear())
hbs.registerHelper('screamIt', (text)=>text.toUpperCase());
const siteName = 'Some Website';




app.get('/', (req, res)=>{
   // res.send('<h1>Hello Express</h1>');
   /*res.send({
       name: 'Jay',
        likes: [
            'toys',
            'games'
        ]
   })*/
       //res.send('About Page');
       res.render('home.hbs', {
           pageTitle: 'Home Page',
           welcomeMessage: 'Hello Person'
       });
});

app.get('/about', (req, res) =>
{
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) =>
{
    res.send({message:'Error: DANGER WILL ROBINSON'});
})

app.get('/form', (req, res) =>
{
    res.render('form.hbs');
})

app.post('/result', (req, res) =>
{
    res.render('result.hbs',{num:Number(req.body.num)});
})


app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status=404;
    next(error)
})
app.use(function(error, req, res, next){
    res.status(error.status || 500)
    res.render('maintenance.hbs', {
        pageTitle: "maintenance",
        message: `${error.status} ${error.message}` 
    })
});

/*app.get('*', function(error, req, res){
    //res.send('what???', 404);
   /* res.render('maintenance.hbs', {
        pageTitle: "maintenance",
        message:words
    })
    res.render(error.toString());
  });*/
  

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
});
