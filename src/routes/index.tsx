import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/layout/Loader";
import Layout from "../components/layout/Layout";

const Overview = lazy(() => import("../pages/overview"));
const Clients = lazy(() => import("../pages/clients"));
const AddClient = lazy(() => import("../pages/clients/AddClient"));
const Timeline = lazy(() => import("../pages/clients/timeline"));
// const Matching = lazy(() => import("../pages/clients/matching"));
// const Photos = lazy(() => import("../pages/clients/photos"));
// const Events = lazy(() => import("../pages/clients/events"));

const AppRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard/overview" />} />

                {/* Keep Layout Persistent */}
                <Route path="/dashboard" element={<Layout />}>
                    <Route index element={<Overview />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="clients" element={<Clients />} />

                    {/* Keep AddClient persistent while switching between sections */}
                    <Route path="add-client/*" element={<AddClient />}>
                        <Route path="timeline" element={<Timeline />} />
                        {/* <Route path="matching" element={<Matching />} /> */}
                        {/* <Route path="photos" element={<Photos />} /> */}
                        {/* <Route path="events" element={<Events />} /> */}
                        <Route index element={<Timeline />} /> {/* Default Route */}
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
