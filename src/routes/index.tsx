import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/layout/Loader";
import Layout from "../components/layout/Layout";

const Overview = lazy(() => import("../pages/overview"));
const Clients = lazy(() => import("../pages/clients"));
const AddClient = lazy(() => import("../pages/clients/AddClient"));
const ClientForm = lazy(() => import("../pages/clientsForm"));

const AppRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/submissionform" element={<ClientForm />} />
                {/* <Route path="/auth/login" element={<Login />} /> */}
                <Route path="/" element={<Navigate to="/dashboard/overview" />} />

                {/* Keep Layout persistent */}
                <Route path="/dashboard" element={<Layout />}>
                    <Route index element={<Overview />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="add-client" element={<AddClient />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
