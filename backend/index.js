//Require Express
const express = require('express');

//Require environment variables
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

//Start Express App
const app = express();


//Start Express server
app.listen(process.env.PORT, () => {
    console.log(`SERVER STARTED ON PORT ${process.env.PORT}`);
});