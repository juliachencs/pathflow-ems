import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import GuestLayout from "../components/layouts/GuestLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import GuestGuard from "../components/guard/GuestGuard";
import DefaultLayout from "../components/layouts/default/DefaultLayout";
import OnBoard from "../pages/boarding/OnBoard";
import OnboardGuard from "../components/guard/OnboardGuard";
import Dashboard from "../pages/DashBoard";
import AuthGuard from "../components/guard/AuthGuard";
import AdminGuard from "../components/guard/RoleGuard";
import Profile from "../pages/profile/Profile";
import MyVisa from "../pages/visa/MyVisa";
import ProfileManage from "../pages/profile/ProfileManage";
import VisaManage from "../pages/visa/VisaManage";
import HiringManage from "../pages/hiring/HiringManage";
import ProfileViewOnly from "../pages/profile/ProfileViewOnly";

const routes = createRoutesFromElements(
  <Route>
    <Route element={<GuestLayout />}>
      <Route element={<GuestGuard />}>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
      </Route>
    </Route>
    {/* <Route element={<AuthGuard />}> */}
      <Route element={<DefaultLayout />}>
        <Route path="/onboarding" element={<OnBoard />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        {/* <Route element={<AdminGuard />}> */}
          <Route path="/hr/profiles" element={<ProfileManage />}></Route>
          <Route path="/hr/visas" element={<VisaManage />}></Route>
          <Route path="/hr/hiring" element={<HiringManage />}></Route>
          <Route path="/profile/:id" element={<ProfileViewOnly />}></Route>
        {/* </Route> */}
        {/* <Route element={<OnboardGuard />}> */}
          <Route path="/profile/me" element={<Profile />}></Route>
          <Route path="/visa/me" element={<MyVisa />}></Route>
        {/* </Route> */}
      </Route>
    {/* </Route> */}
  </Route>,
);

const router = createBrowserRouter(routes);
export default router;
