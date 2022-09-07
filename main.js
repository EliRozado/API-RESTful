const express = require('express')
const app = express();

const prodRouter = require('./productos.js')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/productos', prodRouter)

app.use("/", express.static(__dirname + '/public'))

app.listen(8080, () => {
    console.log('init')
})