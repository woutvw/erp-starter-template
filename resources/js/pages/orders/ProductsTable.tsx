import { useTranslation } from "react-i18next";
import OrderProduct from "../../types/orderProduct";

interface ProductsTableProps {
    products?: OrderProduct[]
}

export default function ProductsTable({ products = [] }: ProductsTableProps){
    const {t} = useTranslation();

    function totalPrice(){
        let total = 0;
        products?.forEach(product => {
            total += (product.price * product.quantity)
        })

        return total;
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <td>{t('Product')}</td>
                    <td>{t('Price')}</td>
                    <td>{t('Quantity')}</td>
                    <td>{t('Total')}</td>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr>
                        <td>{product.name}</td>
                        <td>€ {product.price}</td>
                        <td>{product.quantity}</td>
                        <td>€ {product.price * product.quantity}</td>
                    </tr>
                ))}
                <tr>
                    <td>{t('Total')}</td>
                    <td></td>
                    <td></td>
                    <td>€ {totalPrice()}</td>
                </tr>
            </tbody>
        </table>
    )
}