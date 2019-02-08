 var mongoose = require("mongoose");
 
 let kittySchema = new mongoose.Schema({
        name: String
    });

kittySchema.methods.meow = function(){
    var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
    console.log(greeting);
}

kittySchema.methods.announceSaving = function(){
    var greeting = this.name + " is saved to the db.";
    console.log(greeting);
}

//console.log(kittySchema)
module.exports =  mongoose.model('Kitten', kittySchema);

   
