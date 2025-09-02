import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "../../components/Icon";
import DataTable from "../../components/DataTable";
import Order from "../../types/order";

export default function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);

    const { t } = useTranslation();
    const navigate = useNavigate();


    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">{t('Home')}</Link></li>
                    <li>{t('Orders')}</li>
                </ul>
            </div>
            <DataTable uri="api/orders" createLink="/orders/create" createText="Create order" onDataUpdate={(orders) => setOrders(orders)}>
                <thead>
                    <tr>
                        <th>{t('Client')}</th>
                        <th>{t('Status')}</th>
                        <th>{t('Price')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} onClick={() => { navigate('/orders/' + order.id) }} className="hover:bg-base-300 cursor-pointer">
                            <td>{order.client.name}</td>
                            <td>{order.status}</td>
                            <td>€ {order.total_price}</td>
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