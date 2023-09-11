import slugify from "slugify";
import productModel from "../models/productModel.js"
import fs from 'fs'
export const create = async (req, res) => {
    try {
        const { name, description, price, category, quantity,
            shipping } = req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Name is required'
                });
            case !description:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Description is required'
                });
            case !price:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Price is required'
                });
            case !category:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Category is required'
                });
            case !quantity:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Quantity is required'
                });
            case !shipping:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Shipping is required'
                });
            case photo && photo.size > 1000000:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Photo is required and should be less then 1 mb'
                });
        }
        const slug = slugify(name, { lower: true });
        const products = await productModel({ ...req.fields, slug: slug });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            'success': true,
            "message": 'Product created successfully!',
            products
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            'succuess': false,
            'message': 'Error while creating product',
            error
        })
    }
}

export const getProducts = async (req, res) => {
    try {
        const PAZE_SIZE = 3;
        const page = parseInt(req.query.page - 1 || "0");
        const products = await productModel.find({}).select('-photo')
            .populate('category').limit(PAZE_SIZE).skip(PAZE_SIZE * page).sort('createdAt');
        res.status(200).send({
            'success': true,
            "countTotal": products.length,
            'message': 'All Product',
            products
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            'succuess': false,
            'message': 'Error while getting products',
            error
        })
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const { slug } = req.params;
        const products = await productModel.findOne({ slug: slug }).select('-photo').populate('category');
        res.status(200).send({
            'success': true,
            "countTotal": products.length,
            'message': 'All Product',
            products
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            'succuess': false,
            'message': 'Error while getting single product',
            error
        });
    }
}
export const getProductPhoto = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo');
        if (product?.photo?.data) {
            res.set("Content-Type", product.photo.contentType)
            res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            'succuess': false,
            'message': 'Error while getting product photo',
            error
        });
    }
}
/**********Update Product***************/

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity,
            shipping } = req.fields;
        const { photo } = req.files;
        /***************validation**************/
        switch (true) {
            case !name:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Name is required'
                });
            case !description:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Description is required'
                });
            case !price:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Price is required'
                });
            case !category:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Category is required'
                });
            case !quantity:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Quantity is required'
                });
            case !shipping:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Shipping is required'
                });
            case photo && photo.size > 1000000:
                return res.status(400).send({
                    "success": false,
                    'err_message': 'Photo is required and should be less then 1 mb'
                });
        }

        const products = await productModel.findByIdAndUpdate(
            req?.params?.pid,
            { ...req.fields, slug: slugify(name, { lower: true }) },
            { new: true });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            'success': true,
            "message": 'Product updated successfully!',
            products
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            'succuess': false,
            'message': 'Error while updating product',
            error
        })
    }
}

/**************Delete Product****************/
export const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req?.params?.pid).select('-photo');
        res.status(201).send({
            'success': true,
            "message": 'Product deleted successfully!',
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            'succuess': false,
            'message': 'Error while deleting product',
            error
        })
    }
}
