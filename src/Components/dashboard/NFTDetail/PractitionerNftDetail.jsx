import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/endpoints";
import BlockchainDataPopup from "../../Popups/blockchainDataPopup";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import CustomDetailBtn from "../../customButtons/CustomDetailBtn";
import { useAuthContext } from "../../../Context/authContext";

const PractitionerNftDetail = () => {
  const [practitionerData, setPractitionerData] = useState(null);
  const [nftDetail, setNftDetail] = useState({});
  const [dataPopup, setDataPopup] = useState(false);
  const [blockchainData, setBlockchainData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [practitionerProfileData, setPractitionerProfileData] = useState(null);

  // format the timestamp

  const navigate = useNavigate();
  const { id } = useParams();

  const handleCopy = () => {
    const copiedTxt = document.getElementById("copyTxt").innerText;
    navigator.clipboard.writeText(copiedTxt);
    toast.success("copied!");
  };

  async function fetchPractitionerData() {
    try {
      const token = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `${BASE_URL}/api/practitioner_nft/${id}`,
        {
          headers,
        }
      );
      setPractitionerData(response?.data?.data);
      setNftDetail(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchPractitionerProfileData = async () => {
    try {
      const token = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `${BASE_URL}/api/profile/${practitionerData?.ownerId}`,
        {
          headers,
        }
      );
      setPractitionerProfileData(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch blockchain data
  async function fetchBlockchainData() {
    setLoading(true);
    try {
      const token = localStorage.getItem("access");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `${BASE_URL}/api/practitioner_nft_blockchain_data?id=${id}`,
        {
          headers,
        }
      );
      setBlockchainData(response?.data?.data);
      setLoading(false);
      setDataPopup(true);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  const handleBlockchainDataPopup = () => {
    fetchBlockchainData();
  };

  // handle viwe blockchain data content in different devices

  const [blockchainContent, setBlockchainContent] = useState("");
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
    if (windowSize < 650) {
      setBlockchainContent("Blockchain");
    } else {
      setBlockchainContent("View Blockchain Data");
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  useEffect(() => {
    fetchPractitionerData();
  }, []);

  useEffect(() => {
    fetchPractitionerProfileData();
  }, [practitionerData?.ownerId]);

  function editNftDataHandler() {
    if (nftDetail?.id) {
      navigate("/practitionerNfts/mint-nft", { state: nftDetail });
    }
  }

  return (
    <>
      {dataPopup && (
        <BlockchainDataPopup
          setDataPopup={setDataPopup}
          data={blockchainData}
        />
      )}
      <div className="py-4 w-full px-2 sm:px-10">
        <h1 className="text-heading-xs sm:text-heading-sm lg:text-heading-lg font-graphik leading-[18px] sm:leading-[44px] text-white">
          Practitioner NFT Details
        </h1>
        <div className="bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] p-[1px] rounded-[24px] mt-10 mb-[7.5rem]">
          <div
            style={{
              background:
                "linear-gradient(94.09deg, #12134d 3.97%, #10053c 51.03%, #12134d 95.99%)",
            }}
            className="w-full py-10 px-5 sm:p-10 rounded-[24px]"
          >
            <div className="py-[16px] md:px-[25px] md:py-[24px] bg-light-blue rounded-3xl">
              <div className=" grid grid-cols-1  md:grid-cols-3  gap-2">
                <div className="col-span-1 flex justify-center items-start md:items-center">
                  <img
                    src={practitionerData && practitionerData?.image}
                    alt="Profile"
                    className="border-1 border-solid border-[#1D2CDF] w-[85px] h-[85px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] xl:w-[300px] xl:h-[300px] rounded-full "
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <h2 className="text-[12px] md:text-[16px] lg:text-[24px] max-md:text-center">
                    {practitionerData && practitionerData?.name}
                  </h2>
                  <p className="text-[12px] md:text-[14px] lg:text-[18px] max-sm:px-5 max-md:px-7">
                    {practitionerData && practitionerData?.bio}
                  </p>
                  <div className="bg-[#1d066880] rounded-lg flex items-center justify-center gap-2 w-full sm:w-fit py-2 px-3 my-4 max-md:mx-auto">
                    <p className="text-[9px] sm:text-[12px] md:text-[10px] lg:text-[12px] font-semibold">
                      Wallet Address:
                    </p>
                    <p
                      id="copyTxt"
                      className="text-[9px] sm:text-[12px] md:text-[10px] lg:text-[12px]"
                    >
                      {practitionerData &&
                        practitionerData?.wallet_address?.replace(/-/g, "")}
                    </p>
                    <img
                      src="/assets/icons/copyIcon.svg"
                      alt="Copy Icon"
                      className="w-[12px] h-[12px]  sm:w-[14px] sm:h-[14px] cursor-pointer"
                      onClick={handleCopy}
                    />
                  </div>
                  <div>
                    {practitionerProfileData && (
                      <table className="text-left mx-auto w-full  border-spacing-2 text-sm sm:text-base">
                        <tbody>
                          <tr>
                            <th>Company Name:</th>
                            <td>
                              {practitionerData &&
                                practitionerProfileData?.companyName}
                            </td>
                          </tr>
                          <tr>
                            <th>Email:</th>
                            <td>
                              {practitionerData &&
                                practitionerProfileData?.email}
                            </td>
                          </tr>
                          <tr>
                            <th>Phone Number:</th>
                            <td>
                              {practitionerData &&
                                practitionerProfileData?.phoneNumber}
                            </td>
                          </tr>
                          <tr>
                            <th>Practitioner:</th>
                            <td>
                              {practitionerProfileData?.practitionerType &&
                                (practitionerProfileData?.practitionerType)
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" ")}
                            </td>
                          </tr>

                          <tr>
                            <th className="align-text-top">
                              State & License Number:
                            </th>
                          </tr>
                          <tr>
                            <td>
                              {practitionerData?.state &&
                                practitionerData.state
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" ")}
                            </td>
                            <td>{practitionerData?.licenseNumber}</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1  md:grid-cols-3 md:gap-2 max-md:place-items-center">
                <div className="md:col-span-1"></div>
                <div className="col-span-1 md:col-span-2 ">
                  {practitionerData?.is_minted === false ? (
                    <CustomDetailBtn
                      onClick={() => editNftDataHandler()}
                      text={
                        practitionerData?.is_minted
                          ? "View Detail"
                          : "Edit Detail"
                      }
                    />
                  ) : (
                    <button
                      onClick={handleBlockchainDataPopup}
                      type="button"
                      className={`flex justify-center items-center gap-2 px-8 py-2 mt-8 bg-gradient-to-r from-[#1D2CDF] to-[#b731ff] rounded-[24px] text-white border-none cursor-pointer text-sm  font-semibold`}
                    >
                      {blockchainContent} {loading ? <LoadingSpinner /> : null}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PractitionerNftDetail;
