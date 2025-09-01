import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "../../components/Icon";
import DataTable from "../../components/DataTable";
import Supplier from "../../types/supplier";

export default function SupplierList() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li>{t('Suppliers')}</li>
                </ul>
            </div>
            <DataTable uri="api/suppliers" createLink="/suppliers/create" createText="Add supplier" onDataUpdate={(suppliers) => setSuppliers(suppliers)}>
                <thead>
                    <tr>
                        <th>{t('Name')}</th>
                        <th className="w-20"></th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(supplier => (
                        <tr key={supplier.id} onClick={(e) => { console.log(e); navigate('/suppliers/' + supplier.id) }} className="hover:bg-base-300 cursor-pointer">
                            <td>{supplier.name}</td>
                            <td className="flex justify-center">
                                <Link onClick={e => {e.stopPropagation()}} to={'/suppliers/'+supplier.id+'/edit'} className="hover:text-primary">
                                    <Icon name="pencil" className="w-5"/>
                                </Link>
                                <button onClick={e => {e.stopPropagation()}} className="hover:text-error">
                                    <Icon name="bin" className="w-5"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </DataTable>
        </>
    )
}