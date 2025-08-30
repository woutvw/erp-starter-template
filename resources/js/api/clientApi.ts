import Client from "../types/client";
import api from "./axios";

export function getClients(): Promise<Client[]>{
    return new Promise(async (resolve, reject) => {
        try{
            const response = await api.get('/api/clients');

            const clients = response.data.data;
            return resolve(clients);
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