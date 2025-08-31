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
                    <li>{t('Clients')}</li>
                </ul>
            </div>
            <DataTable uri="api/suppliers" createLink="/supplier/create" createText="Create supplier" onDataUpdate={(suppliers) => setSuppliers(suppliers)}>
                <thead>
                    <tr>
                        <th>{t('Name')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(supplier => (
                        <tr key={supplier.id} onClick={() => { navigate('/suppliers/' + supplier.id) }} className="hover:bg-base-300 cursor-pointer">
                            <td>{supplier.name}</td>
                            <td>
                                <button className="hover:text-error">
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