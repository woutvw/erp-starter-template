import Client from "../types/client";
import api, { LaravelPaginationMeta } from "./axios";

export function getClients(search?: string, page?: number): Promise<{clients: Client[], meta: LaravelPaginationMeta}>{
    return new Promise(async (resolve, reject) => {
        try{
            const response = await api.get('/api/clients',{
                params: {
                    search: search,
                    page: page,
                }
            });

            const clients = response.data.data;
            const meta = response.data.meta;
            return resolve({clients, meta});
        }catch(err){
            reject(err);
        }
    })
}

export function createClient(client: Client):Promise<Client>{
    return new Promise(async (resolve, reject) => {
        try{
            const response = await api.post('/api/clients', client);

            const newClient = response.data.data;
            return resolve(newClient);
        }catch(err){
            reject(err);
        }
    })
}

export function getClient(id: number): Promise<Client>{
    return new Promise(async (resolve, reject) => {
        try{
            const response = await api.get('/api/clients/'+id);

            const client = response.data.data;
            return resolve(client);
        }catch(err){
            reject(err);
        }
    })
}