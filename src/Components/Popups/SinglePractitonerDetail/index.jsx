import React from "react";
import profile from "./profile.png";

const SinglePractitionerDetailPopup = ({
  practitionerData,
  setViewPractitionerDetail,
}) => {
  const handleCrossClick = () => {
    setViewPractitionerDetail(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className=" bg-light-blue p-7 sm:p-10  rounded-[24px] text-white">
        <div className="py-[16px] md:px-[25px] md:py-[24px] rounded-3xl relative">
          <h3 className="text-center mb-5 text-heading-xs sm:text-heading-sm lg:text-[2rem] font-graphik leading-[18px] sm:leading-[44px] text-white">
            Practitioner Detail
          </h3>

          <div className="absolute top-0 right-0" onClick={handleCrossClick}>
            <img
              src="/assets/icons/cross.svg"
              alt=""
              className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] cursor-pointer"
            />
          </div>

          <div className=" grid grid-cols-1  md:grid-cols-3  gap-4">
            <div className="col-span-1 flex justify-center items-center">
              <img
                src={
                  (practitionerData && practitionerData?.headshot) || profile
                }
                alt="Profile"
                className="w-[48px] h-[48px] md:w-[140px] md:h-[140px] lg:w-[170px] lg:h-[170px] rounded-full"
              />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-3 mt-5">
              <h2 className="mb-2 text-[12px] md:text-[16px] lg:text-[24px] max-md:text-center">
                {practitionerData && practitionerData?.name}
              </h2>
              <tr className=" text-[12px] md:text-[14px] lg:text-[18px] max-sm:px-5 max-md:px-7">
                <td>Email :</td>
                <td className="pl-4">
                  {practitionerData && practitionerData?.email}
                </td>
              </tr>
              <tr className=" text-[12px] md:text-[14px] lg:text-[18px] max-sm:px-5 max-md:px-7">
                <td>Company :</td>
                <td className="pl-4">
                  {practitionerData && practitionerData?.companyName}
                </td>
              </tr>
              <tr className=" text-[12px] md:text-[14px] lg:text-[18px] max-sm:px-5 max-md:px-7">
                <td>Country :</td>
                <td className="pl-4">
                  {practitionerData && practitionerData?.country}
                </td>
              </tr>
              <tr className=" text-[12px] md:text-[14px] lg:text-[18px] max-sm:px-5 max-md:px-7">
                <td>State :</td>
                <td className="pl-4">
                  {practitionerData &&
                    practitionerData.state}
                </td>
              </tr>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePractitionerDetailPopup;
