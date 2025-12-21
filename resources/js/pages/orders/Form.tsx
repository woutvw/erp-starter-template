import { useEffect, useState } from "react"
import Client from "../../types/client"
import { useTranslation } from "react-i18next";
import ApiErrors from "../../types/apiErrors";
import Order from "../../types/order";
import OrderProduct from "../../types/orderProduct";
import SearchableClientSelect from "../../components/SearchableClientSelect";
import ProductsTable from "./ProductsTable";
import OrderProductModal from "./OrderProductModal";

interface OrderFormProps {
    order?: Order
    errors: ApiErrors
    onSave: (client: any) => void
}

export default function OrderForm({ order, errors, onSave }: OrderFormProps){
    const [modalOpen, setModalOpen] = useState(false)

    const [client, setClient] = useState<Client>()
    const [products, setProducts] = useState<OrderProduct[]>([]);

    const {t} = useTranslation();

    useEffect(() => {
        if(order){
            setClient(order.client);
            setProducts(order.products);
        }
    }, [order])

    function addProduct(product: OrderProduct){
        setProducts([...products, product]);
    }

    function removeProduct(product: OrderProduct){
        setProducts(prevProducts => prevProducts.filter(prod => prod.product_id !== product.product_id));
    }

    function submit(e: React.FormEvent){
        e.preventDefault();

        onSave({
            client_id: client?.id,
            products: products
        })
    }

    return (
        <>
            <form className="card bg-base-100 p-4" onSubmit={submit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Client')}*</legend>
                    <SearchableClientSelect client={client} onChange={(client) => setClient(client)}/>
                    { errors?.client_id ? <p className="label text-error">{errors.client_id[0]}</p> : <></>}
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">{t('Products')}*</legend>
                    <ProductsTable products={products} onRemoveProduct={removeProduct}/>
                    { errors?.products ? <p className="label text-error">{errors.products[0]}</p> : <></>}
                    <button type="button" className="btn" onClick={() => setModalOpen(true)}>{t('Add product')}</button>
                </fieldset>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">{t('Save')}</button>
                </div>
            </form>
            <OrderProductModal modalOpen={modalOpen} onCloseModal={() => setModalOpen(false)} onSaveProduct={addProduct}/>
        </>
    )
}