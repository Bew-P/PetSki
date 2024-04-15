const express = require('express');
const path = require('path')
const port=3000
const app = express();

/* Create a router object and register the router */
const router = express.Router();
app.use(router)

/* Set the static file directory */
app.use('/', express.static(path.join(__dirname,'public')));


/* Apply the created router to the route */
router.get('/home', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/home.html`))
})

router.get('/products', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/product.html`))
})

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