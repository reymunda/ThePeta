const express = require('express')
const mysql = require('mysql')
const expressLayout = require('express-ejs-layouts')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(expressLayout)

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
        app.get('/edit', (req,res) => {
            res.render('component/edit', {
                layout: 'layouts/main'
            })
        })
    }
})

app.listen(3004, () => {
    console.log('App running on http://localhost:3004')
})