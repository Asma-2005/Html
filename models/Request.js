const { request } = require("express");
const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    foodItem: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "FoodListing", 
         required: true 
        }, 

    recipient: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "Users", 
         required: true 
        },

    status: {
         type: String, 
         enum: ["pending", "approved", "rejected"], 
         default: "pending" 
        },
    requestDate: { 
        type: Date, 
        default: Date.now 
    },

    location: { 
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true}
    }
});

const reequest=mongoose.model("request",RequestSchema);
module.exports =reequest;