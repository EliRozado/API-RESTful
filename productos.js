const express = require("express")
const { Router } = express;

const router = Router();
const productos = [];

router.get('/', (req, res) => {
//devuelve todos los productos
    res.send({productos})
})

router.get('/:id', (req, res) => {
//devuelve un producto segun su id
    const { id } = req.params;

    let producto = productos.find(producto => producto.id == id) || false

    if(producto){
        res.send({ producto })
    }else{
        res.status(404).send({ error : 'producto no encontrado' })
    }
    
})

router.post('/', (req, res) => {
    // recibe y agrega un producto, y lo devuelve con su id asignado
    const { title, price, thumbnail } = req.body

    const producto = {
        title: title,
        price: price,
        thumbnail: thumbnail
    }

    if(productos.length){
        producto.id = productos[productos.length-1].id + 1
    }else{
        producto.id = 1
    }

    productos.push(producto)
    res.send({ producto })
})

router.put('/:id', (req, res) => {
    // recibe y actualiza un producto segun su id
    const { id } = req.params
    const { title, price, thumbnail } = req.body

    const index = productos.findIndex( producto => producto.id == id);

    if(index >= 0){
        productos[index].title =  title;
        productos[index].price =  price;
        productos[index].thumbnail =  thumbnail;
        res.send(productos[index])
    }else{
        res.status(404).send({ error : 'producto no encontrado' })
    }
})

router.delete('/:id', (req, res) => {
    //elimina un producto segun su id
    const { id } = req.params

    const index = productos.findIndex( producto => producto.id == id);

    if(index >= 0){
        productos.splice(index, 1)
        res.send("Se ha eliminado el producto de la lista")
    }else{
        res.status(404).send({ error : 'producto no encontrado' })
    }
})

module.exports = router;