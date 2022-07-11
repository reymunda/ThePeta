const express = require('express')
const mysql = require('mysql')
const expressLayout = require('express-ejs-layouts')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(expressLayout)
app.use(express.json({}))
app.use(express.urlencoded({
    extended: true
}))

const db = mysql.createConnection({
    host: "127.0.0.1",
    database: "locate_map",
    user: "root",
    password: ""
})

db.connect(err => {
    if(err){
        throw err
    }else{
        app.get('/', (req,res) =>{
            res.render('component/home', {
                layout: 'layouts/main'
            })
        })
        
        app.get('/manage', (req,res) => {
            db.query('SELECT * FROM coordinate_loc', (err, result) => {
                let dataLoc = JSON.parse(JSON.stringify(result))
                res.render('component/manage', {
                    layout: 'layouts/main',
                    dataLoc
                })
            })
        })
        app.get('/search', (req,res) => {
            res.render('component/search', {
                layout: 'layouts/main'
            })
        })
        app.get('/add', (req,res) => {
            res.render('component/add', {
                layout: 'layouts/main'
            })
        })
        app.post('/add',(req,res) => {
            db.query(`INSERT INTO coordinate_loc(location,lat,lng) VALUES("${req.body.loc}", ${req.body.latAdd}, ${req.body.lngAdd})`, (err, result) => {
                if (err) throw err
                res.redirect('/manage')
            })
            // console.log(req.body)
        })
        app.get('/edit/:id_location', (req,res) => {
            db.query(`SELECT * FROM coordinate_loc WHERE id=${req.params.id_location}`, (err, result) => {
                let dataLoc = JSON.parse(JSON.stringify(result))[0]
                res.render('component/edit', {
                    layout: 'layouts/main',
                    dataLoc
                })
            })
        })
        app.post('/edit/:id_location', (req,res) => {
            db.query(`UPDATE coordinate_loc SET location="${req.body.loc}", lat=${req.body.latEdit}, lng=${req.body.lngEdit} WHERE id=${req.params.id_location}`, (err, result) => {
                if(err) throw err
                res.redirect('/manage')
            })
        })
        app.get('/delete/:id_location', (req,res) => {
            db.query(`DELETE FROM coordinate_loc WHERE id=${req.params.id_location}`)
            res.redirect('/manage');
        })
    }
})

app.listen(3004, () => {
    console.log('App running on http://localhost:3004')
})