import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing, Error, Register, ProtectedRoute } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Profile, Stats, SharedLayout } from "./pages/dashboard";
import VerifyPage from "./pages/Verify";
import ForgetPassword from "./pages/ForgetPassword";
import AllContacts from "./pages/dashboard/AllContacts";
import Addcontact from "./pages/dashboard/AddContact";
import ResetPasswordForm from "./pages/ResetPassword";
import OTPPage from "./pages/OTPPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-contacts" element={<AllContacts />} />
          <Route path="add-contact" element={<Addcontact />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="/user/verify-email" element={<VerifyPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/user/reset-password" element={<ResetPasswordForm />} />
        <Route path="/user/OTP" element={<OTPPage />} />


        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
