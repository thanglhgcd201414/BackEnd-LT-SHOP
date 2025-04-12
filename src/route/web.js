import express from "express";
import userController from '../controllers/userController';
import categoryController from '../controllers/categoryController';
import productController from '../controllers/productController';
import middlewareControllers from '../middlewares/jwtVerify';
let router = express.Router();

let initwebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("hello")
    })

    //=====================API USER==========================//
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/update-user', middlewareControllers.verifyTokenUser, userController.handleUpdateUser)
    router.delete('/api/delete-user', middlewareControllers.verifyTokenAdmin, userController.handleDeleteUser)
    router.post('/api/login', userController.handleLogin)
    router.post('/api/changepassword', middlewareControllers.verifyTokenUser, userController.handleChangePassword)
    router.get('/api/get-all-user', middlewareControllers.verifyTokenAdmin, userController.getAllUser)
    router.get('/api/get-detail-user-by-id', userController.getDetailUserById)
    router.post('/api/send-verify-email', middlewareControllers.verifyTokenUser, userController.handleSendVerifyEmailUser)
    router.post('/api/verify-email', middlewareControllers.verifyTokenUser, userController.handleVerifyEmailUser)
    router.post('/api/send-forgotpassword-email', userController.handleSendEmailForgotPassword)
    router.post('/api/forgotpassword-email', userController.handleForgotPassword)
    router.get('/api/check-phonenumber-email', userController.checkPhonenumberEmail)
    router.get('/api/get-detail-user-by-email', userController.getDetailUserByEmail)

    //==================API CATEGORY=========================//
    router.post('/api/create-new-category', middlewareControllers.verifyTokenAdmin, categoryController.createNewCategory)
    router.get('/api/get-all-categories', categoryController.getAllCategories)
    router.get('/api/get-detail-category-by-id', categoryController.getDetailCategoryById)
    router.put('/api/update-category', middlewareControllers.verifyTokenAdmin, categoryController.updateCategory)
    router.delete('/api/delete-category', middlewareControllers.verifyTokenAdmin, categoryController.deleteCategory)

    //==================API PRODUCT=========================//
    router.post('/api/create-new-product', middlewareControllers.verifyTokenAdmin, productController.createNewProduct)
    router.get('/api/get-all-products', productController.getAllProducts)
    router.get('/api/get-detail-product-by-id', productController.getDetailProductById)
    router.put('/api/update-product', middlewareControllers.verifyTokenAdmin, productController.updateProduct)
    router.delete('/api/delete-product', middlewareControllers.verifyTokenAdmin, productController.deleteProduct)
    router.get('/api/get-products-by-category', productController.getProductsByCategory)

    return app.use("/", router);
}

module.exports = initwebRoutes;
