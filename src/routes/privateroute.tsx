import { ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/layout/Loader";
import Layout from "../components/layout/Layout";


const ClientSubmissionForm = lazy(() => import("../pages/clientsForm/index"));
const Suggestions = lazy(() => import("../pages/clientsForm/Suggestions"));
const Overview = lazy(() => import("../pages/overview"));
const Clients = lazy(() => import("../pages/clients"));
const AddClient = lazy(() => import("../pages/clients/AddClient"));
const Timeline = lazy(() => import("../pages/clients/timeline"));


const isAuthenticated = () => {
    return localStorage.getItem("token") !== null; 
};


const PrivateRoute = ({ element }: { element: ReactElement }) => {
    return isAuthenticated() ? element : <Navigate to="/submissionform" />;
};

const AppRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/submissionform" element={<ClientSubmissionForm />} />
                <Route path="/suggestions" element={<Suggestions />} />

                {/* Redirect root to dashboard */}
                <Route path="/" element={<Navigate to="/dashboard/overview" />} />

                {/* Private Routes (Protected under PrivateRoute) */}
                <Route path="/dashboard" element={<PrivateRoute element={<Layout />} />}>
                    <Route index element={<Overview />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="clients" element={<Clients />} />

                    {/* Keep AddClient persistent while switching between sections */}
                    <Route path="add-client/*" element={<AddClient />}>
                        <Route path="timeline" element={<Timeline />} />
                        <Route index element={<Timeline />} /> {/* Default Route */}
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
