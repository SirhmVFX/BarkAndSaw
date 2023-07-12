import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@utils/HttpError';
import { jsonOne } from '@utils/general';
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

export { createProduct };
