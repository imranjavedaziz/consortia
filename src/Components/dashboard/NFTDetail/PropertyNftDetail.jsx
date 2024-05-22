import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../Context/authContext";
import { BASE_URL, GET_PROFILE_BY_USERID } from "../../../constants/endpoints";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import CustomDetailBtn from "../../customButtons/CustomDetailBtn";
import profileIcon from "../Settings/profile.png";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import apinew from "../../../services/apinew";
import { getToken } from "../../../utils/localStorage";

const PropertyNftDetail = () => {
  const { headshot, profileDetail } = useAuthContext();
  const [agentDetails, setAgentDetails] = useState({});
  const navigate = useNavigate();
  const [nftDetail, setNftDetail] = useState({});
  const [propertyData, setPropertyData] = useState({
    image: "",
    title: "",
    name: "",
    bio: "",
    wallet_address: "",
    tx_id: null,
    is_minted: true,
    docCategory: null,
    updated_at: null,
    property_nft_status: "",
  });

  // format the timestamp

  const formatTimeStamp = (timestamp) => {
    // Convert the timestamp to a Date object
    const dateObj = new Date(timestamp);

    // Define the options for formatting the date and time
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    // Format the date and time according to the specified options
    return dateObj.toLocaleString("en-US", options);
  };

  // copy wallet ID
  // const handleCopy = (walletId) => {
  //   navigator.clipboard.writeText(walletId);

  //   toast.success("Wallet ID Copied");
  // };

  // const { id } = useParams();

  // async function fetchPropertyData() {
  //   try {
  //     const token = localStorage.getItem("access");

  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     };
  //     const response = await axios.get(`${BASE_URL}/api/property_nft/${id}`, {
  //       headers,
  //     });

  //     setPropertyData(response?.data?.data);
  //     setNftDetail(response?.data?.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const fetchPropertyData = () => {
    const data = localStorage.getItem("mintnftdata");
    setNftDetail(data);
  };

  // handle viwe blockchain data content in different devices

  const [blockchainContent, setBlockchainContent] = useState("");
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
    if (windowSize < 650) {
      setBlockchainContent("Download File");
    } else {
      setBlockchainContent("Download Verified File");
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  const editNftDataHandler = () => {
    navigate("/property/mint-nft", { state: nftDetail });
  };

  useEffect(() => {
    fetchPropertyData();
  }, []);

  const [isDownloading, setIsDownloading] = useState(false);

  const donwloadAsPdf = async (signedUrl) => {
    setIsDownloading(true);
    const response = await fetch(signedUrl);
    const blob = await response.blob();
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "Document.pdf";
    a.click();
    setIsDownloading(false);
  };

  // get agent data of the property nft

  // useEffect(() => {
  //   const getAgentDetail = async () => {
  //     try {
  //       apinew.setJWT(getToken());
  //       const res = await apinew.get(
  //         GET_PROFILE_BY_USERID + propertyData?.practitioner_id
  //       );

  //       setAgentDetails(res.data?.data?.user);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (propertyData?.practitioner_id) {
  //     getAgentDetail();
  //   }
  // }, [propertyData]);

  return (
    <>
      <div className="py-4 w-full px-2 sm:px-10">
        <h1 className="text-heading-xs sm:text-heading-sm lg:text-heading-lg font-graphik leading-[18px] sm:leading-[44px] text-white">
          Property NFT Details
        </h1>
        <div className="bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] p-[1px] rounded-[24px] mt-10 mb-[7.5rem]">
          <div
            style={{
              background:
                "linear-gradient(94.09deg, #12134d 3.97%, #10053c 51.03%, #12134d 95.99%)",
            }}
            className="w-full py-10 px-5 sm:p-10 rounded-[24px]"
          >
            <div className="grid grid-cols-12  gap-3 sm:gap-6 ">
              <div className="col-span-6 md:col-span-5 lg:col-span-4 ">
                <img
                  src={propertyData && propertyData?.image}
                  alt="house"
                  className="w-full h-full max-h-[400px]  rounded-[24px] bg-light-blue object-contain"
                />
              </div>
              <div className="col-span-6 md:col-span-7 lg:col-span-8 mt-6">
                <div className="flex justify-between">
                  <h2 className="text-[13px] md:text-[18px] lg:text-[24px]">
                    {propertyData && propertyData?.title.replace("@", "")}
                  </h2>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <button className="rounded-full border-[2px] border-[#1d2cdf] border-solid w-[48px] h-[48px] overflow-hidden cursor-pointer">
                    <img
                      className="rounded-full w-full h-full"
                      src={headshot ? headshot : profileIcon}
                      alt="Profile"
                    />
                  </button>
                  <span className="text-[9px] sm:text-[14px]">
                    {profileDetail &&
                      `${profileDetail.firstName} ${profileDetail.lastName}`}
                  </span>
                </div>

                {propertyData?.is_minted === false ? (
                  <CustomDetailBtn
                    onClick={() => editNftDataHandler()}
                    text="Edit Detail"
                    mt="mt-8"
                  />
                ) : propertyData?.document === "" ? (
                  ""
                ) : (
                  <button
                    onClick={() =>
                      donwloadAsPdf(propertyData?.document_preview)
                    }
                    type="button"
                    className={`flex justify-center items-center gap-2 px-8 py-2 mt-8 bg-gradient-to-r from-[#1D2CDF] to-[#b731ff] rounded-[24px] text-white border-none cursor-pointer text-sm  font-semibold`}
                  >
                    {blockchainContent}{" "}
                    {isDownloading ? <LoadingSpinner /> : null}
                  </button>
                )}

                <div className="mt-3 sm:mt-6 flex flex-col justify-center gap-1.5 sm:gap-3">
                  <p className="text-sm sm:text-[1.25rem] text font-medium">
                    Property Address:
                  </p>
                  <p className="text-xs sm:text-[0.9rem] font-normal text-grayish">
                    {propertyData.address}
                  </p>
                </div>

                {propertyData?.document === "" ? (
                  ""
                ) : (
                  <div className="mt-3 sm:mt-6 flex flex-col justify-center gap-1.5 sm:gap-3">
                    <p className="text-sm sm:text-[1.25rem] text font-medium">
                      Document Type:
                    </p>
                    <p className="text-xs sm:text-[0.9rem] font-normal text-grayish">
                      {propertyData.docCategory === "settlement"
                        ? "Settlement Statement"
                        : ""}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* nft detail bottom */}
            <div
              className=" bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] "
              style={{
                background:
                  "linear-gradient(94.09deg, #12134d 3.97%, #10053c 51.03%, #12134d 95.99%)",
              }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-[16px] lg:text-[24px] ps-3 font-medium mt-5 pt-10">
                  NFT History for Token ID: {propertyData.block_id}
                </h3>
              </div>
              <div className="pt-5   overflow-auto">
                <table className="min-w-[500px] sm:w-full border-collapse">
                  <thead>
                    <tr className="[&>*]:text-start [&>*]:font-medium sm:[&>*]:font-semibold [&>*]:p-4  [&>*]:text-[9px] lg:[&>*]:text-[14px] [&>*]:border-0 [&>*]:border-b-[1px] [&>*]:border-solid [&>*]:border-b-[#515151]">
                      <th>Token ID</th>
                      <th> Action</th>
                      <th>Wallet ID</th>
                      {/* <th >Minter</th> */}
                      <th>Timestamp</th>
                      {!propertyData.is_minted && <th>Reason</th>}
                      {propertyData?.practitioner_id && <th> Agent</th>}
                    </tr>
                  </thead>
                  <tbody className="text-[#fafbfc] ">
                    <tr className="hover:bg-[#ffffff14]   [&>*]:text-start [&>*]:font-medium sm:[&>*]:font-normal [&>*]:p-4  [&>*]:text-[9px] lg:[&>*]:text-[14px] [&>*]:border-0 [&>*]:border-b-[1px] [&>*]:border-solid [&>*]:border-b-[#515151]">
                      <td>
                        {propertyData.block_id
                          ? `${propertyData.block_id}`
                          : "_ _"}
                      </td>
                      <td>
                        {propertyData.nft_gifted_user
                          ? "Gifted"
                          : propertyData.is_minted
                          ? "Mint"
                          : "Pending"}
                      </td>
                      <td className="">
                        <div className="gap-[5px] flex items-center flex-nowrap">
                          <div className="inline">
                            {propertyData.minter
                              ? `${propertyData.minter?.slice(0, 12)}...`
                              : "_ _"}
                          </div>
                          <img
                            src="/assets/icons/copyIcon.svg"
                            alt="Copy Icon"
                            className="w-[12px] h-[12px] sm:w-[16px] sm:h-[16px] cursor-pointer ms-2"
                            // onClick={() => handleCopy(propertyData.minter)}
                          />
                        </div>
                      </td>
                      <td>
                        {formatTimeStamp(propertyData.updated_at).replace(
                          "at",
                          ""
                        )}
                      </td>

                      {!propertyData.is_minted && (
                        <td>{propertyData?.property_nft_status}</td>
                      )}

                      {propertyData?.practitioner_id && (
                        <td className="font-semibold flex justify-start items-center gap-4">
                          <img
                            src={agentDetails?.headshot}
                            alt="agent profile"
                            className="w-10 aspect-square rounded-full border-2 border-solid border-primary-main"
                          />
                          <Link
                            target="_blank"
                            to={`/practitionerNftDetail/${propertyData?.practitioner_nft_id}`}
                            className="cursor-pointer  text-white font-semibold underline"
                          >
                            {agentDetails?.firstName +
                              " " +
                              agentDetails?.lastName}
                          </Link>
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyNftDetail;
