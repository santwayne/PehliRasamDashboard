import axios from "axios";

export const getCustomerProfile = async (customerId: string) => {
    try {
        const response = await axios.get(`http://localhost:8098/api/v1/admin/customerProfile?customerId=${customerId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching customer profile:", error);
        throw error;
    }
};
