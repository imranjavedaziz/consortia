import React, { useState } from "react";
import { Outlet } from "react-router";
import TopRightIcons from "../../Components/dashboard/Settings/TopRightIcons";
import Sidebar from "../../Components/dashboard/Sidebar/Sidebar";
import { useAuthContext } from "../../Context/authContext";
import SessionTimeout from "../../services/SessionTimeout";
import ProfileForm from "./ProfileForm/ProfileForm";

const Dashboard = () => {
  const { headshot, userRole, profileDetail } = useAuthContext();
  const [controlProfileForm, setControlProfileForm] = useState(true);

  return (
    <>
      <SessionTimeout />
      <div className="bg-blockchain-bg bg-no-repeat text-white bg-cover min-h-screen">
        <div className="flex h-full min-h-screen">
          {/*-------- dashboard sidebar ---------- */}
          <Sidebar />
          {/*-------- dashboard right ---------- */}
          <div className="h-screen w-full overflow-auto">
            <TopRightIcons />

            {userRole === "Consumer"
              ? profileDetail &&
                !headshot &&
                controlProfileForm && (
                  <ProfileForm setControlProfileForm={setControlProfileForm} />
                )
              : userRole === "Practitioner"
              ? profileDetail &&
                ((!headshot && !profileDetail?.bio) ||
                  !profileDetail?.licenseSince ||
                  !profileDetail?.city ||
                  !profileDetail?.address ||
                  !profileDetail?.zipCode) &&
                controlProfileForm && (
                  <ProfileForm setControlProfileForm={setControlProfileForm} />
                )
              : null}

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
