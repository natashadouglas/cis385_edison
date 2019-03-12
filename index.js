// modified from Getting Started on Heroku with Node.js web page
// connect utilizing generated pool
//const { Pool } = require('pg');
//const pool = new Pool({
//connectionString: process.env.DATABASE_URL,
//ssl: true
//});
const pg = require('pg');
const express = require('express');
const app = express();
const config = {connectionString: process.env.DATABASE_URL, ssl: true
};
const pool = new pg.Pool(config);
// set up app
app.set('port', (process.env.PORT || 5000))
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// get index.ejs page from server, rendering index

// declare variable to hold database connection
let pgClient;

pool.connect((err, client) => {
    if(err) {
        console.log(err);
    }
    pgClient = client;
});

app.get('/', async(req, res) => {
    const data1 = await pgClient.query("SELECT * FROM bids WHERE item = 'item1' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item1' ) ORDER BY id");
    const highBid1 = data1.rows[0].bid;
    const winningEmail1 = data1.rows[0].email;

    const data2 = await pgClient.query("SELECT * FROM bids WHERE item = 'item2' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item2' ) ORDER BY id");
    const highBid2 = data2.rows[0].bid;
    const winningEmail2 = data2.rows[0].email;

    const data3 = await pgClient.query("SELECT * FROM bids WHERE item = 'item3' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item3' ) ORDER BY id");
    const highBid3 = data3.rows[0].bid;
    const winningEmail3 = data3.rows[0].email;

    const data4 = await pgClient.query("SELECT * FROM bids WHERE item = 'item4' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item4' ) ORDER BY id");
    const highBid4 = data4.rows[0].bid;
    const winningEmail4 = data4.rows[0].email;

    const data5 = await pgClient.query("SELECT * FROM bids WHERE item = 'item5' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item5' ) ORDER BY id");
    const highBid5 = data5.rows[0].bid;
    const winningEmail5 = data5.rows[0].email;

    const data6 = await pgClient.query("SELECT * FROM bids WHERE item = 'item6' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item6' ) ORDER BY id");
    const highBid6 = data6.rows[0].bid;
    const winningEmail6 = data6.rows[0].email;

    return res.render('index', {highBid1:highBid1, winningEmail1:winningEmail1, highBid2:highBid2, winningEmail2:winningEmail2, highBid3:highBid3, winningEmail3:winningEmail3, highBid4:highBid4, winningEmail4:winningEmail4, highBid5:highBid5, winningEmail5:winningEmail5, highBid6:highBid6, winningEmail6:winningEmail6});
});

// run app
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});
// render index.ejs on post request
app.post('/', function (req, res) {
    res.render('index')
});
// modified from Scaling an Express.js Application with Memcache on Heroku
app.post('/bid1', async (req, returns) => {
    console.log(req.body);
    // connect to database
    // const client = pool.connect();
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Cannot connect to the DB" + err);
        }
// create parameterized query, insert row into database with indexing of form values
        const text = 'INSERT INTO bids(item, email, bid) VALUES($1, $2, $3)';
// generate array from form values; run insert query
// callback
        const values = ["item1", req.body.email1, req.body.bid1];
        client.query(text, values, function (err, res) {
            done();
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0])
            }
        });
    });

    const data1 = await pgClient.query("SELECT * FROM bids WHERE item = 'item1' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item1' ) ORDER BY id");
    const highBid1 = data1.rows[0].bid;
    const winningEmail1 = data1.rows[0].email;

    const data2 = await pgClient.query("SELECT * FROM bids WHERE item = 'item2' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item2' ) ORDER BY id");
    const highBid2 = data2.rows[0].bid;
    const winningEmail2 = data2.rows[0].email;

    const data3 = await pgClient.query("SELECT * FROM bids WHERE item = 'item3' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item3' ) ORDER BY id");
    const highBid3 = data3.rows[0].bid;
    const winningEmail3 = data3.rows[0].email;

    const data4 = await pgClient.query("SELECT * FROM bids WHERE item = 'item4' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item4' ) ORDER BY id");
    const highBid4 = data4.rows[0].bid;
    const winningEmail4 = data4.rows[0].email;

    const data5 = await pgClient.query("SELECT * FROM bids WHERE item = 'item5' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item5' ) ORDER BY id");
    const highBid5 = data5.rows[0].bid;
    const winningEmail5 = data5.rows[0].email;

    const data6 = await pgClient.query("SELECT * FROM bids WHERE item = 'item6' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item6' ) ORDER BY id");
    const highBid6 = data6.rows[0].bid;
    const winningEmail6 = data6.rows[0].email;
    
    //return res.redirect('/');
    return returns.render('index', {highBid1:highBid1, winningEmail1:winningEmail1, highBid2:highBid2, winningEmail2:winningEmail2, highBid3:highBid3, winningEmail3:winningEmail3, highBid4:highBid4, winningEmail4:winningEmail4, highBid5:highBid5, winningEmail5:winningEmail5, highBid6:highBid6, winningEmail6:winningEmail6});
});

