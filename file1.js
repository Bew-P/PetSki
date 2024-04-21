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
router.use(express.urlencoded({ extended: true }));


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

router.post('/product-submit', (req, res) => {
    let { search_pet, search_brand, search_flavor, search_type } = req.body;

    // Constructing the SQL query with dynamic conditions
    let sql = `SELECT * FROM Petdata WHERE 1`;

    // Adding conditions for search parameters if they are provided
    if (search_pet) {
        sql += ` AND Pet_Category = '${search_pet}'`;
    }
    if (search_brand) {
        sql += ` AND Brand = '${search_brand}'`;
    }
    if (search_flavor) {
        sql += ` AND Flavor = '${search_flavor}'`;
    }
    if (search_type) {
        sql += ` AND FoodType = '${search_type}'`;
    }

    connection.query(sql, function(error, results) {
        if (error) {
            console.error("Error querying database: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.length === 0) {
            console.log(`Search not found`);
            return res.status(404).json({ message: "Search not found" });
        } else {
            console.log(`Search ${results.length} rows returned found`);
            return res.status(200).json(results);
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

/* Handle other unspecified paths */
/*router.use((req, res, next) => {
    console.log("404: Invalid accessed");
    res.status(404).send("Invalid Path");
})*/

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})