import { useEffect, useState } from "react";

// images
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../Context/authContext";
import { BASE_URL } from "../../../constants/endpoints";
import apiLeadForm from "../../../services/apiLeadForm";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

function NftWallet() {
  document.title = "Mint NFTs";

  const [propertyData, setPropertyData] = useState([]);
  const [practitionerData, setPractitionerData] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [mintingValidaton, setMintingValidaton] = useState(false);
  const [hasMinted, sethasMinted] = useState(false);
  const [propNFTCheckerforPract, setPropNFTCheckerforPract] = useState(false);

  const { userRole, minting, setMinting } = useAuthContext();

  // useEffect(()=> {
  //   setTimeout(()=> {
  //     setMinting(false)
  //   }, 4500)
  // }, [minting])
  const handleCopy = () => {
    const copiedTxt = document.getElementById("copyTxt").innerText;
    navigator.clipboard.writeText(copiedTxt);
    toast.success("Text Copied");
  };

  // fetch data via api for property listings
  // async function fetchPropertyData() {
  //   try {
  //     const token = localStorage.getItem("access");

  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     };
  //     const response = await axios.get(`${BASE_URL}/api/user_property_list`, {
  //       headers,
  //     });
  //     if (response.data) {
  //       setPropertyData(response.data.results);

  //       if (userRole === "Practitioner") {
  //         let email = JSON.parse(localStorage.getItem("profile_info"))?.user
  //           ?.email;

  //         const getGhlContactRes = await apiLeadForm.get(
  //           "/contacts/lookup?email=" + email
  //         );

  //         let ghlResTags = getGhlContactRes?.data?.contacts[0].tags;
  //         let ghlPractag = ["practitioner", "practnft", "nopropnft"];

  //         const tagsComaprision =
  //           JSON.stringify(ghlResTags) === JSON.stringify(ghlPractag);
  //         if (tagsComaprision) {
  //           setMintingValidaton(true);
  //           setPropNFTCheckerforPract(true);
  //         }
  //       } else {
  //         setMintingValidaton(true);
  //       }

  //       // if (userRole === "Consumer") {
  //       //   setMintingValidaton(true);
  //       // }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async function fetchPractitionerData() {
  //   try {
  //     const token = localStorage.getItem("access");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     };
  //     const response = await axios.get(
  //       `${BASE_URL}/api/user_practitioners_list`,
  //       {
  //         headers,
  //       }
  //     );
  //     if (response.data) {
  //       setPractitionerData(response.data.results);
  //       if (userRole === "Practitioner") {
  //         setMintingValidaton(true);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === "function";
  }

  const fetchPropertyData = () => {
    const data = JSON.parse(localStorage.getItem("mintnftdata"));
    console.log(data);

    if (data) {
      setPropertyData(data);
    }
  };

  // useEffect(() => {
  //   // Check if any object in propertyData has is_minted === true
  //   const mintingData =
  //     userRole === "Consumer" || propNFTCheckerforPract
  //       ? propertyData
  //       : practitionerData;
  //   const hasMintingChecker = mintingData?.some((obj) => obj.is_minted);

  //   if (hasMintingChecker) {
  //     sethasMinted(true); // Set the variable to true if there's a minted property
  //   }
  //   // eslint-disable-next-line
  // }, [mintingValidaton]);

  // useEffect(() => {
  //   // GHL Process
  //   async function fetchDataAndUpdateGHL() {
  //     let email = JSON.parse(localStorage.getItem("profile_info"))?.user?.email;

  //     const getGhlContactRes = await apiLeadForm.get(
  //       "/contacts/lookup?email=" + email
  //     );

  //     let ghlRes = getGhlContactRes?.data?.contacts[0];
  //     let ghltag = userRole === "Consumer" ? "nopropnft" : "nopractnft";
  //     let ghlPractag = ["practitioner", "practnft", "nopropnft"];

  //     const tagsComaprision =
  //       JSON.stringify(ghlRes.tags) === JSON.stringify(ghlPractag);

  //     if (tagsComaprision || (hasMinted && ghlRes?.tags[1] === ghltag)) {
  //       const tags =
  //         tagsComaprision && hasMinted
  //           ? ["Practitioner", "PractNft", "PropNft", "Appliance"]
  //           : userRole === "Consumer"
  //           ? ["Consumer", "PropNft", "Appliance"]
  //           : ["Practitioner", "PractNft", "NoPropNFT"];

  //       const payload = {
  //         tags: tags,
  //       };
  //       try {
  //         await apiLeadForm.put("/contacts/" + ghlRes?.id, payload);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   }

  //   fetchDataAndUpdateGHL();
  //   // eslint-disable-next-line
  // }, [hasMinted]);

  useEffect(() => {
    const profileInfo = JSON.parse(localStorage.getItem("profile_info"));
    setWalletAddress("43h545g34538743rg347");
    fetchPropertyData();
    // if (userRole === "Practitioner") {
    //   fetchPractitionerData();
    // }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {minting ? (
        <>
          <div className="flex items-center justify-center">
            <div className="flex">
              <h1 className="text-2xl md:text-4xl font-bold me-4">
                Minting...
              </h1>{" "}
              <LoadingSpinner minting={minting} />
            </div>
          </div>{" "}
        </>
      ) : (
        <>
          <div className="py-4 w-full px-2 sm:px-10">
            {/* heading */}
            <h1 className="text-heading-xs sm:text-heading-sm lg:text-heading-lg font-graphik leading-[18px] sm:leading-[44px] text-white">
              My Wallet
            </h1>
            <div className="bg-[#1d066880] rounded-lg flex items-center justify-center gap-2 w-full mx-auto sm:w-fit p-1 my-4">
              <p className="text-[8px] sm:text-label-sm font-semibold">
                Wallet Address:
              </p>
              <p id="copyTxt" className="text-[8px] sm:text-label-sm">
                {walletAddress?.replace(/-/g, "")}
              </p>
              <img
                src="/assets/icons/copyIcon.svg"
                alt="Copy Icon"
                className="w-[12px] h-[12px]  sm:w-[16px] sm:h-[16px] cursor-pointer"
                onClick={handleCopy}
              />
            </div>
            {/* body */}
            <div className="bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] p-[1px] rounded-[24px] mt-10 mb-[7.5rem]">
              <div
                style={{
                  background:
                    "linear-gradient(94.09deg, #12134d 3.97%, #10053c 51.03%, #12134d 95.99%)",
                }}
                className="w-full py-10 px-5 sm:p-10 rounded-[24px]"
              >
                <div className="flex justify-between">
                  <h2 className="text-heading-xs sm:text-heading-sm md:text-heading-lg text-white">
                    Property NFTs
                  </h2>
                  <div className="flex items-center gap-2.5 cursor-pointer h-fit my-auto">
                    <img
                      src="/assets/icons/viewAll.svg"
                      alt="View All Icon"
                      className="w-[20px] h-[20px]"
                    />
                    <span className="text-label-xs sm:text-label-md">
                      View All
                    </span>
                  </div>
                </div>
                {/* cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-12 sm:mt-24">
                  {console.log(propertyData)}
                  {propertyData &&
                    propertyData?.map((item, ind) => (
                      <>
                        <div
                          key={ind}
                          className="p-2 rounded-[15px] bg-light-blue min-h-[400px]"
                        >
                          <div className=" h-[70%] relative ">
                            <Link to={`/propertyNftDetail/${item?.id}`}>
                              <img
                                src={item?.image}
                                alt="house"
                                className="w-full object-cover bg-cover block h-full rounded-lg cursor-pointer"
                              />
                            </Link>
                            {item?.is_minted === false && (
                              <p className="absolute bottom-1 left-1 bg-[#d9512c] px-3 py-1 rounded text-[9px] lg:text-[14px]">
                                Pending
                              </p>
                            )}
                          </div>
                          <div className="p-4 pb-6 h-30% ">
                            <h3 className="text-[10px] sm:text-[13px] lg:text-[18px] font-medium">
                              {item?.title.replace("@", "").slice(0, 12)}
                            </h3>
                            <p className="text-[8px] lg:text-[14px] w-[75%] text-grayish font-medium">
                              {item?.address.length >= 40
                                ? item?.address.slice(0, 40) + "..."
                                : item?.address}
                            </p>
                          </div>
                        </div>
                      </>
                    ))}
                </div>

                {userRole === "Practitioner" && (
                  <>
                    <div className="flex justify-between mt-10">
                      <h2 className="text-heading-xs sm:text-heading-sm md:text-heading-lg text-white">
                        Practitioner NFTs
                      </h2>
                      <div className="flex items-center gap-2.5 cursor-pointer h-fit my-auto">
                        <img
                          src="/assets/icons/viewAll.svg"
                          alt="View All Icon"
                          className="w-[20px] h-[20px]"
                        />
                        <span className="text-label-xs sm:text-label-md">
                          View All
                        </span>
                      </div>
                    </div>
                    {/* cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-12 sm:mt-24">
                      {practitionerData &&
                        practitionerData.map((item, ind) => (
                          <>
                            <div
                              key={ind}
                              className="p-2 rounded-[15px] bg-light-blue h-[340px]"
                            >
                              <div className=" h-[70%] relative ">
                                <Link to={`/practitionerNftDetail/${item.id}`}>
                                  <img
                                    src={item.image}
                                    alt="house"
                                    className="w-full object-cover bg-cover block h-full rounded-lg cursor-pointer"
                                  />
                                </Link>
                                {!item.is_minted && (
                                  <p className="absolute bottom-1 left-1 bg-[#d9512c] px-3 py-1 rounded text-[9px] lg:text-[14px]">
                                    Pending
                                  </p>
                                )}
                              </div>
                              <div className="p-4 pb-6">
                                <h3 className="text-[10px] sm:text-[13px] lg:text-[18px] font-medium">
                                  {item.name}
                                </h3>
                                <p className="text-[8px] lg:text-[14px] w-[75%] text-grayish font-medium">
                                  {item.address.length >= 40
                                    ? item.address.slice(0, 40) + "..."
                                    : item.address}
                                </p>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NftWallet;
