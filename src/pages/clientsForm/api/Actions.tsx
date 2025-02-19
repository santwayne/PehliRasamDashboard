import apiClient from '../../../config/apiClient';
import { ICustomer } from '../types/clientTypes';


export const createClient = async (clientData: Partial<ICustomer>) => {
    try {
        await apiClient.post('/customer', clientData);
    } catch (error) {
        console.error("Error Creating Client:", error);
    }
};


export const fetchClient = async (page: number, limit: number) => {
    try {
        const response = await apiClient.get(`/customer?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error("Error Fetching Customer:", error);
        return { data: [], total: 0 };
    }
};
