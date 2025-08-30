import Client from "../types/client";
import api from "./axios";

export function getClients(): Promise<Client[]>{
    return new Promise(async (resolve, reject) => {
        const response = await api.get('/api/clients');

        const clients = response.data.data;
        return resolve(clients);
    })
}

export function createClient(client: Client):Promise<Client>{
    return new Promise(async (resolve, reject) => {
        const response = await api.post('/api/clients', client);

        const newClient = response.data.data;
        return resolve(newClient);
    })
}