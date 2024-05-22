import React from "react";
import { useRef } from "react";
import { useAuthContext } from "../../../../../Context/authContext";
import apinew from "../../../../../services/apinew";
import { getId, getToken } from "../../../../../utils/localStorage";
import { EDIT_USER_PROFILE } from "../../../../../constants/endpoints";

const WelcomeVideoPopup = () => {
  const { userRole, setDataResync, setVideoPopup } = useAuthContext();
  const componentRef = useRef();

  const handleCrossClick = async () => {
    setDataResync(false);
    const payload = {
      isWatched: true,
    };

    try {
      setDataResync(false);
      apinew.setJWT(getToken());
      await apinew.patch(
        EDIT_USER_PROFILE + "/" + getId(),
        payload
      );
        setDataResync((prev)=> !prev);
        setVideoPopup(true);
    } catch (error) {
      console.log(false);
    }
  };

  const consumerVideo = "https://consortiamedia.s3.amazonaws.com/Getting+Started+-+WITH+CAPTIONS.mp4";
  // "https://consortiamedia.s3.amazonaws.com/Consumer.mp4"
    
  // const practitionerVideo = "https://www.youtube.com/embed/KwALbwJXbqQ";
  //  "https://consortiamedia.s3.amazonaws.com/Practitioner.mp4"
   
  return (
    <>
      <div
        className="py-4 px-8 fixed inset-0 flex items-center  justify-center z-50 bg-[#232a6f]/80 "
      >
        <div
          ref={componentRef}
          className=" no-scrollbar w-[80%] h-auto overflow-auto mx-auto relative mt-5  p-[1px] rounded-[24px]"
        >
          <img
            onClick={handleCrossClick}
            src="/assets/icons/cross.svg"
            alt=""
            className="w-[22px] h-[22px] sm:w-[29px] sm:h-[29px] absolute top-[1rem] right-[1rem] sm:right-[1rem] sm:top-[1rem] md:right-[2rem] md:top-[2rem] cursor-pointer"
            
          />

          <div className=" h-full w-full">
            <iframe
              className="h-[400px] min-[1600px]:h-[500px] min-[2000px]:h-[600px]"
              width="100%"
              // src={userRole === "Consumer" ? consumerVideo : practitionerVideo}
              src={consumerVideo}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeVideoPopup;
