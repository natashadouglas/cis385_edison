// modified from Getting Started on Heroku with Node.js web page
// connect utilizing generated pool
const { Pool } = require('pg');
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true });
const express = require('express');
const app = express()

// set up app
app.set('port', (process.env.PORT || 5000))
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

// get index.ejs page from server, rendering index
app.get('/', function (req, res) {
  res.render('index')
});

// run app
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

// render index.ejs on post request
app.post('/', function (req, res) {
  res.render('index')
})

// modified from Scaling an Express.js Application with Memcache on Heroku
app.post('/bid1', function(req, res){
   console.log(req.body);
    // connect to database
    const client = pool.connect();

// create parameterized query, insert row into database with indexing of form values
    const text = 'INSERT INTO bids(item, email, bid) VALUES("item1", $1, $2)';

// generate array from form values; run insert query
// callback
    const values = [req.body.email1, req.body.bid1];
    client.query(text, values, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
        }
    });

// count the number of bids for item
    client.query ('SELECT COUNT (*) FROM bids WHERE item = "item1"', (err,res) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
            const response = res
        }
    });
   const itemCount = response.rows[0];

   // if the bid count is greater than or equal to three, declare auction winner; query winner
    if (itemCount >= 3 ) {
       client.query ('SELECT * FROM bids WHERE item = "item1" AND bid = (SELECT MAX (bid) FROM bids)', (err,res) => {
           if (err) {
               console.log(err.stack)
           } else {
               console.log(res.rows[0])
               const response = res
           }
       });
        const highBid1 = response.rows[0].bid;
        const winningEmail1 = response.rows[0].email;

        // display winning bid and associated email address on index.ejs
        res.render ('index', {highBid1:highBid1, winningEmail1:winningEmail1});
    } else {
        const bidText = "Place another bid on Social Contribution";
        const URL="https://socialcontribution.herokuapp.com/";
        res.send("Bid received, thank you! " + bidText.link(URL));

    }

});
app.post('/bid2', function(req, res){
    console.log(req.body);
    const bidText = "Place another bid on Social Contribution";
    const URL="https://socialcontribution.herokuapp.com/";
    res.send("Bid received, thank you! " + bidText.link(URL));
});
app.post('/bid3', function(req, res){
    console.log(req.body);
    const bidText = "Place another bid on Social Contribution";
    const URL="https://socialcontribution.herokuapp.com/";
    res.send("Bid received, thank you! " + bidText.link(URL));
});
app.post('/bid4', function(req, res){
    console.log(req.body);
    const bidText = "Place another bid on Social Contribution";
    const URL="https://socialcontribution.herokuapp.com/";
    res.send("Bid received, thank you! " + bidText.link(URL));
});
app.post('/bid5', function(req, res){
    console.log(req.body);
    const bidText = "Place another bid on Social Contribution";
    const URL="https://socialcontribution.herokuapp.com/";
    res.send("Bid received, thank you! " + bidText.link(URL));
});
app.post('/bid6', function(req, res){
    console.log(req.body);
    const bidText = "Place another bid on Social Contribution";
    const URL="https://socialcontribution.herokuapp.com/";
    res.send("Bid received, thank you! " + bidText.link(URL));
});

