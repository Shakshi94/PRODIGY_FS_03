import mongoose from "mongoose";
import Product from "../models/Product.js";
import { createError } from "../error.js";

export const addProducts = async(req,res,next) =>{
    try{

        const productData = req.body;

        if(!Array.isArray(productData)){
            return next(
                createError(400,'Invalid request. Expected an array')
            );
        }

       const createProducts = [] ;
       for( const productInfo of productData){
        const {title, name,desc,image,price,sizes,category} = productInfo;
        const product = new Product({
            title:title,
            name:name,
            desc:desc,
            image:image,
            price:price,
            sizes:sizes,
            category:category,
        });
        const createdProduct = await product.save();
        createProducts.push(createdProduct)
       }

       return res
            .status(201)
            .json({message: "Products added successfully", createProducts})
    }catch(err){
        next(err);
    }
}


export const getProducts = async (req, res, next) => {
    try {
        let { categories, minPrice, maxPrice, sizes, search } = req.query;

        // Handle undefined or empty query parameters
        if (categories) {
            categories = categories.split(",");
        }
        if (sizes) {
            sizes = sizes.split(",");
        }

        const filter = {};
        
        if (categories && Array.isArray(categories) && categories.length > 0) {
            filter.category = { $in: categories };
        }

        if (minPrice || maxPrice) {
            filter['price.org'] = {};
            if (minPrice) {
                filter['price.org']['$gte'] = parseFloat(minPrice);
            }
            if (maxPrice) {
                filter['price.org']['$lte'] = parseFloat(maxPrice);
            }
        }

        if (sizes && Array.isArray(sizes) && sizes.length > 0) {
            filter.sizes = { $in: sizes };
        }

        if (search) {
            filter.$or = [
                { title: { $regex: new RegExp(search, "i") } },
                { desc: { $regex: new RegExp(search, "i") } }
            ];
        }

        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};


export const getProductById = async(req,res,next) =>{

    try{
        const {id} = req.params;
        if(!mongoose.isValidObjectId(id)){
            return next(createError(400,'Invalid product Id'));

        }

        const product = await Product.findById(id);
        if(!product){
            return next(createError(404, 'Product is not found'));
        }

        return res.status(200).json(product);
    }catch(err){
        next(err);
    }
}