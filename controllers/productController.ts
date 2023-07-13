import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@utils/HttpError';
import { jsonAll, jsonOne } from '@utils/general';
import cloudinary from '@config/cloudinary';
import Product, { IProductModel } from '@models/Product';
import { ICategory } from '@interfaces/Category';
import { IProduct, Image } from 'interfaces/Product';
import Category from '@/models/Category';

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, quantity, colors, category: categoryId, miniDescription, description, isAvailable } = req.body;

        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            throw new HttpError(400, 'Product with the same name already exists');
        }

        const category: ICategory | null = await Category.findById(categoryId);
        if (!category) {
            throw new HttpError(404, 'Category not found');
        }

        const images: Image[] = [];
        if (req.files) {
            const filePromises = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) =>
                cloudinary.uploader.upload(file.path, { folder: 'bns' })
            );
            const results = await Promise.all(filePromises);
            images.push(...results.map(result => ({ public_id: result.public_id, url: result.secure_url })));
        }

        const newProduct: IProduct = {
            name,
            price,
            quantity,
            colors: colors as string[],
            images,
            category,
            miniDescription,
            description,
            isAvailable,
        };

        const savedProduct = await Product.create(newProduct);
        return jsonOne<IProductModel>(res, 201, savedProduct);
    } catch (error) {
        return next(error);
    }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        return jsonAll<IProductModel>(res, 200, products);
    } catch (error) {
        return next(error);
    }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            throw new HttpError(404, 'Product not found');
        }
        return jsonOne<IProductModel>(res, 200, product);
    } catch (error) {
        return next(error);
    }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            throw new HttpError(404, 'Product not found');
        }
        await product.remove();
        return res.sendStatus(204);
    } catch (error) {
        return next(error);
    }
};

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const { name, price, quantity, colors, category, miniDescription, description, isAvailable } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            throw new HttpError(404, 'Product not found');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;
        product.colors = colors;
        product.category = category;
        product.miniDescription = miniDescription;
        product.description = description;
        product.isAvailable = isAvailable;

        const updatedProduct = await product.save();
        return jsonOne<IProductModel>(res, 200, updatedProduct);
    } catch (error) {
        return next(error);
    }
};

const getCategoryProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await Product.find({ category: categoryId });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found in this category' });
        }

        return jsonAll<IProductModel>(res, 200, products);
    } catch (error) {
        return next(error);
    }
};

export default {
    createProduct,
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getCategoryProducts,
};
