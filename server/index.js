require('dotenv').config();
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const authCTRL = require('../server/controllers/authController')
const swagController = require('../server/controllers/swagController')
const cartCTRL = require('../server/controllers/cartController')
const searchCTRL = require('../server/controllers/searchController')


const {
    SERVER_PORT,
    SESSION_SECRET
} = process.env


const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
}))
app.use(checkForSession.exFunc)
app.use(express.static(`${__dirname}/../build`))

app.get('/api/swag', swagController.read)

app.post('/api/login', authCTRL.login)
app.post('/api/register', authCTRL.register)
app.post('/api/signout', authCTRL.signout)
app.get('/api/user', authCTRL.getUser)
app.post('/api/cart/checkout', cartCTRL.checkout)
app.post('/api/cart/:id', cartCTRL.add)
app.delete('/api/cart/:id', cartCTRL.delete)
app.get('/api/search', searchCTRL.search)




app.listen(SERVER_PORT, () => {
    console.log('server is up')
})