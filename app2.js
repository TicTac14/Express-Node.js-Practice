const express = require('express');
const path = require('path');

const app = express();

// setup static and middleware
app.use(express.static('./navbar-app')); // serve static files

app.get('/', (req, res) => {
    //res.status(200).sendFile(path.join(__dirname, './navbar-app/index.html'));
})

app.get('/about', (req, res) => {
    res.status(200).send('About Page');
})

app.all('*', (req, res) => { // handling 404
    res.status(404).send('Cannot Find Page :(')
})

app.listen(3000, () => {
    console.log('Server Listening on port 3000...');
})