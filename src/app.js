import express, { urlencoded } from 'express';
const app = express();
import products from "./routes/products.router.js"
import carts from "./routes/carts.router.js"

app.use(express.json());
app.use(urlencoded({ extended: true }))
app.use('/api/products',products);
app.use('/api/carts',carts);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})
/*CONSULTAS AL ENDPOINT (reemplazar la x por el id)
para PRODUCTS
GET
localhost:8080/api/products
localhost:8080/api/products/x
POST
localhost:8080/api/products/
PUT Y DELETE
localhost:8080/api/products/x

para CARTS
POST
localhost:8080/api/carts
GET
localhost:8080/api/carts/X
POST de un product en un cart
localhost:8080/api/carts/x/product/x  */