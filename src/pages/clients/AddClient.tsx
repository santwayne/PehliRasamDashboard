import Sidebar from "./Sidebar";
import Header from "./Header";
import MembershipForm from "./Form";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { addClient, updateClient, getClient } from "./Actions";
import { ICustomer } from "./clientTypes";

const AddClient = ({ clientId }: { clientId?: string }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ICustomer>({
        name: "",
        email: "",
        contact: "",
        countryCode: "",
        location: "",
        latlng: [],
        gender: "Male",
        birthdate: "",
        maritalStatus: "Never Married",
        profileNote: "",
        profileMadeBy: "Self",
        memberShipType: "Active Client",
        registeredBy: "Admin",
        amount: "100",
        appearance: "Hair-cut",
        religion: "Sikh",
        height: "",
        moreAboutMartialStatus: "",
        vegetarian: "Yes",
        doYouDrinkAlcohol: "No",
        doYouSmoke: "No",
        phoneNumber: "",
        userCode: "",
        nameOfHighSchool: "",
        education: "",
        employment: "",
        income: "",
        profession: "",
        familyAffluenceLevel: "",
        fatherEmployment: "",
        motherEmployment: "",
        otherFamilyDetails: "",
        fatherName: "",
        motherName: "",
        residencyStatus: "",
        livingInSince: "",
        countryLiving: "",
        countryGrewUpIn: "",
        propertyDetails: "",
    });

    // Fetch client data if updating
    useEffect(() => {
        if (clientId) {
            setLoading(true);
            getClient(Number(clientId), 1)
                .then((response) => {
                    const clientData = response?.data ?? {};
                    setFormData((prevData) => ({
                        ...prevData,
                        ...clientData, 
                    }));
                })
                .catch(() => message.error("Failed to fetch client details"))
                .finally(() => setLoading(false));
        }
    }, [clientId]);
    

    const handleSave = async () => {
        setLoading(true);
        try {
            if (clientId) {
                await updateClient(clientId, formData);
                message.success("Client updated successfully!");
            } else {
                await addClient(formData);
                message.success("Client added successfully!");
            }
        } catch (error) {
            message.error("Error saving client data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="pl-[27%] flex-1 overflow-y-auto">
                <Header />
                <div className="pl-[0%] flex-1 bg-gray-100 h-screen p-6">
                    <div className="bg-white p-6 shadow-md rounded-md flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">{clientId ? "Update Client" : "Add Client"}</h2>
                        <Button type="primary" onClick={handleSave} loading={loading}>
                            {clientId ? "Update" : "Save"}
                        </Button>
                    </div>

                    <MembershipForm formData={formData} setFormData={setFormData} />
                </div>
            </div>
        </div>
    );
};

export default AddClient;
