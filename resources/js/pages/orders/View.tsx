import { Link, redirect, useLoaderData, useNavigate, useParams } from "react-router-dom"
import Client from "../../types/client";
import { useEffect, useState } from "react";
import { getClient } from "../../api/clientApi";
import api from "../../api/axios";
import Order from "../../types/order";

export default function OrderView(){
    const { id } = useParams();
    const [ order, setOrder ] = useState<Order>();

    const navigate = useNavigate();

    useEffect(() => {
        api.get('api/products/'+id)
            .then(response => {
                setOrder(response.data.data);
            })
            .catch(err => {
                navigate(-1)
            })
    },[]);

    if(!order) return <p>Loading</p>

    return (
        <>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                    <li>{id}</li>
                </ul>
            </div>
        </>
    )
}