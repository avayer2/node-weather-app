const path = require('path');
const express = require('express');
const hbs = require('hbs');
const foreCast = require('./utils/foreCast');
const geoCode = require('./utils/geoCode');

const app = express();

const dirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.use(express.static(dirPath));

app.get('/', (req, res)=> {
    res.render('index', {title:'home', name : 'anurag', footer:'root footer'});
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'about', name: 'avayer', footer: 'abput footer'});
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'help', msg: 'what do you want?', footer: 'help footer'});
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : 'enter the address in query string'
        })
    }
    geoCode(req.query.address, (err, geoData) => {
        if (err) {
            console.log(err);
        } else {
            foreCast(geoData.lat, geoData.lon, (err, foreCastdata) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({
                        location : req.query.address,
                        temp : foreCastdata.temp,
                        weather : foreCastdata.type
                    });
                }
            })
        }
    })
})

app.get('/products', (req, res)=> {
    
    res.send({

    })
})

app.get('/help/*', (req, res)=> {
    res.send('no help article found');
})

app.get('*', (req, res)=>{
    res.render('404-page');
})

app.listen(3000, ()=> {
    console.log('Server running on port 3000');
})