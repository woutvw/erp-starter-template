import { useTranslation } from "react-i18next";
import OrderProduct from "../../types/orderProduct";
import Icon from "../../components/Icon";

interface ProductsTableProps {
    products?: OrderProduct[],
    onRemoveProduct?: (data: OrderProduct) => void
}

export default function ProductsTable({ products = [], onRemoveProduct }: ProductsTableProps){
    const {t} = useTranslation();

    function round(number: number){
        return Math.round(number * 100) / 100
    }

    function totalPrice(){
        let total = 0;
        products?.forEach(product => {
            total += (product.price * product.quantity)
        })

        return round(total);
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <td>{t('Product')}</td>
                    <td>{t('Price')}</td>
                    <td>{t('Quantity')}</td>
                    <td>{t('Total')}</td>
                    <td className="w-10"></td>
                </tr>
            </thead>
            <tbody>
                {products.map((product, idx) => (
                    <tr key={idx}>
                        <td>{product.name}</td>
                        <td>€ {product.price}</td>
                        <td>{product.quantity}</td>
                        <td>€ {round(product.price * product.quantity)}</td>
                        { onRemoveProduct && (
                            <td>
                                <button onClick={(e) => {e.preventDefault(); onRemoveProduct(product)}} className="hover:text-error cursor-pointer">
                                    <Icon name="bin" className="w-5"/>
                                </button>
                            </td>
                        )}
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