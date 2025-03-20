const express = require("express");
const app= express();
const DBconnection=require('./connections/DBconnection');
const dotenv = require("dotenv");
dotenv.config();
const UserRoutes=require('./routes/userRoutes');
const donateRoute = require("./routes/donateRoute");
const port=3000;

app.use(express.json());
//view of the project 
app.use(express.static('public'));
app.set('view engine','ejs');

DBconnection();

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
    
});

// Use routes
app.use(UserRoutes);
app.use(donateRoute);
app.get("/test", (req, res) => {
    console.log("✅ Server is working!");
    res.send("API is working!");
});

// Serve uploaded images
app.use("/uploads", express.static("uploads"));









