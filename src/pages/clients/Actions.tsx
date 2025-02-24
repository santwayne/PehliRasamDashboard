import { ICustomer } from './clientTypes';
import apiClient from "../../config/apiClient";

export const getClient = async (page: number, limit: number) => {
    try {
        const response = await apiClient.get(`/customer?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error("Error Fetching Clients:", error);
        return { data: [], total: 0 };
    }
};

export const addClient = async (clientData: Partial<ICustomer>) => {
    try {
        await apiClient.post('/customer', clientData);
    } catch (error) {
        console.error("Error Creating Client:", error);
    }
};

export const updateClient = async (id: string, clientData: Partial<ICustomer>) => {
    try {
        await apiClient.put(`/customer/${id}`, clientData);
    } catch (error) {
        console.error("Error Updating Client:", error);
    }
};

export const deleteClient = async (id: string) => {
    try {
        await apiClient.delete(`/customer/${id}`);
    } catch (error) {
        console.error("Error Deleting Client:", error);
    }
};


export const getClientById = async (id: string): Promise<ICustomer> => {
    try {
        const response = await apiClient.get(`/customer/${id}`);
        return response.data.data;
    } catch (error: any) {
        console.error("Error Fetching Client by ID:", error?.message || error);
        throw new Error("Failed to fetch client by ID");
    }
};


