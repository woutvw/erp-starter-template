import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import ApiErrors from "../../types/apiErrors";
import Supplier from "../../types/supplier";
import Product from "../../types/product";
import EntitySelect from "../../components/EntitySelect";

interface ProductFormProps {
    product?: Product
    errors: ApiErrors
    onSave: (client: any) => void
}

export default function ProductForm({ product, errors, onSave }: ProductFormProps){
    const [sku, setSku] = useState('');
    const [name, setName] = useState('');
    const [supplier, setSupplier] = useState<number>();
    const [category, setCategory] = useState<number>();
    const [descripiton, setDescription] = useState('');
    const [salePrice, setSalePrice] = useState<string>();
    const [purchasePrice, setPurchasePrice] = useState<string>();
    const [quantity, setQuantity] = useState<string>();

    const {t} = useTranslation();

    useEffect(() => {
        if(product){
            setSku(product.sku);
            setName(product.name);
            setSupplier(product.supplier.id)
            setCategory(product.category?.id)
            setDescription(product.description || '');
            setSalePrice(product.sale_price + '');
            setPurchasePrice(product.purchase_price + '');
            setQuantity(product.quantity + '');
        }
    }, [product])

    function submit(e: React.FormEvent){
        e.preventDefault();

        onSave({
            sku: sku,
            name: name,
            supplier_id: supplier,
            category_id: category,
            description: descripiton,
            sale_price: Number(salePrice),
            purchase_price: Number(purchasePrice),
            quantity: Number(quantity)
        })
    }

    return (
        <form className="card bg-base-100 p-4" onSubmit={submit}>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('SKU')}*</legend>
                <input value={sku} onChange={e => setSku(e.target.value)} className="input focus:outline-none w-full"/>
                { errors?.sku ? <p className="label text-error">{errors.sku[0]}</p> : <></>}
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('Name')}*</legend>
                <input value={name} onChange={e => setName(e.target.value)} className="input focus:outline-none w-full"/>
                { errors?.name ? <p className="label text-error">{errors.name[0]}</p> : <></>}
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('Supplier')}*</legend>
                <EntitySelect uri="/api/suppliers" label="Select a supplier" value={supplier} onChange={e => setSupplier(Number(e.target.value))}/>
                { errors?.supplier_id ? <p className="label text-error">{errors.supplier_id[0]}</p> : <></>}
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('Category')}</legend>
                <EntitySelect uri="/api/categories" label="Select a category" value={category} onChange={e => setCategory(Number(e.target.value))}/>
                { errors?.category_id ? <p className="label text-error">{errors.category_id[0]}</p> : <></>}
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('Description')}</legend>
                <input value={descripiton} onChange={e => setDescription(e.target.value)} className="input focus:outline-none w-full"/>
                { errors?.descripiton ? <p className="label text-error">{errors.descripiton[0]}</p> : <></>}
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('Sale price')}</legend>
                <input type="number" value={salePrice} onChange={e => setSalePrice(e.target.value)} className="input focus:outline-none w-full"/>
                { errors?.sale_price ? <p className="label text-error">{errors.sale_price[0]}</p> : <></>}
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('Purchase price')}</legend>
                <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} className="input focus:outline-none w-full"/>
                { errors?.purchase_price ? <p className="label text-error">{errors.purchase_price[0]}</p> : <></>}
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{t('Quantity')}</legend>
                <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="input focus:outline-none w-full"/>
                { errors?.quantity ? <p className="label text-error">{errors.quantity[0]}</p> : <></>}
            </fieldset>
            <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">{t('Save')}</button>
            </div>
        </form>
    )
}