const donate = require("../models/donate");

const donatefunc = async (req, res) => {
    try {
        const { foodName, foodType, quantity, expirationDate, location, status } = req.body;

        if (!foodName || !foodType || !quantity || !expirationDate || !location) {
            return res.status(400).json({ error: "Please provide all required fields!" });
        }

        // Parse location string into coordinates array (if coming as a string)
        const locationCoordinates = Array.isArray(location.coordinates) ? location.coordinates : JSON.parse(location);

        const donation = new donate({
            donor: "65f234a1b4f12c001f5e8a2c", // Assumes authentication middleware is used
            foodName,
            foodType,
            quantity,
            expirationDate,
            location: {
                type: "Point",
                coordinates: locationCoordinates
            },
            status
        });

        await donation.save();
        res.status(201).json({ message: "Donation listed successfully!", donation });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

module.exports = { donatefunc };
