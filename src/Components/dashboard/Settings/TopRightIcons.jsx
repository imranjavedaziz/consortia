import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../Context/authContext";
import profileIcon from "./profile.png";
import settingIcon from "./setting.svg";

function TopRightIcons() {
  const { handleLogout, headshot, isSideBarOpen, setIsSideBarOpen } =
    useAuthContext();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const handleSettingsClick = () => {
    if (isPopupVisible) {
      setPopupVisible(false);
    } else {
      setPopupVisible(true);
    }
  };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // handle side bar
  const handleClick = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <>
      <div className=" my-16 ms-auto flex justify-end items-center relative">
        <div className="flex justify-between items-center w-full px-8 sm:px-16">
          <button
            type="button"
            className={`w-[38px] h-[38px] cursor-pointer sm:w-[48px] sm:h-[48px]  border-0 bg-white/0 ${
              isSideBarOpen ? "hidden" : ""
            }`}
            onClick={handleClick}
          >
            <img
              src="/assets/icons/hamburgerIcon.svg"
              alt="hamburger icon"
              className="w-full"
            />
          </button>
          <div className="flex justify-end items-center ms-auto">
            <div
              className="me-3 cursor-pointer"
              id="settings-button"
              onClick={handleSettingsClick}
            >
              <img
                src={settingIcon}
                alt="settingIcon"
                height={"33px"}
                width={"33px"}
              />
            </div>
            <Link to="/dashboard/edit-profile" className="rounded-full">
              <img
                className="rounded-full"
                src={headshot ? headshot : profileIcon}
                alt=""
                height={"30px"}
                width={"30px"}
              />
            </Link>
          </div>
        </div>

        {isPopupVisible && (
          <div
            className="text-black bg-white absolute top-10 right-24 text-left rounded-lg cursor-pointer w-[210px]"
            id="popup"
            ref={popupRef}
          >
            <Link
              to={"/dashboard/edit-profile"}
              className="flex  no-underline	 p-3 ps-4 text-black"
            >
              <img src="/assets/icons/profile.svg" alt="" />
              <p className="ps-4">Profile</p>
            </Link>
            <Link
              to={"/dashboard/change-password"}
              className="flex no-underline	 p-3 ps-4 text-black"
            >
              <img src="/assets/icons/changePassword.svg" alt="" />
              <p className="ps-4">Change Password</p>
            </Link>
            <Link
              to={"/"}
              onClick={handleLogout}
              className="flex no-underline	 p-3 ps-4 text-black"
            >
              <img src="/assets/icons/logout.svg" alt="" />
              <p className="ps-4 ">Logout</p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default TopRightIcons;
