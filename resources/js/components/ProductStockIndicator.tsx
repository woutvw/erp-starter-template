import Product from "../types/product";

export default function ProductStockIndicator({product}: {product: Product}){

    function quantityBelowMinimum(){
        if(!product.category) return false;
        if(!product.category.minimum_stock) return false;

        return product.quantity < product.category.minimum_stock;
    }

    if(!quantityBelowMinimum()) return <></>

    return (
        <div title="Test" className="rounded-full bg-red-500 h-2 w-2"></div>
    )
}