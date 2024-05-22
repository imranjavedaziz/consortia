import React from "react";
import mobileCover from "./assets/img-banner-1-1.png";
import appleStore from "./assets/appstore.svg";
import playStore from "./assets/playstore.svg";

const FreeFloorPlan = () => {
  document.title = "Free Floor Plan";
  return (
    <div className="m-10">
      <div className="text-heading-xs sm:text-heading-sm lg:text-heading-lg mb-10 font-graphik  sm:leading-[44px]">
        Free Floor Plan
      </div>
      <div className="bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] p-[1px] rounded-[24px] mt-10 mb-[7.5rem]">
        <div
          style={{
            background:
              "linear-gradient(94.09deg, #12134d 3.97%, #10053c 51.03%, #12134d 95.99%)",
          }}
          className="w-full pt-10 px-5 sm:p-10 rounded-[24px] relative max-[750px]:h-full max-[1050px]:h-[60vh]"
        >
          <h2 className="text-heading-xs sm:text-heading-sm md:text-heading-lg text-white">
            CubiCasa
          </h2>

          <div className="min-[750px]:flex justify-start items-center">
            <div className="">
              <p className=" z-20 relative break-words sm:max-w-[330px]">
                CubiCasa's floor plan app does it for you. Say goodbye to
                drawing floor plans by hand. All you need is CubiCasa's floor
                plan app. 5 minutes scanning. Easy-to-use mobile app. First scan
                is free. Professional floor plan.
              </p>
              <div className=" flex items-center gap-3">
                <img
                  src={appleStore}
                  className="w-[120px] sm:w-[150px] cursor-pointer z-[9]"
                  alt=""
                />

                <img
                  src={playStore}
                  className="w-[120px] sm:w-[150px] cursor-pointer z-[9]"
                  alt=""
                />
              </div>
            </div>
            <div className="flex justify-center items-center min-[750px]:absolute min-[750px]:right-2 min-[1050px]:top-4 max-[1050px]:-bottom-[7rem]">
              <img src={mobileCover} alt="" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeFloorPlan;
