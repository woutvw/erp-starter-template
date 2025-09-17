import Supplier from "./supplier";

type OrderProduct = {
    id?: number;
    product_id: number;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    sku?: string;
    supplier?: Supplier
};

export default OrderProduct;