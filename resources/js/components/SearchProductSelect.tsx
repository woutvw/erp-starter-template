import React, { useEffect, useState } from "react"
import api from "../api/axios";
import useDebounce from "../hooks/useDebounce";
import Product from "../types/product";

interface SearchableProductSelectProps {
    product: Product|undefined
    onChange: (product: Product) => void
}

export default function SearchProductSelect({product, onChange}: SearchableProductSelectProps){
    const [ products, setProducts ] = useState<Product[]>([]);

    const [ search, setSeatch ] = useState('');
    const debouncedSearch = useDebounce(search, 400);

    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        if(product) setSeatch(product.name);
    },[product])

    useEffect(() => {
        api.get('/api/products', {
            params: {
                search: debouncedSearch
            }
        })
            .then(response => {
                const data = response.data.data;
                setProducts(data);
            })
    },[debouncedSearch])

    function handleFocus(e: React.FocusEvent<HTMLInputElement>){
        if(search){
            // TODO: select all chars in the input
        }
        setOpen(true);
    }

    function handleBlur(){
        setTimeout(() => {
            setOpen(false);
        },100)
    }

    function Options(){
        return (
            <div className="rounded bg-white border absolute w-full mt-1 max-h-40 overflow-auto z-10">
                {products.map((product) => (
                    <div key={product.id} className="p-2 hover:bg-base-200 cursor-pointer" onClick={() => onChange(product)}>
                        <p>{product.name}</p>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="relative">
            <input value={search} onChange={(e) => setSeatch(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} className="input select focus:outline-none w-full"/>
            { open && <Options/> }
        </div>
    )
}