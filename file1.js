const express = require('express');
const path = require('path')
const port = 3000
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
app.use('/', express.static(path.join(__dirname, 'public')));


/* Apply the created router to the route */
router.get('/home', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/home.html`))
})

router.get('/products', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/product.html`))
})

router.get('/api/product', (req,res) => {
    connection.query('SELECT * FROM Petdata', function (error, results) {
        if (error) throw error;
        res.json(results);
    });
})

router.get('/product-submit', (req, res) => {
    let { search_pet, search_brand, search_flavor, search_type } = req.query;

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

    connection.query(sql, function (error, results) {
        if (error) {
            console.error("Error querying database: ", error);
            return res.status(500).send("Internal Server Error");
        }
        if (results.length === 0) {
            console.log(`Search not found`);
            return res.status(404).send("Search not found");
        } else {
            console.log(`Search ${results.length} rows returned found`);
            return res.json(results); // Return the search results as JSON
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

router.get('/api/admin', (req, res) => {
    connection.query('SELECT * FROM Admininfo', function (error, results) {
        if (error) throw error;
        res.json(results);
    });
})

router.get('/productmanage', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/productmanage.html`))
})

router.get('/addproduct', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/addproduct.html`))
})

router.get('/addadmin', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/addadmin.html`))
})

router.get('/editadmin', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/editadmin.html`))
})

router.put('/editadmin', (req, res) => {
    let id = req.body.Admininfo.id;
    let admin = req.body.Admininfo;
    const sql = 'UPDATE Admininfo SET ? WHERE id = ?';
    if (!student_id || !student) {
        return res.status(400).send({ error: student, message: 'Please provide student information' });
    }
    connection.query(sql, [admin, id], function (error, results) {
        if (error) throw error;
    });
})

router.delete('/adminmanage', (req, res) => {
    /*let id = req.body.id;
    connection.query('DELETE FROM Admininfo WHERE id = ?', [id], function (error, results)
    {
        if (error) throw error;
    });*/
})

router.get('/editproduct', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/editproduct.html`))
})

router.post('/adminmanage', (req, res) => {
    const { email, password } = req.body;

    console.log("Received email:", email);
    console.log("Received password:", password);

    // Construct SQL query to check if email and password match in the database
    const sql = 'SELECT * FROM Admininfo WHERE Admin_email = ? AND Admin_pw = ?';

    connection.query(sql, [email, password], function (error, results) {
        if (error) {
            console.error("Error querying database: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length > 0) {
            return res.redirect('/adminmanage');
        } else {
            return res.redirect('/login');
        }
    });
});

router.get('/product-detail', (req, res) => {
    const productId = req.query.id; // Extract product ID from query parameters

    // Construct SQL query to fetch product details from the database
    const sql = 'SELECT * FROM Petdata WHERE Product_id = ?';

    connection.query(sql, [productId], function (error, results) {
        if (error) {
            console.error("Error querying database: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length > 0) {
            const product = results[0]; // Assuming only one product is returned
            return res.json(product); // Return product details as JSON
        } else {
            return res.status(404).json({ error: "Product not found" }); // Return 404 error if product not found
        }
    });
});

//edited-producted
router.put('/editproduct-submit', (req, res) => {
    console.log(req.url);
    console.log(req.body);
    const { Product_id, Pname, Pet_Category, Brand, Flavor, FoodType, price, quantity, image } = req.body;

    const sql = `UPDATE Petdata 
                 SET Pname = ?, Pet_Category = ?, Brand = ?, Flavor = ?, FoodType = ?, price = ?, quantity = ?, image = ?
                 WHERE Product_id = ?`;
    const values = [Pname, Pet_Category, Brand, Flavor, FoodType, price, quantity, image, Product_id];
    console.log('SQL:', sql);
    console.log('Values:', values);

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).send('Error updating product');
        }

        console.log('Product updated successfully');
        return res.status(200).send('Product has been edited successfully');
    });
});



router.post('/addproduct-submit', function (req, res) { 
    console.log(req.url);
    console.log(req.body);
    const { Product_id, Pname, Pet_Category, Brand, Flavor, FoodType, price, quantity, image } = req.body;

    const sql = `INSERT INTO Petdata (Product_id, Pname, Pet_Category, Brand, Flavor, FoodType, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [Product_id,Pname,Pet_Category,Brand,Flavor,FoodType,price,quantity,image];
    console.log('SQL:', sql);
    console.log('Values:', values);

    connection.query(sql, values,function (error, results) {
        if (error){
            console.error('Error add product:', err);
            return res.status(500).send('Error add product');
        };

        console.log('Product added successfully');
        return res.status(200).send('New product has been created successfully.');
        
    });


});
/* Handle other unspecified paths */
/*router.use((req, res, next) => {
    console.log("404: Invalid accessed");
    res.status(404).send("Invalid Path");
})*/

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})