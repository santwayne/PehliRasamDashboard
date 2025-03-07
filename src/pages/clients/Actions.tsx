import apiClient from "../../config/apiClient";

export const getCustomerProfile = async (customerId: string) => {
    try {
        const response = await apiClient.get(`/admin/customerProfile?customerId=${customerId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching customer profile:", error);
        throw error;
    }
};

export const getFormGroupList = async () => {
    try {
        const response = await apiClient.get(`/admin/getFromGroupList`);
        return response.data;
    } catch (error) {
        console.error("Error fetching form group list:", error);
        throw error;
    }
};
