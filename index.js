const path = require('path')  
const express = require('express')  
const exphbs = require('express-handlebars')
const app = express()
const PouchDB = require('pouchdb')

app.engine('hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.use(express.static(path.join(__dirname, 'client')));
app.use('/db', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://descension.me");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Credentials", "true");
  require('express-pouchdb')(PouchDB)
  next();
  });
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views'))
app.get('/', (request, response) => {
  response.render('paperdoll', {})
})
app.listen(8000)
