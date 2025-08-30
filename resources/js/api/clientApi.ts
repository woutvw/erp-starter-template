import Client from "../types/client";
import api from "./axios";

export function getClients(): Promise<Client[]>{
    return new Promise(async (resolve, reject) => {
        const response = await api.get('/api/clients');

        const clients = response.data.data;
        return resolve(clients);
    })
}