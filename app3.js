const express = require('express');
const app = express();

const {products} = require('./data.js');

app.get('/', (req, res) => {
    res.send('<h1> Home Page </h1><a href="/api/products">products</a><br><a href="/api/v1/query">query</a>');
});

app.get('/api/products', (req, res) => {
    const newProduct = products.map((product)=>{
        const {id, name, image} = product;
        return {id, name, image}
    })
    res.json(newProduct);
})

//GET parameters
app.get('/api/products/:productID', (req, res) => {
    const {productID} = req.params;

    const singleProduct = products.find((product)=> product.id === Number(productID))
    res.json(singleProduct);
    res.end();
})

//more complex GET request
app.get('/api/products/:productID/reviews/:reviewID', (req, res)=>{
    res.send('hello world!')
})
//queryString
//example:
// localhost:3000/api/v1/query?name=john&id=4
app.get('/api/v1/query', (req, res)=> {
    console.log(req.query);
    const {search, limit} = req.query;
    let sortedProducts = [...products];
    if (search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if (limit){
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if (sortedProducts.length < 1){
        res.status(200).send('no product matched your search')
    }
    else{res.status(200).json(sortedProducts);
    }
})

app.all('*', (req, res)=> {
    res.status(404).send('Oops! Could not find the page :(')
})



app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
})




