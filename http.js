const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res)=> {
    if (req.url === '/home'){
        res.end('Welcome to our home page');
    }
    else if (req.url === '/about'){
        res.end('Here is our short story');
    }
    else {
        res.end('Oops! We cannot seem to find the page you are looking for')
     
    }
    
    
});


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});