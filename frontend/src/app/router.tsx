import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import OnBoard from "../pages/boarding/OnBoard";
import AdminGuard from "../components/guard/RoleGuard";
import MyVisa from "../pages/visa/MyVisa";
import ProfileManage from "../pages/profile/ProfileManage";
import VisaManage from "../pages/visa/VisaManage";
import HiringManage from "../pages/hiring/HiringManage";
import ProfileViewOnly from "../pages/profile/ProfileViewOnly";
import MyProfile from "../pages/profile/MyProfile";
import GuestLayout from "../components/layouts/guestLayout";
import Login from "../pages/auth/login";
import GuestGuard from "../components/guard/guestGuard";
import Register from "../pages/auth/register";
import AuthGuard from "../components/guard/authGuard";
import OnboardGuard from "../components/guard/onboardGuard";
import DefaultLayout from "../components/layouts/default/defaultLayout";
import Dashboard from "../pages/dashBoard";

const routes = createRoutesFromElements(
  <Route>
    <Route element={<GuestLayout />}>
      // TODO make some page
      <Route path="*" element={<></>}></Route>
      <Route element={<GuestGuard />}>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
      </Route>
    </Route>
    <Route element={<AuthGuard />}>
      <Route element={<DefaultLayout />}>
        <Route path="/onboarding" element={<OnBoard />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route element={<AdminGuard />}>
          <Route path="/hr/profiles" element={<ProfileManage />}></Route>
          <Route path="/hr/visas" element={<VisaManage />}></Route>
          <Route path="/hr/hiring" element={<HiringManage />}></Route>
          <Route path="/profile/:id" element={<ProfileViewOnly />}></Route>
        </Route>
        <Route element={<OnboardGuard />}>
          <Route path="/profile/me" element={<MyProfile />}></Route>
          <Route path="/visa/me" element={<MyVisa />}></Route>
        </Route>
      </Route>
    </Route>
  </Route>,
);

const router = createBrowserRouter(routes);
export default router;
