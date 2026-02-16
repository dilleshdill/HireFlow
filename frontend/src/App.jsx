import React, { Suspense, lazy } from "react";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader.jsx";

const Home = lazy(() => import("./Pages/Home.jsx"));
const Login = lazy(() => import("./Pages/Login.jsx"));
const EmailVerficationPage = lazy(() => import("./Pages/EmailVerficationPage.jsx"));
const UserJobPage = lazy(() => import("./Pages/UserJobPage.jsx"));
const FindJobs = lazy(() => import("./Pages/FindJobs.jsx"));
const RecruterCompanyPage = lazy(() => import("./Pages/RecruterCompanyPage.jsx"));
const FindCompanis = lazy(() => import("./Pages/FindCompanis.jsx"));
const FindCandidates = lazy(() => import("./Pages/FindCandidates.jsx"));
const UserDashboard = lazy(() => import("./Pages/UserDashboard.jsx"));
const CompanyRegistrationPage = lazy(() => import("./Pages/CompanyRegistrationPage.jsx"));
const RecruiterDashboard = lazy(() => import("./Pages/RecruiterDashboard.jsx"));
const RecruiterJobPage = lazy(() => import("./Pages/RecruiterJobPage.jsx"));
const ForgotPage = lazy(() => import("./Pages/ForgotPage.jsx"));
const ResetPage = lazy(() => import("./Pages/ResetPage.jsx"));
const OnlineTestHomePage = lazy(() => import("./Pages/OnlineTest/OnlineTestHomePage.jsx"));
const FindCompanyJobs = lazy(() => import("./Pages/FindCompanyJobs.jsx"));
const OnlineTestConfirmPage = lazy(() => import("./Pages/OnlineTest/OnlineTestConfirmPage.jsx"));
const OnlineTestDetailes = lazy(() => import("./Pages/OnlineTest/OnlineTestDetailes.jsx"));
const OnlineTestExam = lazy(() => import("./Pages/OnlineTest/OnlineTestExam.jsx"));
const OnlineCoadingTest = lazy(() => import("./Pages/OnlineTest/OnlineCoadingTest.jsx"));
const RecruiterTestDetailes = lazy(() => import("./Pages/RecruiterTestDetailes.jsx"));
const FeedBackPage = lazy(() => import("./Pages/FeedBackPage.jsx"));
const MyRounds = lazy(() => import("./Components/MyRounds.jsx"));
const CompanyProfile = lazy(() => import("./Pages/CompanyProfile.jsx"));
const ForgetEmailVerfication = lazy(() => import("./Pages/ForgetEmailVerfication.jsx"));
const NotFound = lazy(() => import("./Pages/NotFound.jsx"));

const App = () => {
  return (
    <>
      <Toaster />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verification" element={<EmailVerficationPage />} />
          <Route path="/user/job-page/:id" element={<UserJobPage />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/company-details/:id" element={<RecruterCompanyPage />} />
          <Route path="/find-companies" element={<FindCompanis />} />
          <Route path="/find-candidates/:id" element={<FindCandidates />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/company-registration" element={<CompanyRegistrationPage />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter-jobpage" element={<RecruiterJobPage />} />
          <Route path="/forget-password" element={<ForgotPage />} />
          <Route path="/reset-password" element={<ResetPage />} />
          <Route path="/job/homepage/:id" element={<OnlineTestHomePage />} />
          <Route path="/company-jobs/:id" element={<FindCompanyJobs />} />
          <Route path="/job/confirmtest/:id" element={<OnlineTestConfirmPage />} />
          <Route path="/job/test/detailes/:id" element={<OnlineTestDetailes />} />
          <Route path="/job/test/exam/:id" element={<OnlineTestExam />} />
          <Route path="/job/test/coading-test/:id" element={<OnlineCoadingTest />} />
          <Route path="/questions-setup/:id" element={<RecruiterTestDetailes />} />
          <Route path="/feedback" element={<FeedBackPage />} />
          <Route path="/my-rounds" element={<MyRounds />} />
          <Route path="/company-profile/:id" element={<CompanyProfile />} />
          <Route path="/forget-email" element={<ForgetEmailVerfication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
