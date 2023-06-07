import { Router } from "express";
import ProductManager from "../ProductManager.js";
const productManager = new ProductManager();

const router = Router();

router.get("", (req, res) => {
    const products = productManager.getProducts();
    const { limit } = req.query
    if (!limit) res.json(products)
    else {
        const productsLimit = products.slice(0, parseInt(limit));
        res.json(productsLimit);
    }
});
router.get("/:id", (req, res) => {
    const { id } = req.params
    const products = productManager.getProducts();
    const productById = products.find(productById => productById.id == id);
    if (productById) return res.json(productById);
    else res.json({ error: "Product does not exist" });
})
router.post("", (req, res) => {
    const { title, description, code, price, stock, category, thumbnail } = req.body;
    const newProduct = productManager.addProduct(title, description, code, price, true, stock, category, thumbnail);
    if (newProduct === 'El código ya existe') {
        res.status(400).json({ error: 'El código ya existe' });
    } else if (newProduct === 'Producto agregado exitosamente') {
        res.status(201).json({ message: 'Producto agregado exitosamente' });
    } else if (newProduct === 'Todos los campos obligatorios deben ser completados') {
        res.status(400).json({ error: 'Todos los campos obligatorios deben ser completados' });
    } else {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id); 
    const { title, description, code, price, stock, category, thumbnail } = req.body;
    const fieldsToUpdate = {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail,
    };
    const updateProducts = productManager.updateProduct(parsedId, fieldsToUpdate);
    if (updateProducts ==='producto modificado'){
        res.status(201).json({ message: 'Producto modificado exitosamente' });
    } else if(updateProducts ==='Producto no encontrado') {
        res.status(400).json({ error: 'el producto no existe' });
    }
  });

  router.delete("/:id",(req,res)=>{
    const { id } = req.params;
    const parsedId = parseInt(id); 
    const deleteProduct = productManager.deleteProduct(parsedId)
    if (deleteProduct ==='producto eliminado'){
        res.status(201).json({ message: 'Producto eliminado exitosamente' });
    } else if(deleteProduct ==='Producto no encontrado') {
        res.status(400).json({ error: 'el producto no existe' });
    }
  })

export default router;
