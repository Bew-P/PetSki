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

router.post('/addadmin-submit', (req, res) => {
    let admin = req.body;
    console.log(admin);
    if (!admin) {
        return res.status(400).send({ error: true, message: 'Please provide admin information' });
    }
    connection.query("INSERT INTO Admininfo SET ? ", admin, function (error, results) {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: true, message: 'Error adding new admin' });
        }
        console.log('New admin has been created successfully');
        res.redirect('/adminmanage')
    });
});


/*router.post('/addadmin-submit', (req, res) => {
    let admin = req.body;
    const {id, username, fname, lname, email, password} = req.body;
    console.log(admin);
    if (!admin) {
        return res.status(400).send({ error: true, message: 'Please provide admin information' });
    }

    const sql = `INSERT INTO Petdata VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [id,username,fname,lname,email,password];
    connection.query(sql, values, function (error, results) {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: true, message: 'Error adding new admin' });
        }
        console.log('New admin has been created successfully with id:', results.insertId);
        res.status(201).send({ success: true, message: 'New admin created', id: results.insertId });
    });
});*/

/*const { Product_id, Pname, Pet_Category, Brand, Flavor, FoodType, price, quantity, image } = req.body;

    const sql = `INSERT INTO Petdata (Product_id, Pname, Pet_Category, Brand, Flavor, FoodType, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [Product_id,Pname,Pet_Category,Brand,Flavor,FoodType,price,quantity,image];*/


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



// Construct SQL query to fetch product details from the database
const sql = 'SELECT * FROM Petdata WHERE Product_id = ?';


//edited-producted
//Testing 1 : edit product 
//URL: http://localhost:3000/editproduct-submit
//body:raw JSON
//method :put
//{
//    "Product_id": "088567",
//    "Pname": "Royal Canin Adult Mini Sterlised",
//    "Pet_Category": "Dog",
//      "Brand": "Royal Canin",
//    "Flavor": "Pork",
//    "FoodType": "Veterinarydiet",
//    "price": "5000",
//    "quantity": "10",
//    "image": "https://github.com/Bew-P/PetSki/blob/main/Productimg/Royal_Canin_Adult_Mini_Sterlised1.jpeg?raw=true"
//}


//edited-producted

//Testing 2 : edit product 
//URL: http://localhost:3000/editproduct-submit
//body:raw JSON
//method :put
//{
//    "Product_id": "784534",
//    "Pname": "Royal Canin Adult Mini Sterlised",
//    "Pet_Category": "Dog",
//    "Brand": "Royal Canin",
//    "Flavor": "Chicken",
//    "FoodType": "Dry",
//    "price": "550",
//    "quantity": "85",
//   "image": "https://github.com/Bew-P/PetSki/blob/main/Productimg/Royal_Canin_dog1.jpeg?raw=true"
//}

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

//delete
//delete-product
//Testing 1 : delete product 
//method :delete
//URL: http://localhost:3000/deleteproduct/063745
//body:raw JSON
//
//    {
//        "Product_id": "063745"
//    }

//Testing 2 : delete product 
//URL: http://localhost:3000/deleteproduct/496954
//method :delete
//body:raw JSON
//
//    {
//        "Product_id": "496954"
//    }

router.delete('/deleteproduct/:productId', (req, res) => {
    const productId = req.params.productId;

    const sql = 'DELETE FROM Petdata WHERE Product_id = ?';

    // Log the SQL query and the productId
    console.log('Deleting product with ID:', productId);
    console.log('SQL Query:', sql);

    connection.query(sql, productId, (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).send('Error deleting product');
        }

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            console.log('No product deleted');
            return res.status(404).send('No product deleted');
        }

        console.log('Product deleted successfully');
        return res.status(200).send('Product has been deleted successfully');
    });
});

//delete
//delete-Admin
//Testing 1 : delete Admin 
//URL: http://localhost:3000/adminmanage/Ava.chen@gmail.com
//method :delete
//body:raw JSON
//
//    {
//        "Admin_email": "Ava.chen@gmail.com"
//    }

//delete
//delete-Admin
//Testing 2 : delete Admin 
//URL: http://localhost:3000/adminmanage/Isabella@gmail.com
//method :delete
//body:raw JSON
//
//    {
//        "Admin_email": "Isabella@gmail.com"
//    }


router.delete('/adminmanage/:adminEmail', (req, res) => {
    const adminEmail = req.params.adminEmail;

    connection.query('DELETE FROM Adminlogin WHERE Admin_email = ?', adminEmail, (err, loginResult) => {
        if (err) {
            console.error('Error deleting admin login:', err);
            return res.status(500).send('Error deleting admin login');
        }

        connection.query('DELETE FROM Admininfo WHERE Admin_email = ?', adminEmail, (err, infoResult) => {
            if (err) {
                console.error('Error deleting admin info:', err);
                return res.status(500).send('Error deleting admin info');
            }

            console.log('Admin account deleted successfully');
            return res.status(200).send('Admin account has been deleted successfully');
        });
    });
});

router.get('/searchapi', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/searchapi.html`))
})


/* Handle other unspecified paths */
/*router.use((req, res, next) => {
    console.log("404: Invalid accessed");
    res.status(404).send("Invalid Path");
})*/

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})