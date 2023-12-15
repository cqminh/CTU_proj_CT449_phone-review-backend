const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const phonesRouter = require('./routes/phones.route');
const accountsRouter = require('./routes/accounts.route');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api/phones/', phonesRouter)
app.use('/api/accounts/', accountsRouter)

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.listen('3000', ()=>{
    console.log('server started');
});
