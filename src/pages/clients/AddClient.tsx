import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MembershipForm from "./Form";
import { getClient } from "./Actions";
import { ICustomer } from "./clientTypes";
import { message } from "antd";

const defaultClientData: ICustomer = {
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
};



const AddClient = ({ clientId }: { clientId?: string }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ICustomer>({ ...defaultClientData });

    const location = useLocation();
    const showMembershipForm = location.pathname === "/dashboard/add-client";

    useEffect(() => {
        if (clientId) {
            setLoading(true);
            getClient(Number(clientId), 1)
                .then((response) => setFormData((prevData) => ({ ...prevData, ...response?.data })))
                .catch(() => message.error("Failed to fetch client details"))
                .finally(() => setLoading(false));
        }
    }, [clientId]);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="pl-[27%] flex-1 overflow-y-auto">
                <Header />

                <div className="pl-[0%] flex-1 bg-gray-100 h-screen p-6">
                    {/* ✅ Show Membership Form only if it's the add-client route */}
                    {showMembershipForm ? (
                        <MembershipForm
                            clientId={clientId}
                            formData={formData}
                            setFormData={setFormData}
                            setLoading={setLoading}
                            loading={loading}
                        />
                    ) : (
                        <Outlet />
                    )}
                </div>

            </div>
        </div>
    );
};

export default AddClient;
