import { Route, Routes } from "react-router-dom";
import EditCompanyForm from "../components/EditCompanyForm";
import Header from "../components/Header";
import AddNewModerator from "../components/modals/AddNewModerator";
import EditSuggestionModal from "../components/modals/EditSuggestionModal";
import SendEmailModal from "../components/modals/SendEmailModal";
import SuggestionModal from "../components/modals/SuggestionModal";
import NewEmployeeModal from "../components/NewEmployeeModal";
import SideBar from "../components/SideBar";
import UseGetAuth from "../hooks/useGetAuth";
import ChangePassword from "./ChangePassword";
import Dashboard from "./Dashboard";
import Employees from "./Employees";
import ForgotPassword from "./ForgotPassword";
import Login from "./login";
import LoginPageRedirect from "./LoginPageRedirect";
import Moderators from "./moderators";
import MySuggestions from "./MySuggestions";
import Portal from "./portal";
import Profile from "./Profile";
import ResetEmail from "./ResetEmail";
import ResetPassword from "./ResetPassword";
import Settings from "./Settings";
import Signup from "./signup";
import Suggestion from "./Suggestion";
import Suggestions from "./suggestions";
import VerificationSuccessfulPage from "./VerificationSuccessfulPage";
import VerifyOTPPage from "./VerifyOTP";

const Layout = () => {
  const { token } = UseGetAuth();

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <div className="flex w-full">
        <Header />
        <SideBar />
        <div className="w-full flex flex-col items-center lg:pl-16">
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
                path="/moderators/"
                element={token ? <Moderators /> : <Portal />}
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
        <NewEmployeeModal />
        <EditCompanyForm />
        <SendEmailModal />
        <AddNewModerator />
        {/* <CustomModal /> */}
      </div>
    </div>
  );
};

export default Layout;
