//   express framework for creating the routing of the application.
import express from 'express';
//body-parser which enables us to send post requests.
import bodyParser from 'body-parser';
//mongoose for creating models for our posts.
import mongoose from 'mongoose';
//cors enables cross origin requests.
import cors from 'cors';

import postRoutes from './Controllers/posts.js';

//Express basically helps you manage everything, from routes, to handling requests and views. Redis is a key/value store -- commonly used for sessions and caching in Node. js applications
const app = express();


app.use('/posts', postRoutes);

//express.urelencoded parses the incoming requests with JSON payloads. it is a method built into express to recognize the incoming Request Object as string or arrays. 

//the extended option, allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.

//Since we are extended true we use the qs library, which allows you to create nested objects within your query strings

//the limit option, controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing.	
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json({ limit: '25mb' }));
app.use(cors());

// When we clicked on connect on MongoDB, we had 3 options to choose from, and we chose to connect via our own application. Then we received a link which we pasted here. Soon we will put this in a environemntal variable file so it won't be shown.
const CONNECTION_URL = 'mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.1gmdo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// for now we are going to use the 5000, but later when we push this to heroku, heroku will automatically populate environmental variable PORT 
const PORT = process.env.PORT || 5000;
//[options.serverSelectionTimeoutMS] «Number» If useUnifiedTopology = true, the MongoDB driver will try to find a server to send any given operation to, and keep retrying for serverSelectionTimeoutMS milliseconds before erroring out. If not set, the MongoDB driver defaults to using 30000 (30 seconds).
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true} )
// here we are returning a promise, so when our connection is successful we will do an app.listen. The app. listen() function is used to bind and listen the connections on the specified host and port. This method is identical to Node's http. ... The app returned by express() is in fact a JavaScript function, designed to be passed to Node's HTTP servers as a callback to handle requests
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    //The message property is a human-readable description of the error.
    .catch((error) => console.log(error.message));