// modified from Scaling an Express.js Application with Memcache on Heroku
app.post('/bid2', async (req, returns) => {
    console.log(req.body);
    // connect to database
    // const client = pool.connect();
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Cannot connect to the DB" + err);
        }
// create parameterized query, insert row into database with indexing of form values
        const text = 'INSERT INTO bids(item, email, bid) VALUES($1, $2, $3)';
// generate array from form values; run insert query
// callback
        const values = ["item2", req.body.email2, req.body.bid2];
        client.query(text, values, function (err, res) {
            done();
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0])
            }
        });
    });

    const data1 = await pgClient.query("SELECT * FROM bids WHERE item = 'item1' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item1' ) ORDER BY id");
    const highBid1 = data1.rows[0].bid;
    const winningEmail1 = data1.rows[0].email;

    const data2 = await pgClient.query("SELECT * FROM bids WHERE item = 'item2' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item2' ) ORDER BY id");
    const highBid2 = data2.rows[0].bid;
    const winningEmail2 = data2.rows[0].email;

    const data3 = await pgClient.query("SELECT * FROM bids WHERE item = 'item3' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item3' ) ORDER BY id");
    const highBid3 = data3.rows[0].bid;
    const winningEmail3 = data3.rows[0].email;

    const data4 = await pgClient.query("SELECT * FROM bids WHERE item = 'item4' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item4' ) ORDER BY id");
    const highBid4 = data4.rows[0].bid;
    const winningEmail4 = data4.rows[0].email;

    const data5 = await pgClient.query("SELECT * FROM bids WHERE item = 'item5' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item5' ) ORDER BY id");
    const highBid5 = data5.rows[0].bid;
    const winningEmail5 = data5.rows[0].email;

    const data6 = await pgClient.query("SELECT * FROM bids WHERE item = 'item6' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item6' ) ORDER BY id");
    const highBid6 = data6.rows[0].bid;
    const winningEmail6 = data6.rows[0].email;

    //return res.redirect('/');
    return returns.render('index', {highBid1:highBid1, winningEmail1:winningEmail1, highBid2:highBid2, winningEmail2:winningEmail2, highBid3:highBid3, winningEmail3:winningEmail3, highBid4:highBid4, winningEmail4:winningEmail4, highBid5:highBid5, winningEmail5:winningEmail5, highBid6:highBid6, winningEmail6:winningEmail6});
});

// modified from Scaling an Express.js Application with Memcache on Heroku
app.post('/bid3', async (req, returns) => {
    console.log(req.body);
    // connect to database
    // const client = pool.connect();
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Cannot connect to the DB" + err);
        }
// create parameterized query, insert row into database with indexing of form values
        const text = 'INSERT INTO bids(item, email, bid) VALUES($1, $2, $3)';
// generate array from form values; run insert query
// callback
        const values = ["item3", req.body.email3, req.body.bid3];
        client.query(text, values, function (err, res) {
            done();
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0])
            }
        });
    });

    const data1 = await pgClient.query("SELECT * FROM bids WHERE item = 'item1' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item1' ) ORDER BY id");
    const highBid1 = data1.rows[0].bid;
    const winningEmail1 = data1.rows[0].email;

    const data2 = await pgClient.query("SELECT * FROM bids WHERE item = 'item2' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item2' ) ORDER BY id");
    const highBid2 = data2.rows[0].bid;
    const winningEmail2 = data2.rows[0].email;

    const data3 = await pgClient.query("SELECT * FROM bids WHERE item = 'item3' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item3' ) ORDER BY id");
    const highBid3 = data3.rows[0].bid;
    const winningEmail3 = data3.rows[0].email;

    const data4 = await pgClient.query("SELECT * FROM bids WHERE item = 'item4' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item4' ) ORDER BY id");
    const highBid4 = data4.rows[0].bid;
    const winningEmail4 = data4.rows[0].email;

    const data5 = await pgClient.query("SELECT * FROM bids WHERE item = 'item5' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item5' ) ORDER BY id");
    const highBid5 = data5.rows[0].bid;
    const winningEmail5 = data5.rows[0].email;

    const data6 = await pgClient.query("SELECT * FROM bids WHERE item = 'item6' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item6' ) ORDER BY id");
    const highBid6 = data6.rows[0].bid;
    const winningEmail6 = data6.rows[0].email;

    //return res.redirect('/');
    return returns.render('index', {highBid1:highBid1, winningEmail1:winningEmail1, highBid2:highBid2, winningEmail2:winningEmail2, highBid3:highBid3, winningEmail3:winningEmail3, highBid4:highBid4, winningEmail4:winningEmail4, highBid5:highBid5, winningEmail5:winningEmail5, highBid6:highBid6, winningEmail6:winningEmail6});
});

