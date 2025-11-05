// Create a new router
const express = require("express");
const router = express.Router();

//The root route/default route
router.get("/", (req, res) => res.send("Hello World!")); 
//About route
router.get('/about', (req, res) => res.send ('<h1>This is about page</h1>'))
//Contact route     
router.get('/contact', (req, res) => res.send ('<h1>This is contact page</h1>'))
//Date route, uses JavaScript Date object to get current date and time and outputs it
router.get('/date', (req, res) => res.send (`<h1>Current Date and Time is: ${new Date()}</h1>`))
//greeting route with a name parameter
router.get('/welcome/:name', (req, res) => {
const name = req.params.name.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Basic sanitization to prevent HTML injection
res.send(`<h1>Welcome, ${name}!</h1>`);
});

// Chained route example
router.get('/chain',
  (req, res, next) => {
    console.log('First handler running...');
    req.message = 'This message was created in the first handler.';
    next(); // move to the next handler
  },
  (req, res) => {
    console.log('Second handler running...');
    res.send(`<h1>Chained Route</h1><p>${req.message}</p>`);
  }
);

// file route to serve a static file
const path = require('path');
router.get('/file', (req, res) => {
  const filePath = path.join(__dirname, '..',  'example.txt'); 
    res.sendFile(filePath, err => {
      if (err) {
        res.status(500).send('Error sending the file.');
      }
    });
}); 

// Export the router object so index.js can access it
module.exports = router;
