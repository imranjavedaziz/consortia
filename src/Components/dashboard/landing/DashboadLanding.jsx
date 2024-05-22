import React from "react";
import { useAuthContext } from "../../../Context/authContext";
import Carousel from "../Dashboard_New/CarouselComponent/Carousel";
import DashboardBottomComp from "../Dashboard_New/DashboardBottom/DashboardBottomComp";
import WelcomeVideoPopup from "../Dashboard_New/DashboardBottomLinkedPages/WelcomeVideo/WelcomeVideoPopup";

function DashboadLanding() {
  document.title = "Dashboard";
  const { userRole, videoPopup } = useAuthContext();
  return (
    <>
      {/* video popup */}
      {videoPopup === false && <WelcomeVideoPopup />}


      <div className="max-w-6xl mx-auto">
        <div className="m-10 ">
          <div className="text-heading-xs sm:text-heading-sm lg:text-heading-lg mb-10 font-graphik  sm:leading-[44px]">
            {`${userRole} Dashboard`}
          </div>

          <div className="flex flex-col gap-10 ">
            {/* practition dashboard top */}
            <div className="min-h-[200px] border w-full">
              <Carousel />
            </div>

            {/* practition dashboard bottom */}
            <div className="">
              <DashboardBottomComp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboadLanding;
