const mongoose=require('mongoose');
const bcrypt = require("bcrypt");



const userSchema=mongoose.Schema({
username:{
    type:String,
    required:[true,'please enter a username'],
    unique:[true,'this username is already exist']
},
password:{
    type:String,
    required:[true,'please enter a password'],
    minlength:[6,'The password lenght should be at least 6 characters']
},

role: {
     type: String,
      enum: ["donor", "recipient"], 
      required: true
     },
     
donations: [{
         type: mongoose.Schema.Types.ObjectId,
          ref: "donate"
         }], 
         
requests: [{
         type: mongoose.Schema.Types.ObjectId,
          ref: "request" 
        }], 
     


})

userSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,10);
    next();
});


const User=mongoose.model('Users',userSchema);
module.exports=User;
//our ref is User and the database collection name is user