import img1 from "./assets/Property NFT Landing Page07.png";
import img2 from "./assets/Property NFT Landing Page08.png";
import img3 from "./assets/Property NFT Landing Page09.png";
import img4 from "./assets/Property NFT Landing Page03.png";
import img5 from "./assets/Property NFT Landing Page0101.png";
import img6 from "./assets/Property NFT Landing Page10.png";
import img7 from "./assets/Property NFT Landing Page11.png";
import Signup from "../../../Pages/LeadForm";
import img_12 from "./assets/Property NFT Landing Page New 12.png";
import img_7 from "./assets/Property NFT Landing Page New 07.png";
import img_8 from "./assets/Property NFT Landing Page New 08.png";
import img_9 from "./assets/Property NFT Landing Page New 09.png";
import img_10 from "./assets/Property NFT Landing Page New 10.png";
import img_11 from "./assets/Property NFT Landing Page New 11.png";
import img_1 from "./assets/Property NFT Landing Page01.png";
import img_2 from "./assets/Property NFT Landing Page02.png";
import img_3 from "./assets/Property NFT Landing Page06.png";
import logoImg from "./assets/white-logo.png";

import { useState } from "react";
import "./style.css";

const ConsumerLandingPage = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);

  const handleClick = () => {
    setShowLeadForm(true);
  };
  return (
    <>
      {showLeadForm && <Signup setShowLeadForm={setShowLeadForm} />}
      <div className="h-screen overflow-auto">
        {/* 1st section */}
        <div className="h-auto px-[5%] py-[4%]">
          <div className="flex xs:flex-col-reverse sm:flex-col-reverse md:flex-row justify-between">
            <div
              className="w-[25%] xs:w-[100%] sm:w-[100%] xs:pb-7 sm:pb-7"
              style={{ textAlignLast: "center" }}
            >
              <img src={img_12} width={"50%"} height={"100%"} alt="" />
            </div>
            <div className="w-[60%] xs:w-[100%] sm:w-[100%]  xs:pb-12 sm:pb-12 place-self-center px-4 py-3 flex-col justify-center items-center text-[#0d1353]">
              <h1 className="text-[1.6rem] mb-5 md:mb-10 text-center sm:text-[3rem] md:text-[4rem] lg:text-[5rem]">
                WHAT IS CONSORTIA?
              </h1>
              <h2 className="text-[1rem] text-center sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem]">
                IT'S CARFAX FOR YOUR HOME ON BLOCKCHAIN{" "}
              </h2>
            </div>
          </div>
        </div>
        {/* 1st section End */}
        <div
          style={{ textAlign: "-webkit-center" }}
          className="w-full text-center mb-6 text-[#0d1353]"
        >
          <hr className="w-[50%] text-center" />
        </div>

        {/* 2ndt section start */}
        <div className="h-auto px-[10%] py-[4%]">
          <div className="flex">
            <div>
              <div className="px-[4%] py-[2%] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px]">
                <img
                  className=""
                  src={img_7}
                  width={"100%"}
                  height={"100%"}
                  alt=""
                />
              </div>
            </div>

            <div className="px-[4%] py-[2%] place-self-center ms-[5%]">
              <h2 className=" text-[1rem] text-[#0d1353] sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem]">
                CONSORTIA IS NOT CRYPTO
              </h2>
            </div>
          </div>
        </div>
        {/* 2ndt section End */}

        {/* 3rd section */}
        <div className="h-auto px-[10%] py-[4%] pb-10">
          <div className="flex">
            <div className="px-[4%] py-[2%] place-self-center me-[5%]">
              <h2 className=" text-[1rem] text-[#0d1353] sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem]">
                CONSORTIA IS NOT SELLING DIGITAL "ART"
              </h2>
            </div>

            <div className="background-container">
              <div className="overlay-container px-[4%] py-[2%] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px]">
                <img
                  className="overlay-image"
                  src={img_9}
                  width={"100%"}
                  height={"100%"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* 3rd section end*/}

        {/* 4th section */}

        <div className="h-auto px-[5%] py-[4%] bg-[#0d1353]">
          <h2 className="text-[1rem] mt-7 text-center sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] text-[#c1ff72]">
            WHAT <span className="underline">IS</span> MINTING A PROPERTY NFT?
          </h2>

          <div className="flex mt-8 items-center xs:flex-col-reverse sm:flex-col-reverse md:flex-row justify-between">
            <div
              className="w-[40%] xs:w-[100%] sm:w-[50%] flex justify-center items-center xs:pb-7 sm:pb-7"
              style={{ textAlignLast: "center" }}
            >
              <img src={img_10} width={"70%"} height={"70%"} alt="" />
            </div>
            <div className="w-[60%] xs:w-[100%] text-center sm:w-[100%] ms-[6%]  xs:pb-12 sm:pb-12 place-self-center px-4 py-3 flex-col justify-center items-center text-[#0d1353]">
              <h2 className="text-[1rem] text-center text-white sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] ">
                IT'S CLAIMING VERIFIED DIGITAL OWNERSHIP OF YOUR PROPERTY{" "}
              </h2>
              <button
                onClick={handleClick}
                className="xs:mt-5 sm:mt-5 mt-5 md:mt-7 tracking-wide items-center cursor-pointer  border-0 hover:bg-[#c8ed99] text-center text-[9px] sm:text-[15px] font-semibold bg-[#c1ff72] px-10 py-5  text-black"
                style={{ borderRadius: "2% 2% 2% 2% / 46% 44% 49% 51% " }}
              >
                MINT MY PROPERTY NFT NOW FOR ONLY $19.99
              </button>
            </div>
          </div>
        </div>
        {/* 4th section */}

        {/* 5th section */}

        <div className="h-auto px-[5%] py-[4%] bg-white">
          <h2 className="text-[1rem] mt-10 text-center sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] text-[#0d1353]">
            WHY SHOULD I MINT MY PROPERTY NFT?
          </h2>

          <div className="flex xs:flex-col-reverse items-center sm:flex-col-reverse md:flex-row text-center justify-between">
            <div
              className="w-[40%] xs:w-[100%] sm:w-[50%]  flex justify-center items-center xs:pb-7 sm:pb-7"
              style={{ textAlignLast: "center" }}
            >
              <img src={img_11} width={"70%"} height={"70%"} alt="" />
            </div>
            <div className="w-[60%] xs:w-[100%] sm:w-[100%] ms-[6%]  xs:pb-12 sm:pb-12 place-self-center px-4 py-3 flex-col justify-center items-center text-[#0d1353]">
              <h2 className="text-[1rem] xs:text-center sm:text-center text-[#0d1353] sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] ">
                TO CLAIM THOUSANDS OF HOME OWNERSHIP GOODIES STARTING WITH FREE
                PROPERTY TAX REVIEW{" "}
              </h2>
            </div>
          </div>
        </div>
        {/*5th section */}

        <div
          style={{ textAlign: "-webkit-center" }}
          className="w-full text-center mb-6 text-[#0d1353]"
        >
          <hr className="w-[50%] text-center" />
        </div>

        {/* 1st section */}
        {/* <div className=" bg-[#0d1353] h-auto px-[5%] py-[4%]">
          <div className="flex justify-center items-center flex-col space-y-8">
            <h1 className="text-[1.6rem] text-center sm:text-[3rem] md:text-[4rem] lg:text-[5rem] text-[#c1ff72]">
              MINT YOUR PROPERTY NFT
            </h1>
            <h2
              className="text-[1rem] text-center sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] text-[white]"
              style={{ margin: "0" }}
            >
              AND GET A FREE PROPERTY TAX REVIEW
            </h2>
          </div>
          <div className="flex xs:flex-col sm:flex-col md:flex-row lg:flex-row items-center px-8">
            <div className="w-[50%] xs:w-[100%] xs:mt-6 sm:w-[70%]">
              <div className="p-3">
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
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
                    src="https://consortiamedia.s3.amazonaws.com/Consumer.mp4"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="text-center space-y-16] xs:mt-4 sm:mt-4">
              <h3 className="text-[1rem] text-center sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] text-[white]">
                AVERAGE SAVINGS $4,600
              </h3>
              <button
                onClick={handleClick}
                className="xs:mt-3 sm:mt-3 tracking-wide items-center cursor-pointer  border-0 hover:bg-[#c8ed99] text-center text-[9px] sm:text-[15px] font-semibold bg-[#c1ff72] px-7 py-5  text-black rounded-full "
              >
                MINT MY PROPERTY NFT NOW FOR ONLY $19.99
              </button>
            </div>
          </div>
        </div> */}
        {/* 6th section */}
        <div className="bg-white h-auto px-[5%] py-[4%]">
          <div className="flex justify-center items-center flex-col space-y-8">
            <h1 className="text-[1rem] text-center sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] text-[#0d1353] ">
              PAYING TOO MUCH IN PROPERTY TAXES?
            </h1>
            <h2 className="text-[0.8rem] text-center sm:text-[1.5rem] md:text-[1.6rem] lg:text-[2rem] text-[#0d1353] font-semibold">
              WE WILL FIND OUT IF YOU QUALIFY FOR LOWER TAXES
            </h2>
          </div>
          <div className="h-auto mt-7">
            <div className="flex mt-[3rem] xs:flex-col sm:flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex sm:w-[80%] justify-center items-center flex-col gap-10 shadow-lg py-5 px-4 rounded-lg flex-1 h-[400px]">
                <h2 className="text-[#0d1353] text-[1.1rem] text-center sm:text-[1.5rem] md:text-[1.6rem] lg:text-[2rem] font-semibold">
                  50% OF HOMES SOLD BELOW LIST PRICE THIS YEAR
                </h2>
                <div className=" text-center">
                  <img
                    className=" aspect-square"
                    width={"200px"}
                    height={"200px"}
                    src={img1}
                    alt=""
                  />
                </div>
              </div>

              <div className="flex  sm:w-[80%] justify-center items-center flex-col gap-10 shadow-lg py-5 px-4 rounded-lg flex-1 h-[400px]">
                <h2 className="text-[#0d1353] text-[1.1rem] text-center sm:text-[1.5rem] md:text-[1.6rem] lg:text-[1.7rem] font-semibold">
                  IF YOUR HOME LOST VALUE, YOU MIGHT BE ELIGIBLE FOR A PROPERTY
                  TAX REDUCTION
                </h2>
                <div className=" text-center">
                  <img
                    className=" aspect-square"
                    width={"200px"}
                    height={"200px"}
                    src={img3}
                    alt=""
                  />
                </div>
              </div>

              <div className="flex  sm:w-[80%] justify-center items-center flex-col gap-10 shadow-lg py-5 px-4 rounded-lg flex-1 h-[400px]">
                <h2 className="text-[#0d1353] text-[1.1rem] text-center sm:text-[1.5rem] md:text-[1.6rem] lg:text-[2rem] font-semibold">
                  WE RESEARCH AND NEGOTIATE FOR YOU!
                </h2>
                <div className="w-full h-[50%] text-center">
                  <img
                    className=" aspect-square"
                    width={"200px"}
                    height={"200px"}
                    src={img2}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6th section */}
        <div className="bg-[#0d1353] px-[5%] py-[4%]">
          <h2 className="text-[1rem] mt-10 text-center sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] text-white">
            CLAIMING YOUR PROPERTY NFT IS EASY
          </h2>
          <div class="flex flex-wrap justify-center mt-3 bg-[#0d1353]">
            {/* <!-- card 1 --> */}
            <div class="p-4 max-w-sm relative">
              <div class="flex rounded-lg h-full bg-teal-400 p-8 flex-col  items-center">
                <div class="flex items-center mb-3">
                  <img src={img4} alt="user" width={"200px"} height={"200px"} />
                </div>
                <div class="flex flex-col justify-between flex-grow">
                  <p class="leading-relaxed text-[1rem] text-center sm:text-[1rem] md:text-[1.5rem] lg:text-[1.5rem] xl:text-[2rem] text-white">
                    CLAIM YOUR PROPERTY
                  </p>
                </div>
              </div>
              <img
                className="absolute top-[7rem] right-[-23px] hidden sm:block"
                src={img7}
                alt=""
                width={"60px"}
                height={"60px"}
              />
            </div>

            {/* <!-- card 2 --> */}
            <div class="p-4 max-w-sm relative">
              <div class="flex rounded-lg h-full bg-teal-400 p-8 flex-col items-center">
                <div class="flex items-center mb-3">
                  <img src={img6} alt="user" width={"200px"} height={"200px"} />
                </div>
                <div class="flex flex-col justify-between flex-grow">
                  <p class="leading-relaxed text-[1rem] text-center sm:text-[1rem] md:text-[1.5rem] lg:text-[1.5rem] xl:text-[2rem] text-white">
                    PROPERTY TAX REVIEW
                  </p>
                </div>
              </div>
              <img
                className="absolute top-[7rem] right-[-23px] hidden sm:hidden md:block"
                src={img7}
                alt=""
                width={"60px"}
                height={"60px"}
              />
            </div>

            {/* <!-- card 3 --> */}
            <div class="p-4 max-w-sm relative">
              <div class="flex rounded-lg h-full bg-teal-400 p-8 flex-col items-center">
                <div class="flex items-center mb-3">
                  <img src={img5} alt="user" width={"200px"} height={"200px"} />
                </div>
                <div class="flex flex-col justify-between flex-grow">
                  <p class="leading-relaxed text-[1rem] text-center sm:text-[1rem] md:text-[1.5rem] lg:text-[1.5rem] xl:text-[2rem] text-white">
                    REDUCED PROPERTY TAXES
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full text-center">
            <button
              onClick={handleClick}
              className="xs:mt-5 sm:mt-5 mt-5 md:mt-7 tracking-wide items-center cursor-pointer  border-0 hover:bg-[#c8ed99] text-center text-[9px] sm:text-[15px] font-semibold bg-[#c1ff72] px-10 py-5  text-black"
              style={{ borderRadius: "2% 2% 2% 2% / 46% 44% 49% 51% " }}
            >
              MINT MY PROPERTY NFT NOW FOR ONLY $19.99
            </button>
          </div>
        </div>
        {/* <div className="w h-auto px-[5%] py-[4%] bg-[#0d1353]">
        <div className="flex justify-center items-center flex-col h-screen space-y-8">
          <h1 className="text-6xl text-white ">CLAIM YOUR PROPERTY NFT</h1>
          <div className="flex items-center justify-between gap-5">
            <div className="flex justify-center items-center flex-col gap-10  py-5 px-4 flex-1 h-[400px]">
              <div className="w-full h-[60%] text-center">
                <img className="h-full aspect-square" width={'200px'} height={'200px'} src={img4} alt="" />
              </div>
              <h2 className="text-white text-2xl text-normal text-center">
                CLAIM YOUR PROPERTY
              </h2>
            </div>
            <div className="w-full h-[150px] text-center">
                <img className=" aspect-square" width={'100px'} height={'100px'} src={img7} alt="" />
              </div>
            <div className="flex justify-center items-center flex-col gap-10  py-5 px-4 flex-1 h-[400px]">
              <div className="w-full h-[60%] text-center">
                <img className=" aspect-square" width={'200px'} height={'200px'} src={img6} alt="" />
              </div>
              <h2 className="text-white text-2xl text-normal text-center">
                PROPERTY TAX REVIEW
              </h2>
            </div>
            <div className="w-full h-[150px] text-center">
                <img className=" aspect-square" width={'100px'} height={'100px'} src={img7} alt="" />
              </div>
            <div className="flex justify-center items-center flex-col gap-10  py-5 px-4 flex-1 h-[400px]">
              <div className="w-full h-[60%] text-center">
                <img className=" " width={'200px'} height={'200px'} src={img5} alt="" />
              </div>
              <h2 className="text-white text-2xl text-normal text-center">
                REDUCED PROPERTY TAXES
              </h2>
            </div>
          </div>
          <button onClick={handleClick} className="bg-[#C1FF72] text-3xl border-0 rounded-full font-normal px-8 py-4 cursor-pointer">
            Mint My Property NFT Now!
          </button>
        </div>
      </div> */}
        {/* 7th section */}
        <div className="h-auto px-[5%] py-[4%] bg-white">
          <div className="flex justify-center items-center flex-col space-y-16">
            <div className="w-[80%]">
              <h2 className="mt-4 mb-3 text-[1rem] text-center sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] text-[#0d1353]">
                TRUSTED BY BANKS
              </h2>
              <h4
                className="text-[0.8rem] text-center sm:text-[1rem] md:text-[1.5rem] lg:text-[2rem] text-[#0d1353]"
                style={{ margin: 0 }}
              >
                OUR PROPERTY TAX EXPERTS ARE TRUSTED BY THE LARGEST BANKS AND
                LENDERS
              </h4>
            </div>
            <button
              onClick={handleClick}
              className="xs:mt-5 sm:mt-5 mt-5 md:mt-7 tracking-wide items-center cursor-pointer  border-0 hover:bg-[#c8ed99] text-center text-[9px] sm:text-[15px] font-semibold bg-[#c1ff72] px-10 py-5  text-black"
              style={{ borderRadius: "2% 2% 2% 2% / 46% 44% 49% 51% " }}
            >
              MINT MY PROPERTY NFT NOW FOR ONLY $19.99
            </button>
          </div>
        </div>

        {/* 8th section */}
        <div className="bg-[#0d1353] px-[5%] py-[4%]">
          <div className="text-white  text-[1rem] mt-10 text-center sm:text-[1.5rem] md:text-[2rem] lg:text-[3rem] ">
            <img src={logoImg} alt="logoImg" />
          </div>
          <div class="flex flex-wrap justify-center mt-3 text-white">
            {/* <!-- card 1 --> */}
            <div class="p-4 max-w-sm lg:w-[450px]">
              <div class="flex rounded-lg h-full bg-teal-400 p-6 flex-col justify-center text-center">
                <div class="flex mb-3 text-center justify-center items-center">
                  <img
                    src={img_3}
                    alt="user"
                    width={"200px"}
                    height={"200px"}
                  />
                </div>
                <div class="flex flex-col flex-grow">
                  <h2 className=" mt-4 text-[1.6rem] xl:text-[2rem]">SEC COMPLIANT</h2>
                  <p class=" mt-4 leading-relaxed text-[1rem] text-center sm:text-[1rem] md:text-[1.3rem]  xl:text-[1.6rem]  ">
                    100% COMPLIANT WITH SEC, RESPA AND GOOD FUNDS LAWS
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- card 2 --> */}
            <div class="p-4 max-w-sm lg:w-[450px]">
              <div class="flex rounded-lg h-full bg-teal-400 p-6 flex-col justify-center text-center">
                <div class="flex mb-3 text-center justify-center items-center">
                  <img
                    src={img_2}
                    alt="user"
                    width={"200px"}
                    height={"200px"}
                  />
                </div>
                <div class="flex flex-col  flex-grow">
                  <h2 className=" mt-4 text-[1.6rem] xl:text-[2rem]">NOT A CRYPTO</h2>
                  <p class=" mt-4 leading-relaxed text-[1rem] text-center sm:text-[1rem] md:text-[1.3rem]  xl:text-[1.6rem] ">
                    NO SCAMS NO FAKE CURRENCIES
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- card 3 --> */}
            <div class="p-4 max-w-sm lg:w-[450px]">
              <div class="flex rounded-lg h-full bg-teal-400 p-6 flex-col justify-center text-center">
                <div class="flex mb-3 text-center justify-center items-center">
                  <img
                    src={img_3}
                    alt="user"
                    width={"200px"}
                    height={"200px"}
                  />
                </div>
                <div class="flex flex-col justify-between flex-grow">
                  <h2 className=" mt-4 text-[1.6rem] xl:text-[2rem]">HOMEOWNER GOODIES</h2>
                  <p class=" mt-4 leading-relaxed text-[1rem] text-center sm:text-[1rem] md:text-[1.3rem]  xl:text-[1.6rem] ">
                    UNLOCK THOUSANDS OF DOLLARS OF HOMEOWNER BENEFITS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 8th section */}
      </div>
    </>
  );
};

export default ConsumerLandingPage;
