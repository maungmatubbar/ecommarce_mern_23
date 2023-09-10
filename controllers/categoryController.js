import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";


export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(401).send({
                success: false,
                message: "Category name is required",
            });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            res.status(200).send({
                success: true,
                message: "Category already exists",
            });
        }
        const slug = slugify(name);
        const category = await new categoryModel({ name, slug }).save();
        res.status(200).send({
            success: true,
            message: "Category created successfully!",
            category: category
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something is wrong",
            error: error
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!name) {
            res.status(401).send({
                success: false,
                message: "Category name is required",
            });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            res.status(200).send({
                success: true,
                message: "Category already exists",
            });
        }
        const slug = slugify(name);
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug }, { new: true });
        res.status(200).send({
            success: true,
            message: "Category updated successfully!",
            category: category
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something is wrong category update",
            error: error
        });
    }
}
//get all categories 
export const getCategories = async (req, res) => {
    try {
        const PAZE_SIZE = 3;
        const page = parseInt(req.query.page - 1 || "0");
        const total = await categoryModel.countDocuments({});
        const categories = await categoryModel.find({}).limit(PAZE_SIZE).skip(PAZE_SIZE * page);
        res.status(200).send({
            success: true,
            message: 'Categories list',
            total: total,
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting categories",
            error: error
        });
    }
}

//Get Single Category
export const getSingleCategory = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: 'Show single category',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting single category",
            error: error
        });
    }
}
//Delete Category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting delete category",
            error: error
        });
    }
}