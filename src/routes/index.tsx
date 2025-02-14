import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from '../components/layout/Loader';



const Layout = lazy(() => import('../components/layout/Layout'));
const Overview = lazy(() => import('../pages/overview'));
const Client = lazy(() => import('../pages/clients'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Layout />}>
                    <Route index path="/dashboard/overview" element={<Overview />} />
                    <Route path="/dashboard/clients" element={<Client />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
