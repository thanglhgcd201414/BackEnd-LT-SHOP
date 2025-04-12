import db from "../models/index";
require('dotenv').config();

let createNewProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.price || !data.categoryId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu thông tin bắt buộc! Cần có tên, giá và danh mục sản phẩm.'
                })
            } else {
                await db.Product.create({
                    name: data.name,
                    price: data.price,
                    description: data.description || null,
                    categoryId: data.categoryId,
                    image: data.image || null
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Tạo sản phẩm thành công!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                include: [
                    { model: db.Category, as: 'categoryData' }
                ],
                raw: true,
                nest: true
            });

            resolve({
                errCode: 0,
                data: products
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getDetailProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu mã sản phẩm!'
                })
            } else {
                let product = await db.Product.findOne({
                    where: { id: id },
                    include: [
                        { model: db.Category, as: 'categoryData' }
                    ],
                    raw: true,
                    nest: true
                });

                if (!product) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Không tìm thấy sản phẩm!'
                    })
                } else {
                    resolve({
                        errCode: 0,
                        data: product
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.price || !data.categoryId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu thông tin bắt buộc! Cần có mã, tên, giá và danh mục sản phẩm.'
                })
            } else {
                let product = await db.Product.findOne({
                    where: { id: data.id },
                    raw: false
                });

                if (!product) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Không tìm thấy sản phẩm!'
                    })
                } else {
                    product.name = data.name;
                    product.price = data.price;
                    product.description = data.description || product.description;
                    product.categoryId = data.categoryId;

                    if (data.image) {
                        product.image = data.image;
                    }

                    await product.save();

                    resolve({
                        errCode: 0,
                        errMessage: 'Cập nhật sản phẩm thành công!'
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu mã sản phẩm!'
                })
            } else {
                let product = await db.Product.findOne({
                    where: { id: id }
                });

                if (!product) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Không tìm thấy sản phẩm!'
                    })
                } else {
                    await db.Product.destroy({
                        where: { id: id }
                    });

                    resolve({
                        errCode: 0,
                        errMessage: 'Xóa sản phẩm thành công!'
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getProductsByCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!categoryId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu mã danh mục!'
                })
            } else {
                let products = await db.Product.findAll({
                    where: { categoryId: categoryId },
                    include: [
                        { model: db.Category, as: 'categoryData' }
                    ],
                    raw: true,
                    nest: true
                });

                resolve({
                    errCode: 0,
                    data: products
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewProduct: createNewProduct,
    getAllProducts: getAllProducts,
    getDetailProductById: getDetailProductById,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    getProductsByCategory: getProductsByCategory
}
