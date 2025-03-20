const mongoose = require("mongoose");

const donateSchema = new mongoose.Schema({
    donor: {
        //  type: mongoose.Schema.Types.ObjectId, 
        //  ref: "Users", 
        //  required: true 

        type:String,
        required:true
        
        },

    foodName: { 
        type: String,
        required: true
         },

    foodType: { 
        type: String, 
        enum: ["vegetarian", "halal", "vegan", "non-veg"], 
        required: true
     },

    quantity: { 
        type: Number, 
        required: true 
    },

    expirationDate: {
         type: Date, 
         required: true 
        },
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true }
    },

    status: { 
        type: String, 
        enum: ["available", "reserved", "picked-up"], 
        default: "available" },

        imageUrl:{ 
            type: String
        },

    createdAt: { 
        type: Date, 
        default: Date.now
     }
});


const Donate = mongoose.model("Donate", donateSchema);
module.exports = Donate;