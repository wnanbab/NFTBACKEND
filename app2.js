const express = require('express');
const pug = require('pug');

const app = express();
app.set('view engine', 'pug');
app.set('views','./views');

//定义一个中间键
const requestUrlLogger = (req,res,next) => {
    console.log('url is :',req.url);
    next();
}

app.use(requestUrlLogger)
app.use(express.json())

const products = [
    {
        "name":"Television",
        "price":2000,
        "brand":"xiaomi",
    },
    {
        "name":"laptop",
        "price":5000,
        "brand":"lanovo",
    }
];
app.get('/',function(req,res) {
    res.send('Hello World');
});

app.get('/home',(req,res) => {
    res.render('home',{
        title:'Home',
        message:'Hello there!'
    })
})


app.get('/products/:brand',(req,res) => {
    const brand = req.params.brand
    const filteredProducts = products.filter(product => product.brand === brand)
    res.send(filteredProducts)
})

//定义一个post上传功能
app.post('/products',(req,res)=>  {
    const name = req.body.name;
    const price = req.body.price;
    const brand = req.body.brand;
    products.push({name, price, brand});

    res.json({
        "message":"New product create",
        "data":products
    })
});

const port = 3000;
app.listen(port,() => {
    console.log('Server is running on ${port}...')
})