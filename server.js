console.log('May Node be with you')

const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.set('view engine')

MongoClient.connect('mongodb://***:***@***.mlab.com:***/gigst-db', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8080, () => {
    console.log('listening on 8080')
  })
})

app.post('/actionhtmlref', (req, res) => {
  db.collection('db_area').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/', (req, res) => {
  db.collection('db_area').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs.
    res.render('modules/About.js', {db_areas: result})
  })
})
