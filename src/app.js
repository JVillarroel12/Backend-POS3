const express = require('express')
const cors = require('cors')
const categoryRoutes = require('./routes/category.routes')
const authRoutes = require('./routes/auth.routes')
const productRoutes = require('./routes/product.routes')
const userRoutes = require('./routes/auth.routes')
const clientRoutes = require('./routes/client.routes')
const tableRoutes = require('./routes/table.routes')
const zoneRoutes = require('./routes/zone.routes')
const billRoutes = require('./routes/bill.routes')
const currencyRoutes = require('./routes/currency.routes')
const paymentMethodRoutes = require('./routes/payment_method.routes')
const comandaRoutes = require('./routes/comanda.routes')


const app = express();


app.use(cors())
app.use(express.json())


app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', authenticate, userRoutes )
app.use('/api/clients', clientRoutes)
app.use('/api/tables', tableRoutes)
app.use('/api/zones', zoneRoutes)
app.use('/api/bills', billRoutes)
app.use('/api/currencies', currencyRoutes)
app.use('/api/payment-methods',paymentMethodRoutes)
app.use('/api/comandas', comandaRoutes)


// ? LOGIN - AUTH

const authenticate = require('./middlewares/auth.middleware');

app.use('/api/users', authenticate, userRoutes) 

app.use('/api/auth', authRoutes) 
// ?
module.exports = app