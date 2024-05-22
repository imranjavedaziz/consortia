import React, { useState } from "react";
import { useAuthContext } from "../../../Context/authContext";
import { EDIT_USER_PROFILE } from "../../../constants/endpoints";
import api from "../../../services/api";
import { getId, getToken } from "../../../utils/localStorage";
import CustomFileUpload from "../../common/CustomFileUpload";
import CustomButton from "../../customButtons";

function ChaneImage({ setPopupController }) {
  const { setHeadshot } = useAuthContext();
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async () => {
    try {
      api.setJWT(getToken());
      const res = await api.patch(`${EDIT_USER_PROFILE}/${getId()}`, {
        headshot: imageUrl,
      });
      if (res?.data?.success) {
        setPopupController(false);
        setHeadshot(res?.data?.data?.headshot);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 ">
      <div className="bg-light-blue p-7 sm:p-10 relative  w-[80%] sm:w-[380px] md:w-[571px] rounded-[24px] text-white ">
        {/* cross icon */}

        <div
          onClick={() => {
            setPopupController(false);
          }}
        >
          <img
            src="/assets/icons/cross.svg"
            alt=""
            className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] absolute right-8 sm:right-10 top-[2rem] sm:top-[3.5rem] cursor-pointer "
          />
        </div>

        <h2 className="text-heading-xs sm:text-heading-sm md:text-heading-lg font-semibold ">
          Profile Photo
        </h2>

        <p className="text-[10px] sm:text-[15px] md:text-xl my-3">
          Please upload profile photo to update your Headshot
        </p>
        <div className="mx-10 mt-5">
          <CustomFileUpload
            labelName="Headshot:"
            grayText="Files types supported: JPG, PNG Max Size: 5MB"
            formId={1}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            borderRadius=" "
            maxFileSize={5}
          />

          <div
            className="sm:gap-8 mt-5 sm:mt-14"
            onClick={() => {
              handleSubmit();
            }}
          >
            <CustomButton text="Update Headshot" py="sm:py-2.5" />
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default ChaneImage;
