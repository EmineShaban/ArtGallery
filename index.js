let express = require('express')
let hbs = require('express-handlebars')

let { PORT } = require('./config/env')
const routes = require('./routes')
const app = express()

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))
app.use(routes)








app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))