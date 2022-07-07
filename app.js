const express = require('express')
const expressLayout = require('express-ejs-layouts')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(expressLayout)

app.get('/', (req,res) =>{
    res.render('component/home', {
        layout: 'layouts/main'
    })
})

app.get('/manage', (req,res) => {
    res.render('component/manage', {
        layout: 'layouts/main'
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
app.listen(3004, () => {
    console.log('App running on http://localhost:3004')
})