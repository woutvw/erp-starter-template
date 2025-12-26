import axios from "axios";

export interface LaravelPaginationMeta{
    from: number,
    to: number,
    per_page: number,
    current_page: number,
    total: number,
    last_page: number,
}

const api = axios.create({
    headers: {
        Accept: "application/json",
    },
})

export default api;