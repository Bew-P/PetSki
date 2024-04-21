const express = require('express');
const path = require('path')
const port=3000
const app = express();
//Import and use Environmental varaiable
const dotenv = require("dotenv");
dotenv.config();


/* Create a router object and register the router */
const router = express.Router();
app.use(router)

router.use(express.json());
router.use(express.urlencoded({ extended: true}));

//connection to Mysql
const mysql = require('mysql2');
var connection = mysql.createConnection(
    {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
);

//connect to DB
connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected DB : ${process.env.MYSQL_DATABASE} `);
})



/* Set the static file directory */
app.use('/', express.static(path.join(__dirname,'public')));


/* Apply the created router to the route */
router.get('/home', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/home.html`))
})

router.get('/products', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/product.html`))
})

router.get('/product-submit', (req,res) => {
    let pet = req.query.search_pet
    connection.query('SELECT * FROM Petdata WHERE Pet_Category = ?', [pet], function(error, results){
        if (error) throw error;
        if (results.length == 0) {
            console.log(`Search Not found`);
        } else{
            console.log(`Search ${results.length} rows returned Found`);
            return res.send(results);
        }
    });
});

router.get('/productdetail', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/productdetail.html`))
})

router.get('/team', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/team.html`))
})

router.get('/login', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/login.html`))
})

router.get('/products', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/product.html`))
})

router.get('/adminmanage', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/adminmanage.html`))
})

router.get('/addproduct', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/addproduct.html`))
})

router.get('/productmanage', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/productmanage.html`))
})

router.get('/addadmin', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/addadmin.html`))
})

router.get('/addproduct', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/addproduct.html`))
})

/* Handle other unspecified paths */
/*router.use((req, res, next) => {
    console.log("404: Invalid accessed");
    res.status(404).send("Invalid Path");
})*/

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})