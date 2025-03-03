import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/layout/Loader";
import Layout from "../components/layout/Layout";

const Overview = lazy(() => import("../pages/overview"));
const Clients = lazy(() => import("../pages/clients"));
const AddClient = lazy(() => import("../pages/clients/AddClient"));
const Timeline = lazy(() => import("../pages/clients/timeline")); 

const AppRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard/overview" />} />

                {/* ✅ Dashboard Layout Persistent */}
                <Route path="/dashboard" element={<Layout />}>
                    <Route index element={<Overview />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="clients" element={<Clients />} />

                    {/* ✅ AddClient stays persistent, timeline loads inside */}
                    <Route path="add-client" element={<AddClient />}>
                        <Route index element={<Timeline />} />  {/* Default section */}
                        <Route path="timeline" element={<Timeline />} />
                        {/* Add more sub-pages here if needed */}
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
