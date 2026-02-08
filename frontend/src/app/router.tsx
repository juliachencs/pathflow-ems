import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import GuestLayout from "../components/layouts/guestLayout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import GuestGuard from "../components/guard/guestGuard";
import DefaultLayout from "../components/layouts/default/defaultLayout";
import Boarding from "../pages/boarding/boarding";
import OnboardGuard from "../components/guard/onboardGuard";
import Dashboard from "../pages/dashBoard";
import AuthGuard from "../components/guard/authGuard";

const routes = createRoutesFromElements(
  <Route>
    <Route element={<GuestLayout />}>
      <Route element={<GuestGuard />}>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
      </Route>
    </Route>
    <Route element={<AuthGuard />}>
      <Route element={<DefaultLayout />}>
        <Route path="/onboarding" element={<Boarding />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route element={<OnboardGuard />}>
          <Route></Route>
        </Route>
      </Route>
    </Route>
  </Route>,
);

const router = createBrowserRouter(routes);
export default router;
