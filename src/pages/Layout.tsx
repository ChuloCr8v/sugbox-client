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
import Profile from "./Profile";
import ResetEmail from "./ResetEmail";
import ResetPassword from "./ResetPassword";
import Settings from "./Settings";
import Signup from "./signup";
import Suggestion from "./Suggestion";
import Suggestions from "./suggestions";
import VerificationSuccessfulPage from "./VerificationSuccessfulPage";
import VerifyOTPPage from "./VerifyOTP";
import ThemeToggle from "../components/ThemeToggle";
import { twMerge } from "tailwind-merge";
import AuthLayout from "../components/AuthLayout";

const Layout = () => {
  const { token } = UseGetAuth();

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-background h-screen overflow-hidden">
      <div className="flex w-full h-full">
        <Header />
        <SideBar />
        <div
          className={twMerge(
            "w-full flex flex-col items-center overflow-y-auto h-full"
          )}
        >
          <div className="flex flex-col items-center  w-full">
            <Routes>
              <Route
                path="/portal"
                element={token ? <Dashboard /> : <AuthLayout />}
              />
              <Route
                path="/*"
                element={token ? <Dashboard /> : <AuthLayout />}
              />
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
                element={token ? <Dashboard /> : <AuthLayout />}
              />
              <Route
                path="/profile/:id"
                element={token ? <Profile /> : <AuthLayout />}
              />
              <Route
                path="/suggestion/:id"
                element={token ? <Suggestion /> : <AuthLayout />}
              />
              <Route
                path="/employees"
                element={token ? <Employees /> : <AuthLayout />}
              />
              <Route
                path="/suggestions"
                element={token ? <Suggestions /> : <AuthLayout />}
              />
              <Route
                path="/my-suggestions"
                element={token ? <MySuggestions /> : <AuthLayout />}
              />
              <Route
                path="/my-profile/:id"
                element={token ? <Profile /> : <AuthLayout />}
              />
              <Route
                path="/profile/:id"
                element={token ? <Profile /> : <AuthLayout />}
              />
              <Route
                path="/moderators/"
                element={token ? <Moderators /> : <AuthLayout />}
              />

              <Route
                path="/settings/:id"
                element={token ? <Settings /> : <AuthLayout />}
              />
              <Route
                path="/reset-email/:id"
                element={token ? <ResetEmail /> : <AuthLayout />}
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

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Layout;