// modified from Scaling an Express.js Application with Memcache on Heroku
app.post('/bid4', async (req, returns) => {
    console.log(req.body);
    // connect to database
    // const client = pool.connect();
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Cannot connect to the DB" + err);
        }
// create parameterized query, insert row into database with indexing of form values
        const text = 'INSERT INTO bids(item, email, bid) VALUES($1, $2, $3)';
// generate array from form values; run insert query
// callback
        const values = ["item4", req.body.email4, req.body.bid4];
        client.query(text, values, function (err, res) {
            done();
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0])
            }
        });
    });

    const data1 = await pgClient.query("SELECT * FROM bids WHERE item = 'item1' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item1' ) ORDER BY id");
    const highBid1 = data1.rows[0].bid;
    const winningEmail1 = data1.rows[0].email;

    const data2 = await pgClient.query("SELECT * FROM bids WHERE item = 'item2' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item2' ) ORDER BY id");
    const highBid2 = data2.rows[0].bid;
    const winningEmail2 = data2.rows[0].email;

    const data3 = await pgClient.query("SELECT * FROM bids WHERE item = 'item3' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item3' ) ORDER BY id");
    const highBid3 = data3.rows[0].bid;
    const winningEmail3 = data3.rows[0].email;

    const data4 = await pgClient.query("SELECT * FROM bids WHERE item = 'item4' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item4' ) ORDER BY id");
    const highBid4 = data4.rows[0].bid;
    const winningEmail4 = data4.rows[0].email;

    const data5 = await pgClient.query("SELECT * FROM bids WHERE item = 'item5' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item5' ) ORDER BY id");
    const highBid5 = data5.rows[0].bid;
    const winningEmail5 = data5.rows[0].email;

    const data6 = await pgClient.query("SELECT * FROM bids WHERE item = 'item6' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item6' ) ORDER BY id");
    const highBid6 = data6.rows[0].bid;
    const winningEmail6 = data6.rows[0].email;

    //return res.redirect('/');
    return returns.render('index', {highBid1:highBid1, winningEmail1:winningEmail1, highBid2:highBid2, winningEmail2:winningEmail2, highBid3:highBid3, winningEmail3:winningEmail3, highBid4:highBid4, winningEmail4:winningEmail4, highBid5:highBid5, winningEmail5:winningEmail5, highBid6:highBid6, winningEmail6:winningEmail6});
});

// modified from Scaling an Express.js Application with Memcache on Heroku
app.post('/bid5', async (req, returns) => {
    console.log(req.body);
    // connect to database
    // const client = pool.connect();
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Cannot connect to the DB" + err);
        }
// create parameterized query, insert row into database with indexing of form values
        const text = 'INSERT INTO bids(item, email, bid) VALUES($1, $2, $3)';
// generate array from form values; run insert query
// callback
        const values = ["item5", req.body.email5, req.body.bid5];
        client.query(text, values, function (err, res) {
            done();
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0])
            }
        });
    });

    const data1 = await pgClient.query("SELECT * FROM bids WHERE item = 'item1' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item1' ) ORDER BY id");
    const highBid1 = data1.rows[0].bid;
    const winningEmail1 = data1.rows[0].email;

    const data2 = await pgClient.query("SELECT * FROM bids WHERE item = 'item2' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item2' ) ORDER BY id");
    const highBid2 = data2.rows[0].bid;
    const winningEmail2 = data2.rows[0].email;

    const data3 = await pgClient.query("SELECT * FROM bids WHERE item = 'item3' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item3' ) ORDER BY id");
    const highBid3 = data3.rows[0].bid;
    const winningEmail3 = data3.rows[0].email;

    const data4 = await pgClient.query("SELECT * FROM bids WHERE item = 'item4' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item4' ) ORDER BY id");
    const highBid4 = data4.rows[0].bid;
    const winningEmail4 = data4.rows[0].email;

    const data5 = await pgClient.query("SELECT * FROM bids WHERE item = 'item5' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item5' ) ORDER BY id");
    const highBid5 = data5.rows[0].bid;
    const winningEmail5 = data5.rows[0].email;

    const data6 = await pgClient.query("SELECT * FROM bids WHERE item = 'item6' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item6' ) ORDER BY id");
    const highBid6 = data6.rows[0].bid;
    const winningEmail6 = data6.rows[0].email;

    //return res.redirect('/');
    return returns.render('index', {highBid1:highBid1, winningEmail1:winningEmail1, highBid2:highBid2, winningEmail2:winningEmail2, highBid3:highBid3, winningEmail3:winningEmail3, highBid4:highBid4, winningEmail4:winningEmail4, highBid5:highBid5, winningEmail5:winningEmail5, highBid6:highBid6, winningEmail6:winningEmail6});
});

