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