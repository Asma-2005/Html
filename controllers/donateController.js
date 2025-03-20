const Donate = require('../models/donate');
const User=require('../models/user');

const donatefunc = async (req, res) => {
    try {
        const { foodName, foodType, quantity, expirationDate, location, status } = req.body;

        if (!foodName || !foodType || !quantity || !expirationDate || !location) {
            return res.status(400).json({ error: "Please provide all required fields!" });
        }

        // Parse location string into coordinates array (if coming as a string)
        const locationCoordinates = Array.isArray(location.coordinates) ? location.coordinates : JSON.parse(location);
        const donor="67dc5d81744cd46bd6b6502c";
        const donation = new Donate({
            donor,
            foodName,
            foodType,
            quantity,
            expirationDate,
            location: {
                type: "Point",
                coordinates: locationCoordinates
            },
            status: status || "available"
        });
        
        // Save it to the database
        await donation.save();
  // Update the user's donations array
  await User.findByIdAndUpdate(donor, { $push: { donations: donation._id }});


        res.status(201).json({ message: "Donation listed successfully!", donation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { donatefunc };
