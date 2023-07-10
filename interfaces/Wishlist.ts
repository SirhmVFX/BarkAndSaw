import { IProduct } from "./Product";
import { IUser } from "./User";

export interface IWishlist {
    user: IUser;
    guest: string;
    product: IProduct;
}