import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { GET_PROFILE_BY_USERID } from "../../../constants/endpoints";
import api from "../../../services/api";
import { getId, getToken } from "../../../utils/localStorage";
import DisablesInputField from "../../Auth/SignUp/DisablesInputField";
import PaymentPopup from "../../Popups/paymentPopup";
import CustomFileUpload from "../../common/CustomFileUpload";
import AutocompleteAddress from "../../common/GoogleMapsApi/AutocompleteAddress";
import CustomButton from "../../customButtons";
import "./radio.css";
import apinew from "../../../services/apinew";
import { loadStripe } from "@stripe/stripe-js";
import DisabledCustomTextArea from "../../Auth/SignUp/DisabledCustomTextArea";
import Term from "../../Popups/termsCondition/Term";

function MintPractitionerNFTForm() {
  const navigate = useNavigate();
  const { state: pendingNftData } = useLocation();
  const [loading, setLoading] = useState(false);

  document.title = "Mint NFTs";

  const [showPaymentCard, setShowPaymentCard] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userData, setUserData] = useState({});
  const [data, setData] = useState({});
  const [selectedOption, setSelectedOption] = useState({
    state: "",
    licenseNumber: "",
  });
  const [selectedAddress, setSelectedAddress] = useState(() =>
    pendingNftData ? pendingNftData.address : ""
  );
  const [address, setAddress] = useState(() =>
    pendingNftData ? pendingNftData.address : ""
  );
  const [isChecked, setIsChecked] = useState(false);
  const [minPractitionerData, setMinPractitionerData] = useState({
    address: "",
    // agentId: JSON.parse(localStorage.getItem("profile_info"))?.user?.id,
    bio: "Here is the bio",
    email: "practitioner@gmail.com",
    image:
      "https://blockprop.s3.amazonaws.com/17163996825831716335870803deal.png",
    licenseType: "agent/broker",
    // license_number: [{ id: "", licenseNumber: "", sate: "" }],
    name: "John Doe",
    licenseNumber: "GQ598450323598",
    // state: "",
  });

  // useEffect(() => {
  //   setMinPractitionerData({
  //     address: selectedAddress,
  //     // agentId: JSON.parse(localStorage.getItem("profile_info"))?.user?.id,
  //     bio: userData?.bio,
  //     email: userData?.email,
  //     image: userData?.headshot,
  //     licenseType: userData?.practitionerType,
  //     license_number: userData?.states,
  //     name: `${userData?.firstName} ${userData?.lastName}`,
  //     licenseNumber: selectedOption?.licenseNumber,
  //     state: selectedOption?.state,
  //   });
  // }, [userData, selectedAddress, selectedOption]);

  console.log("MinPractitionerDaa", minPractitionerData);

  const licenseType = [
    { value: "agent/broker", label: "Real Estate Agent/Broker" },
    { value: "loan officer", label: "Loan Officer / Lender" },
    { value: "title/escrow", label: "Title / Settlement" },
    { value: "mortgage broker", label: "Mortgage Broker" },
    { value: "appraiser", label: "Appraiser" },
  ];
  // const getUserData = async () => {
  //   try {
  //     api.setJWT(getToken());
  //     const res = await api.get(`${GET_PROFILE_BY_USERID + getId()}`);
  //     if (res?.data?.data?.user?.stripe_user_block) {
  //       toast.error("User has been blocked");
  //     }
  //     setUserData(res?.data?.data?.user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getUserData();
  // }, []);

  // // Identity Verification Session
  // const [stripe, setStripe] = useState({});
  // const [liveStripe, setLiveStripe] = useState({});

  // const stripePromise = loadStripe(
  //   process.env.REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY
  // );

  // const stripeLivePromise = loadStripe(
  //   process.env.REACT_APP_PUBLIC_STRIPE_LIVE_PUBLISHABLE_KEY
  // );

  // const getStripe = async () => {
  //   setStripe(await stripePromise);
  // };

  // const getLiveStripe = async () => {
  //   setLiveStripe(await stripeLivePromise);
  // };

  // useEffect(() => {
  //   getStripe();
  //   !!process.env.REACT_APP_PUBLIC_IS_LIVE_STRIPE && getLiveStripe();
  // }, []);

  // handling form with formik & yup
  async function handleSubmit(event) {
    event.preventDefault();
    if (!minPractitionerData.address) {
      toast.error("Please select the address from dropdown list!");
      return;
    }
    if (!isChecked) {
      toast.error("Please read and accept the Terms and Conditions");
      return;
    }
    setLoading(true);
    console.log(minPractitionerData);
    const isPrev = localStorage.getItem("practNft");
    if (isPrev) {
      let deta = JSON.parse(isPrev);
      deta = [...deta, minPractitionerData];
      localStorage.setItem("practNft", JSON.stringify(deta));
    } else {
      localStorage.setItem("practNft", JSON.stringify([minPractitionerData]));
    }
    setTimeout(() => {
      setLoading(false);
      navigate("/nftWallet/NftWallet");
    }, 3000);
  }

  const [terms, setTerms] = useState(false);
  const [check, setCheck] = useState(false);

  const handleTerms = () => {
    setTerms(true);
    setCheck(true);
  };

  const handleChecked = (e) => {
    setIsChecked(e.target.checked);
    console.log(e.target.checked);
  };
  const handleCheckbox = () => {
    if (!check) {
      toast.error("please read the Terms & Conditions");
    }
  };

  return (
    <>
      {terms && <Term setTerms={setTerms} />}
      {showPaymentCard && (
        <PaymentPopup
          isPractitionerNFT={true}
          mintNFTData={data}
          setShowPaymentCard={setShowPaymentCard}
        />
      )}
      <div className="py-4 w-full px-10">
        <h1 className="text-heading-xs sm:text-heading-sm lg:text-heading-lg font-graphik leading-[18px] sm:leading-[44px] text-white">
          Mint Practitioner NFT
        </h1>

        <div className="bg-gradient-to-r mt-5 from-[#1D2CDF] to-[#B731FF] p-[1px] rounded-[24px]">
          <div
            style={{
              background:
                "linear-gradient(94.09deg, #12134d 3.97%, #10053c 51.03%, #12134d 95.99%)",
            }}
            className="w-full py-10 px-[12%] lg:px-[201px] xl:px-[250px] rounded-[24px]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h2 className="text-heading-xs sm:text-heading-sm md:text-heading-lg text-white">
                Practitioner Information
              </h2>
              <DisablesInputField
                inputType="text"
                labelName="Name"
                inputId="name"
                inputPlaceholder="Enter your name"
                inputValue={minPractitionerData.name}
              />
              <DisablesInputField
                inputType="email"
                labelName="Email"
                inputId="email"
                inputPlaceholder="Enter your Email"
                inputValue={minPractitionerData.email}
              />

              {/* <AutocompleteAddress
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                address={address}
                setAddress={setAddress}
              /> */}
              <label className="text-label-md heading-3 sm:text-[1.2375em] text-white">
                Address
              </label>
              <div className="bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] p-0.5 rounded-[24px]">
                <input
                  className={`w-full text-white px-4 bg-dark-blue border-0 py-2.5 rounded-[24px] placeholder:font-medium focus:outline-none text-[13px]`}
                  autoComplete="off"
                  placeholder="Enter address"
                  type="search"
                  name="address"
                  inputValue={minPractitionerData.address}
                  onChange={(e) =>
                    setMinPractitionerData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              </div>

              <CustomFileUpload
                labelName="Upload a Profile Photo:"
                grayText="Files types supported: JPG/PNG (Max Size: 5MB)"
                formId={7}
                imageUrl={minPractitionerData.image}
                setImageUrl={setProfilePhoto}
                maxFileSize={5}
                disabled={true}
              />
              <DisabledCustomTextArea
                inputType="text"
                inputId="Bio"
                padding="h-[80px]"
                inputName="Bio"
                labelName="Bio"
                inputValue={minPractitionerData.bio}
              />

              <div>
                <div className="text-label-xs sm:text-label-sm xl:text-label-lg ">
                  License Type:
                </div>
                <div className="mt-5 space-y-3 grid grid-cols-1 sm:grid-cols-2">
                  {licenseType.map(({ label, value }, i) => {
                    return (
                      <div type={i} className="flex items-center">
                        <input
                          key={i}
                          type="radio"
                          name={value}
                          id={value}
                          className="form-radio custom-radio me-2 h-4 w-4 text-green-500 border-green-500 focus:ring-green-500"
                          readOnly
                          checked={
                            value == minPractitionerData.licenseType
                              ? true
                              : false
                          }
                        />
                        <label
                          className="text-label-s whitespace-nowrap"
                          htmlFor={value}
                        >
                          {label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* <div>
                <div className="text-label-xs sm:text-label-sm xl:text-label-lg ">
                  License Number:
                </div>

                {minPractitionerData?.license_number?.map((value, ind) => (
                  <div key={value} className="flex items-center mt-5">
                    <input
                      value={value.licenseNumber}
                      type="radio"
                      name="License"
                      id={value.state}
                      className="form-radio custom-radio me-2 h-4 w-4 text-green-500 border-green-500 focus:ring-green-500"
                      checked={value.state === selectedOption.state}
                      onChange={() => setSelectedOption(value)}
                    />

                    <label className="text-label-s" htmlFor={value.state}>
                      {console.log(selectedOption, "hahahahaha")}
                      {value.licenseNumber}
                    </label>
                  </div>
                ))}
              </div> */}

              <br />

              <div className="flex justify-between">
                <div class="flex items-center">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChecked}
                    value=""
                    className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="link-checkbox"
                    className="ml-2 cursor-pointer flex text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Click to accept{" "}
                    <p
                      onClick={handleTerms}
                      className="underline ms-2 text-xs  sm:text-sm cursor-pointer"
                    >
                      Terms & Conditions
                    </p>
                  </label>
                </div>
              </div>

              <CustomButton
                text={
                  pendingNftData
                    ? "Update Practitioner NFT"
                    : "Mint Practitioner NFT"
                }
                px="sm:px-2.5"
                py="sm:py-3 md:py-3.5"
                fsSm="sm:text-[1rem]"
                fsMd="md:text-[1.25rem]"
                isLoading={loading ? true : null}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MintPractitionerNFTForm;
