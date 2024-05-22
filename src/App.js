import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import PractitionerNftDetail from "./Components/dashboard/NFTDetail/PractitionerNftDetail";
import PropertyNftDetail from "./Components/dashboard/NFTDetail/PropertyNftDetail";
import MintPractitionerNFTForm from "./Components/dashboard/PractitionerNft/MintPractitionerNFTForm";
import MintPropertyNFTForm from "./Components/dashboard/PropertNft/MintPropertyNFTForm";
import ChangePassword from "./Components/dashboard/Settings/ChangePassword/ChangePassword";
import ProfileDetails from "./Components/dashboard/Settings/Profile/ProfileDetails";
import NftWallet from "./Components/dashboard/Wallet/NftWallet";
import DashboadLanding from "./Components/dashboard/landing/DashboadLanding";
import { useAuthContext } from "./Context/authContext";
import LeadForm from "./Pages/LeadForm";
import ResetPassword from "./Pages/auth/ResetPassword";
import Signup from "./Pages/auth/Signup";
import Login from "./Pages/auth/login";
import Dashboard from "./Pages/dashboard";
import FreeFloorPlan from "./Components/dashboard/Dashboard_New/DashboardBottomLinkedPages/FreeFloorPlanPage/FreeFloorPlan";
import ApplianceInspectionReport from "./Components/dashboard/Dashboard_New/DashboardBottomLinkedPages/ApplianceInspectionPage/ApplianceInspectionReport";
import HomePrepFinancing from "./Components/dashboard/Dashboard_New/DashboardBottomLinkedPages/HomePrepFinancingPage/HomePrepFinancing";
import ConsumerLandingPage from "./Components/dashboard/consumerLandingPage/ConsumerLandingPage";
import PractitionerLandingPage from "./Components/dashboard/practitionerLandingPage/PractitionerLandingPage";
import Iframe from "./Components/iframe/Iframe";

function App() {
  const { navigate } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/consumer/lead-form" element={<ConsumerLandingPage />} />
          <Route path="/practitioner/lead-form" element={<PractitionerLandingPage />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path='/consortia-university' element={<Iframe /> } />

          {navigate ? (
            <>
              <Route element={<Dashboard />}>
                <Route
                  path="/dashboard/landing"
                  element={<DashboadLanding />}
                />
                <Route
                  path="/property/mint-nft"
                  element={<MintPropertyNFTForm />}
                />
                <Route
                  path="/practitionerNfts/mint-nft"
                  element={<MintPractitionerNFTForm />}
                />
                <Route
                  path="dashboard/edit-profile"
                  element={<ProfileDetails />}
                />
                <Route
                  path="/dashboard/change-password"
                  element={<ChangePassword />}
                />
                <Route path="/nftWallet/NftWallet" element={<NftWallet />} />
                <Route
                  path="propertyNftDetail/:id"
                  element={<PropertyNftDetail />}
                />
                <Route
                  path="practitionerNftDetail/:id"
                  element={<PractitionerNftDetail />}
                />
                <Route path="freeFloorPlan" element={<FreeFloorPlan />} />
                <Route
                  path="applianceInspectionReport"
                  element={<ApplianceInspectionReport />}
                />
                <Route
                  path="homePrepFinancing"
                  element={<HomePrepFinancing />}
                />
              </Route>
              <Route path="*" element={<Navigate to="/dashboard/landing" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
