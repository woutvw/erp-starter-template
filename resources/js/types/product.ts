import Category from "./category";
import Supplier from "./supplier";

type Product = {
    id: number
    sku: string
    name: string
    supplier: Supplier
    category?: Category
    description?: string
    sale_price: number
    purchase_price: number
    quantity: number
};

export default Product;