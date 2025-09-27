import Client from "./client";
import OrderProduct from "./orderProduct";

type Order = {
    id: number;
    client: Client;
    products: OrderProduct[];
    status: string;
    total_price: string;
    date: string;
};

export default Order;