// modified from Scaling an Express.js Application with Memcache on Heroku.
app.post('/bid6', async (req, returns) => {
    console.log(req.body);
    // connect to database
    // const client = pool.connect();
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Cannot connect to the DB" + err);
        }
// create parameterized query, insert row into database with indexing of form values
        const text = 'INSERT INTO bids(item, email, bid) VALUES($1, $2, $3)';
// generate array from form values; run insert query
// callback
        const values = ["item6", req.body.email6, req.body.bid6];
        client.query(text, values, function (err, res) {
            done();
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0])
            }
        });
    });

    const data1 = await pgClient.query("SELECT * FROM bids WHERE item = 'item1' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item1' ) ORDER BY id");
    const highBid1 = data1.rows[0].bid;
    const winningEmail1 = data1.rows[0].email;

    const data2 = await pgClient.query("SELECT * FROM bids WHERE item = 'item2' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item2' ) ORDER BY id");
    const highBid2 = data2.rows[0].bid;
    const winningEmail2 = data2.rows[0].email;

    const data3 = await pgClient.query("SELECT * FROM bids WHERE item = 'item3' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item3' ) ORDER BY id");
    const highBid3 = data3.rows[0].bid;
    const winningEmail3 = data3.rows[0].email;

    const data4 = await pgClient.query("SELECT * FROM bids WHERE item = 'item4' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item4' ) ORDER BY id");
    const highBid4 = data4.rows[0].bid;
    const winningEmail4 = data4.rows[0].email;

    const data5 = await pgClient.query("SELECT * FROM bids WHERE item = 'item5' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item5' ) ORDER BY id");
    const highBid5 = data5.rows[0].bid;
    const winningEmail5 = data5.rows[0].email;

    const data6 = await pgClient.query("SELECT * FROM bids WHERE item = 'item6' AND bid = (SELECT MAX (bid) FROM bids WHERE item = 'item6' ) ORDER BY id");
    const highBid6 = data6.rows[0].bid;
    const winningEmail6 = data6.rows[0].email;

    //return res.redirect('/');
    return returns.render('index', {highBid1:highBid1, winningEmail1:winningEmail1, highBid2:highBid2, winningEmail2:winningEmail2, highBid3:highBid3, winningEmail3:winningEmail3, highBid4:highBid4, winningEmail4:winningEmail4, highBid5:highBid5, winningEmail5:winningEmail5, highBid6:highBid6, winningEmail6:winningEmail6});
});

    //returns.render ('index');
/* // count the number of bids for item
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Cannot connect to the DB" + err);
        }
        client.query("SELECT COUNT (*) FROM bids WHERE item = 'item1'", function (err, res) {
            done();
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0]);
                global.counter = res.rows[0];
                return res;
            }
        });
    });
   const itemCount = global.counter;
   console.log(itemCount);
    // if the bid count is greater than or equal to three, declare auction winner; query winner
   if (itemCount >= 3 ) {
            pool.connect(function (err, client, done) {
                if (err) {
                    console.log("Cannot connect to the DB" + err);
                }
                client.query("SELECT * FROM bids WHERE item = 'item1' AND bid = (SELECT MAX (bid) FROM bids)", function (err, res) {
                    done();
                    if (err) {
                        console.log(err.stack)
                    } else {
                        console.log(res.rows[0])
                        global.response = res
                    }
                });
            });
        const result = global.response;
        const highBid1 = result.rows[0].bid;
        const winningEmail1 = result.rows[0].email;
        // display winning bid and associated email address on index.ejs
        returns.render ('index', {highBid1:highBid1, winningEmail1:winningEmail1});
    } else {
        const bidText = "Place another bid on Social Contribution";
        const URL="https://socialcontribution.herokuapp.com/";
        returns.send("Bid received, thank you! " + bidText.link(URL));
   }*/
//});
/*
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
});*/
