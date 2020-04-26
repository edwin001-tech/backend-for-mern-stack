
const express = require('express');
const config = require('./config/config.js')

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser') 
const helmet = require('helmet')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


app.use(helmet())
app.use(cors())




  



mongoose.Promise = global.Promise
mongoose.connect(config.url, {
    useNewUrlParser: true,useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// default route
app.get("/", (req, res) => {
    res.send(  "Welcome,Node.js Restful CRUD API with Node.js, Express and MongoDB." );
  });
require("./routes/user.routes.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});