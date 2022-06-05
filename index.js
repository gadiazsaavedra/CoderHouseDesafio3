const express = require('express')
const Contenedor = require('./Contenedor.js')

const app = express()
const ContenedorProductos = new Contenedor('./productos.txt')

const PORT = 8080

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))  

// http://localhost:8080/productos
app.get('/productos', async (req, res) => {
    try {
        const productos = await ContenedorProductos.getAll()

        res.send(productos)
    } catch (error) {
        res.send(error)
    }
})

app.get('/productoRandom', async (req, res) => {
    const productos = await ContenedorProductos.getAll()

    const indice = Math.floor(Math.random() * productos.length)

    res.send(productos[indice])

})