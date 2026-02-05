const express = require("express")
const app = express()
const fs = require("fs")

function hasContent (str){
    return typeof str === 'string' && str.length > 0
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))//middleware

/**
 * New Middlewares 
 * Create a middleware that checks if the product exists. If the product does not exist, redirect to the 404 endpoint.
 * Create another middleware to check the payload for adding and updating a product and implement it in the corresponding endpoints.
 */

const checkProductExist = (req,res,next) =>{
    const {id}= req.params
    const data = JSON.parse(fs.readFileSync("./products.json", {encoding: "utf-8"}))
    const productIndex = data.products.findIndex(product => product && product.id === parseInt(id))
    if (productIndex === -1){
        return res.status(404).json({
            message: "Product not found"
        })
    } 
    req.productData = data 
    req.productIndex = productIndex
    req.foundProduct = data.products[productIndex]
    next()
}
const payloadCheck = (req, res, next)=>{
    if (!req.body  || Object.keys(req.body).length === 0){
        return res.status(400).json({message: "Payload is empty"})
    }
    next()
}
app.get("/products", (req, res) => {
    const {search, category, subcategory} = req.query
    let {products} = JSON.parse(fs.readFileSync("./products.json", {encoding: "utf-8"}))
    if (hasContent(category)){
        products = products.filter(product => product.category.toLowerCase() === category.toLowerCase())

    }
    if (hasContent(subcategory)){
        products = products.filter(product => product.subcategory.toLowerCase() === subcategory.toLowerCase())

    }
    if (hasContent(search)){
        products = products.filter(product => {
            const strProduct = JSON.stringify(product).toLowerCase()
            const lowerSearch = search.toLowerCase()
            return strProduct.includes(lowerSearch)
        })

    }
    res.json({
        products
    })
    
})
// New middleware payloadCheck added to POST endpoints
app.post("/products",payloadCheck, (req, res) => {
    const {body} = req
    const data = JSON.parse(fs.readFileSync("./products.json", {encoding: "utf-8"}))
    const newProduct = { ...body, id: data.products.length > 0 ? data.products[data.products.length - 1].id + 1 : 1 } //
    data.products.push(newProduct)
    fs.writeFileSync("./products.json", JSON.stringify(data, null, 2), {encoding: "utf-8"})
    res.status(201).json(newProduct)
})
// New middleware payloadCheck and chekProductExist added to PUT endpoint
app.put("/products/:id", checkProductExist, payloadCheck, (req, res) => {
    const { body, params: { id }, productData, productIndex } = req;
    
    //  already attached to the request by the middleware
    productData.products[productIndex] = { ...body, id: parseInt(id) };
    
    fs.writeFileSync("./products.json", JSON.stringify(productData, null, 2));
    res.json(productData.products[productIndex]);
});
/*New endpoint for getting single product  */
app.get("/products/:id", checkProductExist, (req, res) => {
    res.json(req.foundProduct)
})
/*New endpoint for deleting a product */
app.delete("/products/:id", checkProductExist, (req, res) => {
    const {productData, productIndex} = req
    productData.products.splice(productIndex, 1)
    fs.writeFileSync("./products.json", JSON.stringify(productData, null, 2))
    res.status(204).send()
})
app.listen
 (9000, () => console.log("Server started on http://localhost:9000"))

