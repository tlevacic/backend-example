## Simple backend example

Backend code is running on the server. BE receives requests from client (client can be web browser, mobile app etc.) and return required data back to the client. Backend typically includes three major parts:
* Server - machine that receives requests (it can be any PC connected to the internet)
* App - Application running on the server that listens for requests and sends responce back to client
* Database - for storing data.

App running on backend contains something called ```routing```. So basically BE contains list of routes and client needs to send request on one of that routes so the app knows what logic needs to be executed.
```Middleware``` functions are helpers functions which runs between server receiving requests and returning a response. So when route is matched first thing that is executed is middleware, one example can be parsing data which is send from client to json structure.

## Example of simple BE structure using Node js (Express).
"Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications."

```
const express = require("express");

var app = express();

app.get("/", function (request, response) {
  response.send("Hello World!");
});

app.listen(3000, function () {
  console.log("Started application on port %d", 3000);
});
```

##### STARTING SERVER
After requiring exporess module, we need to start a server. With Express that is super easy:
```
app.listen(3000, function () {
  console.log("Started application on port %d", 3000);
});
```
```Listen``` function takes 2 params, first one is port on which server will be running, and the second one is callback function which will run when server is started.

So our server is running on: http://localhost:3000.
Next thing we need is to create routes.

##### ROUTING

```
app.get("/", function (request, response) {
  response.send("Hello World!");
});
```
```Get``` function takes 2 params, route parameter and callback function. In our case whenever default route is hitted callback function whill execute and return "Hello World!" message to client.

```
app.get("/test", function (request, response) {
  response.send("Hello test!");
});
```
This time when client make request on http://localhost:3000/test response will be "Hello test!".

##### HTTP STATUS CODES
HTTP Status codes is used to tell client status of response.
"A status code is a number higher than 100 and smaller than 600 that is part of a HTTP response."
There are 5 classes of status codes:
* 100-199 - informational
* 200-299 - success
* 300-399 - redirection
* 400-499 - client error
* 500-599 - server error

In express returning status code:
```
response.json({ status: 200, message: "Success" })
```
or
```
response.json({ status: 500, message: "Server error!" })
```

##### DATABASE
Database is important when creating backend part of the app. In almost all cases when client makes a request, server app will do some logic, retreive data from database (or other operations: CRUD) and return that data back to the client.
In our case we will be using Mongo Atlas for simple example.
First we need to install ```mongoose``` package: ``` npm i mongoose```.
Next thing is connecting to database:
```
mongoose.connect(
  "mongodb+srv://....?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  console.log("Connected to DB")
);
```
If mongo uri is correct we should see "Connected to DB" in console.
Let's create new route which will return all users in database.

```
app.get("/all-users", async (req, res, next) => {
  try {
    const users = await User.find().exec((err, result) => {
      res.json(result);
    });
  } catch (error) {
    res.json(error);
  }
});
```
When client sends requests on http://localhost:3000/all-users, callback is executed which will search all users in Users table in mongo document and return data to client.
