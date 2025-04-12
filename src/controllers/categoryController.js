import categoryService from '../services/categoryService';

let createNewCategory = async (req, res) => {
    try {
        let data = await categoryService.createNewCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllCategories = async (req, res) => {
    try {
        let data = await categoryService.getAllCategories();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getDetailCategoryById = async (req, res) => {
    try {
        let data = await categoryService.getDetailCategoryById(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let updateCategory = async (req, res) => {
    try {
        let data = await categoryService.updateCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let deleteCategory = async (req, res) => {
    try {
        let data = await categoryService.deleteCategory(req.body.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    createNewCategory: createNewCategory,
    getAllCategories: getAllCategories,
    getDetailCategoryById: getDetailCategoryById,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}
