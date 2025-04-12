import db from "../models/index";
require('dotenv').config();

let createNewCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.code) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                // Kiểm tra xem code đã tồn tại chưa
                let existingCategory = await db.Category.findOne({
                    where: { code: data.code }
                });
                
                if (existingCategory) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Category code already exists!'
                    })
                } else {
                    await db.Category.create({
                        name: data.name,
                        code: data.code
                    })
                    
                    resolve({
                        errCode: 0,
                        errMessage: 'Category created successfully!'
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCategories = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = await db.Category.findAll();
            resolve({
                errCode: 0,
                data: categories
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getDetailCategoryById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let category = await db.Category.findOne({
                    where: { id: id }
                });
                
                if (!category) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Category not found!'
                    })
                } else {
                    resolve({
                        errCode: 0,
                        data: category
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.code) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let category = await db.Category.findOne({
                    where: { id: data.id },
                    raw: false
                });
                
                if (!category) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Category not found!'
                    })
                } else {
                    // Kiểm tra xem code mới đã tồn tại chưa (nếu code thay đổi)
                    if (data.code !== category.code) {
                        let existingCategory = await db.Category.findOne({
                            where: { code: data.code }
                        });
                        
                        if (existingCategory) {
                            resolve({
                                errCode: 3,
                                errMessage: 'Category code already exists!'
                            })
                            return;
                        }
                    }
                    
                    category.name = data.name;
                    category.code = data.code;
                    
                    await category.save();
                    
                    resolve({
                        errCode: 0,
                        errMessage: 'Category updated successfully!'
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let category = await db.Category.findOne({
                    where: { id: id }
                });
                
                if (!category) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Category not found!'
                    })
                } else {
                    // Kiểm tra xem có sản phẩm nào thuộc danh mục này không
                    let products = await db.Product.findAll({
                        where: { categoryId: id }
                    });
                    
                    if (products && products.length > 0) {
                        resolve({
                            errCode: 3,
                            errMessage: 'Cannot delete category because it contains products!'
                        })
                    } else {
                        await db.Category.destroy({
                            where: { id: id }
                        });
                        
                        resolve({
                            errCode: 0,
                            errMessage: 'Category deleted successfully!'
                        })
                    }
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewCategory: createNewCategory,
    getAllCategories: getAllCategories,
    getDetailCategoryById: getDetailCategoryById,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}
