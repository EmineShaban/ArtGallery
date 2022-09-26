let express = require('express')
let { PORT } = require('./config/env')
const app = express()

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))