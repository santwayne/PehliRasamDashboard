import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from '../components/layout/Loader';


const Dashboard = lazy(() => import('../pages/Dashboard'));
const Layout = lazy(() => import('../components/layout/Layout'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
