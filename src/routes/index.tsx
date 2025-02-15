import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/layout/Loader";

const Layout = lazy(() => import("../components/layout/Layout"));
const Overview = lazy(() => import("../pages/overview"));
const Clients = lazy(() => import("../pages/clients"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/overview" />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route path="overview" element={<Overview />} />
          <Route path="clients" element={<Clients />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
