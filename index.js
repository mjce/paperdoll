const path = require('path')  
const express = require('express')  
const exphbs = require('express-handlebars')
const app = express()
const PouchDB = require('pouchdb')
const cors = require('cors')
app.use(cors());

app.engine('hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.use(express.static(path.join(__dirname, 'client')));
app.use('/db', cors(), require('express-pouchdb')(PouchDB));
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views'))
app.get('/', (request, response) => {
  response.render('paperdoll', {})
})
app.listen(8000)
