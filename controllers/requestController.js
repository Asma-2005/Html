const FoodListing = require("../models/donate");
const request=require('../models/request');
const User=require('../models/user');

//filters
let filter= async (req, res) => {
        try {
            const { foodType, userLatitude, userLongitude, maxDistance } = req.query;
            let filterCriteria = {};
    
       
            if (foodType) {
                filterCriteria.foodType = foodType;
            }
           
            if (userLatitude && userLongitude && maxDistance) {
                filterCriteria.location = {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [parseFloat(userLongitude), parseFloat(userLatitude)], // Longitude, Latitude
                        },
                        $maxDistance: parseInt(maxDistance) // Max distance in meters
                    }
                };
            }
    
            // Fetch the filtered food donations from the database
            const donations = await FoodListing.find(filterCriteria);
             
    
            res.status(200).json({ donations });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

//new request
let createRequest=async (req, res) => {
    try {
        const { foodId, recipientId } = req.body;

        // Check if the food exists
        const foodItem = await FoodListing.findById(foodId);
        if (!foodItem) return res.status(404).json({ error: "Food not found" });

        // Ensure the food is still available
        if (foodItem.status !== "available") {
            return res.status(400).json({ error: "This food is not available for requests" });
        }

        // Create the request
        const newRequest = await Request.create({
            foodItem: foodId,
            recipient: recipientId
        });

        // Update the food status to "reserved"
        await FoodListing.findByIdAndUpdate(foodId, { status: "reserved" });

        // Add request to recipient's history
        await User.findByIdAndUpdate(recipientId, { $push: { requests: newRequest._id } });

        res.status(201).json({ message: "Request created successfully", newRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


//cacling  a req

let cancelRequest=async (req, res) => {
    try {
        const { requestId } = req.params;

        // Find the request
        const foundRequest = await Request.findById(requestId);
        if (!foundRequest) return res.status(404).json({ error: "Request not found" });

        // Ensure the request is still pending
        if (foundRequest.status !== "pending") {
            return res.status(400).json({ error: "Only pending requests can be canceled" });
        }

        // Delete the request
        await Request.findByIdAndDelete(requestId);

        // Restore the food status to "available"
        await FoodListing.findByIdAndUpdate(foundRequest.foodItem, { status: "available" });

        res.status(200).json({ message: "Request canceled successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports={filter, createRequest, cancelRequest};