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
        const products = await productModel.find({}).select('-photo').populate('category').limit(10).sort('createdAt');
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