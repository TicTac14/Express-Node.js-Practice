const express = require('express');
const app = express();
const {logger, authorize} = require('./middleware.js')

// req => middleware => res
// multiple middleware is app.use([v1, v2, ...])
app.use([logger, authorize]);

app.get('/', (req, res)=>{
    res.send('Home Page');

})

app.get('/about', (req, res)=>{
    res.send('About Page');
    
})

app.get('/api/products', (req, res)=>{
    res.send('products');

})

app.get('/api/items', (req, res)=>{
    res.send('items');
    
})

app.listen(3000, () => {
    console.log(`Server is listening on port 3000...`);
})