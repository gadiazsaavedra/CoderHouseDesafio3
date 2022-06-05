const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
    }

    async getAll() {
        try {
            const file = await fs.promises.readFile(this.nombreArchivo)

            const fileConverted = JSON.parse(file)

            return fileConverted
           
        } catch (error) {
           const array = []
           await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(array))

           return array
        }
    }


    async save(objeto) {
        try { 
            const elementos = await this.getAll()                                    
            //const elementos = [ {id: 1, title: 'prueba'}, {id: 2, title: 'prueba1'} ].length = 2
                       
            // let id

            // if(elementos.length === 0){
            //     id = 0 
            // } else {
            //     id = elementos[elementos.length - 1].id + 1
            // }
            
            // objeto.id = id 
            const nuevoID = elementos.length === 0 ? 1 : elementos[elementos.length - 1].id + 1
            objeto.id = nuevoID

            elementos.push(objeto)

            const elementosJson = JSON.stringify(elementos, null, 3)

            await fs.promises.writeFile(this.nombreArchivo, elementosJson)


            return nuevoID
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getById(id) {
        try {
            
            const elementos = await this.getAll()

            const elementoEncontrado = elementos.find((elemento) => elemento.id == id)

            return elementoEncontrado
        } catch (error) {
            console.log(error)    
        }
    }

    async deleteById(id) {
        try {
            const elementos = await this.getAll()
            
            const nuevoArray = elementos.filter((elemento) => elemento.id != id)

            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(nuevoArray, null, 3))

            return 'Eliminado'

        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]))
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports =  Contenedor 

// const ProductosContenedor = new Contenedor('./productos.txt')

// ProductosContenedor.getAll().then(data => console.log(data)).catch()

// const prueba = async () => {
//     const resultado = await 
// }


// const prueba = async () => { 
//     //const productos = await ProductosContenedor.getAll() 
//     //console.log(productos)

//     //const respuesta = await ProductosContenedor.save({ title: 'Prueba4', price: 600 })
//     //console.log(`El nuevo producto tiene el id: ${respuesta}`)

//     // const elementoEncontrado = await ProductosContenedor.getById(1) 
//     // console.log(elementoEncontrado)

//     //await ProductosContenedor.deleteById(2)
//     await ProductosContenedor.deleteAll()
// }

// prueba()

// ProductosContenedor.getAll().then(data => console.log(data)).catch(error => console.log(error))
