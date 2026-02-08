import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import GuestLayout from "../components/layouts/GuestLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/register";

const routes = createRoutesFromElements(
  <Route element={<GuestLayout />}>
    <Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Register />}></Route>
    </Route>
  </Route>,
);

const router = createBrowserRouter(routes);
export default router;
