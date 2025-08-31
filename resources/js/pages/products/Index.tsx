import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "../../components/Icon";
import useDebounce from "../../hooks/useDebounce";
import api from "../../api/axios";
import Product from "../../types/product";

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    const debouncedSearch = useDebounce(search, 400);

    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        fetchProducts(1);
    }, [debouncedSearch])

    function fetchProducts(page: number){
        api.get('/api/products',{
            params: {
                search: debouncedSearch,
                page: page
            }
        })
            .then((response) => {
                const products = response.data.data;
                setProducts(products)

                const meta = response.data.meta;
                setCurrentPage(meta.current_page);
                setLastPage(meta.last_page);
            })
    }


    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li>{t('Products')}</li>
                </ul>
            </div>
            <div className="mb-2 flex justify-between">
                <input className="input focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
                <Link to="/products/create" className="btn btn-primary">{t('Add product')}</Link>
            </div>
            <div className="rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{t('SKU')}</th>
                            <th>{t('Name')}</th>
                            <th>{t('Supplier')}</th>
                            <th>{t('Price')}</th>
                            <th>{t('Quantity')}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} onClick={() => { navigate('/product/' + product.id) }} className="hover:bg-base-300 cursor-pointer">
                                <td>{product.sku}</td>
                                <td>{product.name}</td>
                                <td>{product.supplier.name}</td>
                                <td>€ {product.sale_price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button className="hover:text-error">
                                        <Icon name="bin" className="w-5"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end">
                <div className="join mt-2">
                    <button className="join-item btn" disabled={currentPage === 1} onClick={() => fetchProducts(currentPage - 1)}>«</button>
                    <button className="join-item btn">Page {currentPage}</button>
                    <button className="join-item btn" disabled={currentPage === lastPage} onClick={() => fetchProducts(currentPage + 1)}>»</button>
                </div>
            </div>
        </>
    )
}