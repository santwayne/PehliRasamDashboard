import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MembershipForm from "./Form";

const AddClient = () => {

    const location = useLocation();
    const showMembershipForm = location.pathname === "/dashboard/add-client";

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="pl-[27%] flex-1 overflow-y-auto">
                <Header />

                <div className="pl-[0%] flex-1 bg-gray-100 h-screen p-6">

                    {showMembershipForm ? (
                        <MembershipForm />
                    ) : (
                        <Outlet />
                    )}
                </div>

            </div>
        </div>
    );
};

export default AddClient;
