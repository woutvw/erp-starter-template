import { useState } from "react"
import SearchProductSelect from "../../components/SearchProductSelect"
import OrderProduct from "../../types/orderProduct"
import Product from "../../types/product";
import { useTranslation } from "react-i18next";

interface OrderProductModalProps {
    onSaveProduct: (product: OrderProduct) => void
    onCloseModal: () => void
    modalOpen: boolean
}

export default function OrderProductModal({onSaveProduct, onCloseModal, modalOpen}: OrderProductModalProps){
    const [product, setProduct] = useState<Product>();
    const [price, setPrice] = useState<string>('0');
    const [quantity, setQuantity] = useState<string>('1');

    const {t} = useTranslation();

    function handleSave(){
        if(!product) return;

        onSaveProduct({
            product_id: product.id,
            name: product.name,
            price: Number(price),
            quantity: Number(quantity)
        })
        handleCloseModal();
    }

    function handleCloseModal(){
        setProduct(undefined);
        setPrice('0');
        setQuantity('1');
        onCloseModal();
    }

    if(!modalOpen) return <></>

    return (
        <div className="modal visible bg-gray-500/50 pointer-events-auto">
            <div className="modal-box opacity-100">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseModal}>✕</button>
                </form>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Product')}*</legend>
                    <SearchProductSelect product={product} onChange={(product) => {setProduct(product); setPrice(product.sale_price+'')}}/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Price')}*</legend>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="input w-full"/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Quantity')}*</legend>
                    <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="input w-full"/>
                </fieldset>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn mr-2" onClick={handleCloseModal}>{t('Cancel')}</button>
                        <button className="btn btn-primary" onClick={handleSave}>{t('Add product')}</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleCloseModal}>close</button>
            </form>
        </div>
    )
}