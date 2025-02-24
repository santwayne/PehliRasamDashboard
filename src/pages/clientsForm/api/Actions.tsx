import apiClient from '../../../config/apiClient';
import { ICustomer } from '../types/clientTypes';


export const createClient = async (clientData: Partial<ICustomer>) => {
    try {
        await apiClient.post('/customer', clientData);
    } catch (error) {
        console.error("Error Creating Client:", error);
    }
};

