const express = require('express');
const app = express();
let {people} = require('./data');


app.use(express.static('./Methods-public'))

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get('/api/people', (req, res) => {
    res.status(200).json({success:true, data:people});
})

app.post('/login', (req, res) => {
    const {name} = req.body; 
    if (name.length === 0){
        return res.status(401).send(`Not a valid name <a href="/">Form Page</a>`)
    }else {
        console.log(name);
        return res.send(`POST`);
    }
    
});

app.post('/api/people', (req, res)=> {
    // express use json will parse post request and put it in req.body
    const {name} = req.body;
    if (!name){
        return res.status(400).send({sucess:false, msg:'please get value'})
    }else { 
        return res.send({sucess:true, msg:'Updated!'});
    }

})



app.listen(3000, () => {
    console.log(`listening...`);
})