import productService from '../services/productService';

let createNewProduct = async (req, res) => {
    try {
        let data = await productService.createNewProduct(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lỗi từ server'
        })
    }
}

let getAllProducts = async (req, res) => {
    try {
        let data = await productService.getAllProducts();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lỗi từ server'
        })
    }
}

let getDetailProductById = async (req, res) => {
    try {
        let data = await productService.getDetailProductById(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lỗi từ server'
        })
    }
}

let updateProduct = async (req, res) => {
    try {
        let data = await productService.updateProduct(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lỗi từ server'
        })
    }
}

let deleteProduct = async (req, res) => {
    try {
        let data = await productService.deleteProduct(req.body.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lỗi từ server'
        })
    }
}

let getProductsByCategory = async (req, res) => {
    try {
        let data = await productService.getProductsByCategory(req.query.categoryId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lỗi từ server'
        })
    }
}

module.exports = {
    createNewProduct: createNewProduct,
    getAllProducts: getAllProducts,
    getDetailProductById: getDetailProductById,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    getProductsByCategory: getProductsByCategory
}
