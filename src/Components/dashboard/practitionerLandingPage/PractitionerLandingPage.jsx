import React, { useState } from "react";
// import "./style.css";
import rightArrow from "../../../assets/right-arr (1).png";
import check from "../../../assets/fourth-sec-1.png";
import check_1 from "../../../assets/fourth-sec-2.png";
import check_2 from "../../../assets/fourth-sec-3.png";
import realstate from "../../../assets/realstate.png";
import third_sec_2 from "../../../assets/third-sec-img-2.png";
import third_sec_3 from "../../../assets/third-sec-img-3.png";
import Signup from "../../../Pages/LeadForm";
import blueLogo from "../../../assets/blue-logo.png";
import blueUser from "../../../assets/blue-user.png";

const PractitionerLandingPage = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);

  const handleClick = () => {
    setShowLeadForm(true);
  };

  const practitionerVideo =
    "https://consortiamedia.s3.amazonaws.com/Practitioner.mp4";
  return (
    <>
      {showLeadForm && <Signup setShowLeadForm={setShowLeadForm} />}
      <div
        className="w-full overflow-x-hidden h-screen overflow-auto"
        style={{ boxSizing: "border-box" }}
      >
        <div className="px-[10%] py-[4%] bg-[#0d1353] h-auto overflow-x-hidden">
          <h1 className="text-[1.6rem] text-center sm:text-[3rem] md:text-[4rem] lg:text-[6rem] text-[#c1ff72]">
            MINT YOUR AGENT NFT
          </h1>
          <h2 className="text-[1rem] text-center sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] text-[white]">
            AND NEVER BE FORGOTTEN
          </h2>

          <div className="flex justify-center mt-5 flex-col sm:flex-col sm:items-center sm:mt-[2rem] md:flex-row">
            <div
              className="w-[100%] items-center"
              // style={{ textliAgn: "-webkit-center" }}
            >
              <div className="flex items-center justify-center mt-4">
                <div className="mt-1 ss:w-[280px] sm:w-[380px] md:w-[480px]">
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                      // overflow: "hidden",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <iframe
                      style={{
                        opacity: 1,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      src={practitionerVideo}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[100%] px-2 mt-6">
              <div>
                <h2 className="text-[1rem] text-center sm:text-[1.2rem] md:text-[2rem] lg:text-[2.5rem] text-white">
                  TIE YOURSELF TO PROPERTY NFTS AND BE THE AGENT FOR LIFE{" "}
                </h2>
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={handleClick}
                  className=" cursor-pointer tracking-wide  border-0 hover:bg-[#c8ed99] text-center text-[13px] sm:text-[15px] md:text-[19px] font-semibold bg-[#c1ff72] px-6 py-3  text-black rounded-full "
                >
                  Mint My Practitioner NFT Now!
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-[1rem] mt-10 text-center sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] text-[#121656]">
            PRACTITIONER NFT
          </h2>
          <div class="flex flex-wrap justify-center mt-3 bg-white">
            {/* <!-- card 1 --> */}
            <div class="p-4 max-w-sm relative">
              <div class="flex rounded-lg h-full bg-teal-400 p-8 flex-col  items-center">
                <div class="flex items-center mb-3">
                  <img
                    src={blueUser}
                    alt="user"
                    width={"200px"}
                    height={"200px"}
                  />
                </div>
                <div class="flex flex-col justify-between flex-grow">
                  <p class="leading-relaxed text-[1.3rem] text-center md:text-[1.5rem] lg:text-[1.5rem] xl:text-[2rem] text-[#121656]">
                    HOMEOWNER CLAIMS THEIR PROPERTY NFT
                  </p>
                </div>
              </div>
              <img
                className="absolute top-[7rem] right-[-23px] hidden min-[772px]:block"
                src={rightArrow}
                alt=""
                width={"60px"}
                height={"60px"}
              />
            </div>

            {/* <!-- card 2 --> */}
            <div class="p-4 max-w-sm relative">
              <div class="flex rounded-lg h-full bg-teal-400 p-8 flex-col items-center">
                <div class="flex items-center mb-3">
                  <img
                    src={third_sec_2}
                    alt="user"
                    width={"200px"}
                    height={"200px"}
                  />
                </div>
                <div class="flex flex-col justify-between flex-grow">
                  <p class="leading-relaxed text-[1.3rem] text-center md:text-[1.5rem] lg:text-[1.5rem] xl:text-[2rem] text-[#121656]">
                    HOMEOWNER TAGS YOU AS THEIR AGENT
                  </p>
                </div>
              </div>
              <img
                className="absolute top-[7rem] right-[-23px] hidden min-[1157px]:block"
                src={rightArrow}
                alt=""
                width={"60px"}
                height={"60px"}
              />
            </div>

            {/* <!-- card 3 --> */}
            <div class="p-4 max-w-sm relative">
              <div class="flex rounded-lg h-full bg-teal-400 p-8 flex-col items-center">
                <div class="flex items-center mb-3">
                  <img
                    src={third_sec_3}
                    alt="user"
                    width={"200px"}
                    height={"200px"}
                  />
                </div>
                <div class="flex flex-col justify-between flex-grow">
                  <p class="leading-relaxed text-[1.3rem] text-center md:text-[1.5rem] lg:text-[1.5rem] xl:text-[2rem] text-[#121656]">
                    AGENT IS FOREVER TIED TO THE PROPERTY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* third section */}
        <div className="px-[6%] py-[4%] bg-[#0d1353] h-auto items-center">
          <div class="flex justify-between max-md:flex-col max-w-6xl mx-auto items-center mt-3 bg-[#0d1353] text-white">
            {/* <!-- card 1 --> */}
            <div class="p-4 text-white items-center md:w-[50%]">
              <div class="flex rounded-lg h-full bg-teal-400 p-8 flex-col  items-center">
                <div class="flex items-center mb-3">
                  <img
                    src={realstate}
                    alt="user"
                    width={"350px"}
                    height={"350px"}
                  />
                </div>
                <h2 className="text-[2rem] text-center  md:text-[2rem] lg:text-[3rem]">
                  Real Estate Agent
                </h2>
              </div>
            </div>

            {/* <!-- card 2 --> */}
            <div class="p-4 text-white w-[90%] sm:w-[60%] md:w-[50%]">
              <div class="flex rounded-lg h-full bg-teal-400 flex-col items-center">
                <div class="w-full flex items-start mb-3">
                  <h2 className="text-[1.6rem] lg:text-[3rem]">BENEFITS</h2>
                </div>
                <div class="flex flex-col justify-start items-center flex-grow">
                  <ul className="mt-5 ">
                    <li className="tracking-wide text-[1.3rem]">
                      CLIENT RETENTION
                    </li>
                    <li className="tracking-wide text-[1.3rem]">
                      BE THE AGENT FOR LIFE
                    </li>
                    <li className="tracking-wide text-[1.5rem]">
                      BE THE POINT OF CONTACT FOR BANKS AND ASSET MANAGERS
                    </li>
                    <li className="tracking-wide text-[1.3rem]">
                      NEVER BE FORGOTTEN
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full items-center flex justify-center">
            <button
              onClick={handleClick}
              className="mt-4 tracking-wide items-center cursor-pointer  border-0 hover:bg-[#c8ed99] text-center text-base sm:text-lg md:text-xl font-semibold bg-[#c1ff72] px-7 py-5  text-black rounded-full "
            >
              Mint My Practitioner NFT Now!
            </button>
          </div>
        </div>

        {/* fourth section */}
        <div className="my-10">
          <div className="text-[1rem] mt-10 text-center sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] text-[#121656]">
            <img src={blueLogo} alt="blueLogo" />
          </div>
          <div class="flex flex-wrap justify-center mt-3 bg-white">
            {/* <!-- card 1 --> */}
            <div class="p-4 max-w-sm">
              <div
                class="flex rounded-lg h-full bg-teal-400 p-8 flex-col justify-center text-center"
                style={{ border: "1px solid #121656" }}
              >
                <div class="flex mb-3 text-center justify-center items-center">
                  <img
                    src={check}
                    alt="user"
                    width={"200px"}
                    height={"200px"}
                  />
                </div>
                <div class="flex flex-col justify-between flex-grow">
                  <h2 className="text-[#121656] mt-4">SEC COMPLIANT</h2>
                  <p class=" mt-4 leading-relaxed text-[1rem] text-center sm:text-[1rem] md:text-[1.5rem] lg:text-[1.5rem] xl:text-[2rem] text-[#121656]">
                    100% COMPLIANT WITH SEC, RESPA AND GOOD FUNDS LAWS
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- card 2 --> */}
            <div class="p-4 max-w-sm">
              <div
                class="flex rounded-lg h-full bg-teal-400 p-8 flex-col justify-center text-center"
                style={{ border: "1px solid #121656" }}
              >
                <div class="flex mb-3 text-center justify-center items-center">
                  <img
                    src={check_1}
                    alt="user"
                    width={"200px"}
                    height={"200px"}
                  />
                </div>
                <div class="flex flex-col flex-grow">
                  <h2 className="text-[#121656] mt-4">NOT A CRYPTO</h2>
                  <p class=" mt-4 leading-relaxed text-[1rem] text-center sm:text-[1rem] md:text-[1.5rem] lg:text-[1.5rem] xl:text-[2rem] text-[#121656]">
                    NO SCAMS, NO FAKE CURRENCIES
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- card 3 --> */}
            <div class="p-4 max-w-sm">
              <div
                class="flex rounded-lg h-full bg-teal-400 p-8 flex-col justify-center text-center"
                style={{ border: "1px solid #121656" }}
              >
                <div class="flex mb-3 text-center justify-center items-center">
                  <img
                    src={check_2}
                    alt="user"
                    width={"200px"}
                    height={"200px"}
                  />
                </div>
                <div class="flex flex-col justify-between flex-grow">
                  <h2 className="text-[#121656] mt-4">
                    NOT SELLING HOMES AS NFTs
                  </h2>
                  <p class=" mt-4 leading-relaxed text-[1rem] text-center sm:text-[1rem] md:text-[1.5rem] lg:text-[1.5rem] xl:text-[2rem] text-[#121656]">
                    WE NEVER UNDERCUT YOUR VALUE AS A REALTOR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PractitionerLandingPage;
