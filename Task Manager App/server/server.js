const express = require('express');
const app = express();
const PORT = 3000;

let tasks = [];
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post('/api/tasks', (req, res) => {
    const {name} = req.query;
    if (name){
        tasks.push({name:name});
        return res.status(200).send({success:true})
    }else {
        return res.send({success:false, msg:'Enter Name'})
    }
})

app.delete('/api/tasks', (req, res)=> {
    const {name} = req.query;
    tasks = tasks.filter(task => {
        return task.name != name;
    })
    res.json({success:true, msg: `Successfully deleted ${name}`})
})

app.get('/api/tasks', (req, res) => {
    res.json({success:true, data:tasks});
})

app.use(express.static('./Task Manager App/frontend/Main-Page'));
app.get('/', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server is Listening on port ${PORT}...`);
})