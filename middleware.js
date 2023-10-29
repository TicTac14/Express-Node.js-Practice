const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    next();
}

const authorize = (req, res, next) => {
    const {user} = req.query;
    if (user === 'john'){
        req.user = {name:'john', id:3}
        next();
    }else {
        res.status(401).send('Unauthorized User');
        
    }
}

module.exports = {logger, authorize};