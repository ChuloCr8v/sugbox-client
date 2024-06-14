import { Route, Routes } from "react-router-dom";
import EditCompanyForm from "../components/EditCompanyForm";
import Header from "../components/Header";
import NewEmployeeModal from "../components/NewEmployeeModal";
import SideBar from "../components/SideBar";
import PopUpAlert from "../components/modals/Alert";
import SuggestionModal from "../components/modals/SuggestionModal";
import Dashboard from "./Dashboard";
import Login from "./login";
import Profile from "./Profile";
import Portal from "./portal";
import Suggestion from "./Suggestion";
import UseGetAuth from "../hooks/useGetAuth";
import EditSuggestionModal from "../components/modals/EditSuggestionModal";
import MySuggestions from "./MySuggestions";
import ResetPassword from "./ResetPassword";
import VerifyOTPPage from "./VerifyOTP";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import Settings from "./Settings";
import ResetEmail from "./ResetEmail";
import Signup from "./signup";
import VerificationSuccessfulPage from "./VerificationSuccessfulPage";
import LoginPageRedirect from "./LoginPageRedirect";
import Employees from "./Employees";
import Suggestions from "./suggestions";
import SendEmailModal from "../components/modals/SendEmailModal";

const Layout = () => {
  const { token } = UseGetAuth();

  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        <Header />
        <SideBar />
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center  w-full">
            <Routes>
              <Route
                path="/portal"
                element={token ? <Dashboard /> : <Portal />}
              />
              <Route path="/*" element={token ? <Dashboard /> : <Portal />} />
              <Route
                path="/signup"
                element={token ? <Dashboard /> : <Signup />}
              />
              <Route path="/login-redirect" element={<LoginPageRedirect />} />
              <Route
                path="/login/:loginRole"
                element={token ? <Dashboard /> : <Login />}
              />
              <Route
                path="/dashboard"
                element={token ? <Dashboard /> : <Portal />}
              />
              <Route
                path="/profile/:id"
                element={token ? <Profile /> : <Portal />}
              />
              <Route
                path="/suggestion/:id"
                element={token ? <Suggestion /> : <Portal />}
              />
              <Route
                path="/employees"
                element={token ? <Employees /> : <Portal />}
              />
              <Route
                path="/suggestions"
                element={token ? <Suggestions /> : <Portal />}
              />
              <Route
                path="/my-suggestions"
                element={token ? <MySuggestions /> : <Portal />}
              />
              <Route
                path="/my-profile/:id"
                element={token ? <Profile /> : <Portal />}
              />
              <Route
                path="/profile/:id"
                element={token ? <Profile /> : <Portal />}
              />

              <Route
                path="/settings/:id"
                element={token ? <Settings /> : <Portal />}
              />
              <Route
                path="/reset-email/:id"
                element={token ? <ResetEmail /> : <Portal />}
              />
              <Route
                path="/verify-otp/:id/:action"
                element={<VerifyOTPPage />}
              />
              <Route path="/reset-password/:id" element={<ResetPassword />} />
              <Route path="/forgot-password/" element={<ForgotPassword />} />
              <Route
                path="/verify-organization/:token/:id"
                element={<VerificationSuccessfulPage />}
              />
              <Route
                path="/change-password/:token/:id"
                element={<ChangePassword />}
              />
            </Routes>
          </div>
        </div>
        {/** Modals */}
        <SuggestionModal />
        <EditSuggestionModal />
        <PopUpAlert />
        <NewEmployeeModal />
        <EditCompanyForm />
        <SendEmailModal />
      </div>
    </div>
  );
};

export default Layout;
