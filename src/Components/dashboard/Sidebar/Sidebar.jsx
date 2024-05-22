import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../../Context/authContext";
import degreeImg from '../../../../src/assets/degree.png'

function Sidebar() {
  const { userRole, isSideBarOpen, setIsSideBarOpen } = useAuthContext();

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [practitionerNftsIcon, setPractitionerNftsIcon] = useState(false);
  const controlpractitionerNftsIcon = () => {
    if (practitionerNftsIcon) {
      setPractitionerNftsIcon(false);
    } else {
      setPractitionerNftsIcon(true);
    }
  };
  const [propertNftsIcon, setPropertyNftsIcon] = useState(false);
  const controlPropertyNftsIcon = () => {
    if (propertNftsIcon) {
      setPropertyNftsIcon(false);
    } else {
      setPropertyNftsIcon(true);
    }
  };

  // handle sidebar on mobile in different devices

  const handleResize = () => {
    setWindowSize(window.innerWidth);
    if (windowSize < 900) {
      setIsSideBarOpen(false);
    } else {
      setIsSideBarOpen(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  const handleClick = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  // handle outside click
  const sidebarRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    if (windowSize < 900) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [windowSize]);

  // styles for active and normal links below
  const activeLink =
    "flex px-4 my-3 items-center  text-white no-underline  gap-2.5 h-14 bg-gradient-to-r from-[#1D2CDF] to-[#b731ff] border-l-[4px] border-0 border-solid border-white";

  const normalLink =
    "flex px-4 my-3 items-center  text-white no-underline  gap-2.5 h-14 border-l-[4px] border-0 border-solid border-white/0";

  const subCategoryActiveLink =
    "flex items-center my-4 ms-4 py-3 ps-4  text-white no-underline bg-gradient-to-r from-[#1D2CDF] to-[#b731ff] border-l-[4px] border-0 border-solid border-white";

  const subCategoryNormalLink =
    "flex items-center my-4 ms-4 py-3 ps-4 text-white no-underline border-l-[4px] border-0 border-solid border-white/0";

  return (
    <>
      {isSideBarOpen && (
        <div
          ref={sidebarRef}
          className={`h-screen overflow-auto min-w-[200px] sm:min-w-[310px] md:min-w-[290px] bg-gradient-to-r from-[#12134d] via-[#10053c] to-[#12134d] py-6 border-[0.5px] border-[#454470] border-solid md:block`}
          style={
            isSideBarOpen && windowSize < 900
              ? {
                  position: "absolute",
                  zIndex: "999",
                  minHeight: "100vh",
                }
              : {}
          }
        >
          <Link to={"/dashboard/landing"} className="flex justify-center">
            <img
              src="/assets/images/consortiaLogo.svg"
              alt="Consortia logo"
              className="w-[142px] h-[74px]"
            />
          </Link>
          <nav className="mt-[4rem]">
            <NavLink
              onClick={isSideBarOpen && windowSize < 900 ? handleClick : null}
              to="/dashboard/landing"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <img
                src="/assets/icons/property.svg"
                alt=""
                className="w-[22px] h-[22px]"
              />
              <span className="text-[12px] md:text-[14px]">Dashboard</span>
            </NavLink>

            <div>
              <div
                className="flex px-4  text-white items-center no-underline gap-3 cursor-pointer"
                onClick={controlPropertyNftsIcon}
              >
                <img
                  src="/assets/icons/mainProperty.svg"
                  alt=""
                  className="w-[22px] h-[22px]"
                />
                <span className="text-[12px] md:text-[14px]">Property</span>

                <span className="material-symbols-outlined ms-auto text-[gray]">
                  {" "}
                  {!propertNftsIcon ? "chevron_right" : "expand_more"}{" "}
                </span>
              </div>

              {propertNftsIcon && (
                <NavLink
                  onClick={
                    isSideBarOpen && windowSize < 900 ? handleClick : null
                  }
                  className={({ isActive }) =>
                    isActive ? subCategoryActiveLink : subCategoryNormalLink
                  }
                  to="/property/mint-nft"
                >
                  <img
                    src="/assets/icons/mintNFT.svg"
                    alt=""
                    className="w-[22px] h-[22px]"
                  />
                  <span className="text-[12px] md:text-[14px] ms-2">
                    Mint NFT
                  </span>
                </NavLink>
              )}
            </div>

            {userRole === "Practitioner" && (
              <div>
                <div
                  className="flex px-4 mt-6 text-white items-center no-underline gap-2.5 cursor-pointer"
                  onClick={controlpractitionerNftsIcon}
                >
                  <img
                    src="/assets/icons/nft.svg"
                    alt=""
                    className="w-[22px] h-[22px]"
                  />
                  <span className="text-[12px] md:text-[14px]">
                    Practitioner NFT
                  </span>

                  <span className="material-symbols-outlined ms-auto text-[gray]">
                    {" "}
                    {!practitionerNftsIcon
                      ? "chevron_right"
                      : "expand_more"}{" "}
                  </span>
                </div>

                {practitionerNftsIcon && (
                  <NavLink
                    onClick={
                      isSideBarOpen && windowSize < 900 ? handleClick : null
                    }
                    className={({ isActive }) =>
                      isActive ? subCategoryActiveLink : subCategoryNormalLink
                    }
                    to="/practitionerNfts/mint-nft"
                  >
                    <img
                      src="/assets/icons/mintNFT.svg"
                      alt=""
                      className="w-[22px] h-[22px]"
                    />
                    <span className="text-[12px] md:text-[14px] ms-2">
                      Mint NFT
                    </span>
                  </NavLink>
                )}
              </div>
            )}
            <NavLink
              onClick={isSideBarOpen && windowSize < 900 ? handleClick : null}
              to="/nftWallet/NftWallet"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <img
                src="/assets/icons/wallet_light.svg"
                alt=""
                className="w-[22px] h-[22px]"
              />
              <span className="text-[12px] md:text-[14px]">NFT Wallet</span>
            </NavLink>
            <NavLink
              onClick={isSideBarOpen && windowSize < 900 ? handleClick : null}
              to='/consortia-university'
              target="_blank"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <img
                src={degreeImg}
                alt=""
                className="w-[22px] h-[22px]"
              />
              <span className="text-[12px] md:text-[14px]">Consortia University</span>
            </NavLink>
          </nav>
        </div>
      )}
    </>
  );
}

export default Sidebar;
