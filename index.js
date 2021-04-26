const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const QR = require('./qrcode');

require('dotenv').config()
const app = express()
const port = process.env.PORT
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose
    .connect(process.env.DATABASE, options)
    .then(connected => console.log(`Database connection established !`))
    .catch(err =>
        console.error(
            `There was an error connecting to database, the err is ${err}`
        )
    )


app.get('/:code', async(req,res,next) =>{
    let qr = await QR.findOne({code: req.params.code});
    let returnlink = qr.link;
    res.redirect(returnlink)
});


app.get('*', (req, res, next) => {
    res.status(404);
    next();
});

app.listen(port, () => {
    console.log(`Example app listening at :${port}`)
})