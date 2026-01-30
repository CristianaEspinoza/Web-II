const express = require("express")
const app = express()
const fs = require("fs")

function hasContent (str){
    return typeof str === 'string' && str.length > 0
}

app.use(express.json())
app.use(express.urlencoded())//middleware

app.get("/products", (req, res) => {
    const {search, category, subcategory} = req.query
    let {products} = JSON.parse(fs.readFileSync("./products.json", {encoding: "utf-8"}))
    if (hasContent(category)){
        products = products.filter(product => product.category.toLowerCase() === category.toLowerCase)

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
app.post("/products", (req, res) => {
    const {body} = req
    const data = JSON.parse(fs.readFileSync("./products.json", {encoding: "utf-8"}))
    const newProduct = { ...body, id: data.products.length > 0 ? data.products[data.products.length - 1].id + 1 : 1 } //
    data.products.push(newProduct)
    fs.writeFileSync("./products.json", JSON.stringify(data, null, 2), {encoding: "utf-8"})
    res.status(201).json(newProduct)
})
app.listen (9000, () => console.log("Server started on http://localhost:9000"))
