import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/layout/Loader";
import Layout from "../components/layout/Layout";

const Submission = lazy(() => import("../pages/clientsForm/index"));
const Suggestions = lazy(() => import("../pages/clientsForm/Suggestions"));

const Overview = lazy(() => import("../pages/overview"));
const TimelineMain = lazy(() => import("../pages/overview/TimelineMain"));
const ProfileUpdate = lazy(() => import("../pages/overview/ProfileUpdate"));
const Clients = lazy(() => import("../pages/clients"));
const AddClient = lazy(() => import("../pages/clients/AddClient"));
const Form = lazy(() => import("../pages/clients/Form"));
const Timeline = lazy(() => import("../pages/clients/timeline"));
const Matches = lazy(() => import("../pages/clients/matches"));
const Photos = lazy(() => import("../pages/clients/photos"));
const Events = lazy(() => import("../pages/clients/events"));
const Communication = lazy(() => import("../pages/clients/communication"));

const Inbox = lazy(() => import("../pages/communication/Inbox"));
const Sent = lazy(() => import("../pages/communication/Sent"));

const Fields = lazy(() => import("../pages/settings/client-settings/Fields"));

const AppRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/submission" element={<Submission />} />
                <Route path="/suggestions" element={<Suggestions />} />
                <Route path="/" element={<Navigate to="/dashboard/overview" />} />

                {/* Dashboard Layout Persistent */}
                <Route path="/dashboard" element={<Layout />}>
                    <Route index element={<Overview />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="timelinemain" element={<TimelineMain />} />
                    <Route path="profile-update" element={<ProfileUpdate />} />


                    <Route path="clients" element={<Clients />} />


                    {/* AddClient stays persistent, timeline loads inside */}
                    <Route path="add-client" element={<AddClient />}>
                        <Route index element={<Form />} />  {/* Default section */}
                        <Route path="form" element={<Form />} />
                        <Route path="timeline" element={<Timeline />} />
                        <Route path="matching" element={<Matches />} />
                        <Route path="photos" element={<Photos />} />
                        <Route path="events" element={<Events />} />
                        <Route path="communication" element={<Communication />} />
                        {/* Add more sub-pages here if needed */}
                    </Route>
                    <Route path="inbox" element={<Inbox />} />
                    <Route path="sent" element={<Sent />} />

                    <Route path="fields" element={<Fields />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
