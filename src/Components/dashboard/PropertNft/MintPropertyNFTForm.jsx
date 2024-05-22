import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { useAuthContext } from "../../../../src/Context/authContext";
import { GET_PROFILE_BY_USERID } from "../../../constants/endpoints";
import api from "../../../services/api";
import apinew from "../../../services/apinew";
import { getId, getToken } from "../../../utils/localStorage";
import InputField from "../../Auth/SignUp/InputField";
import PaymentPopup from "../../Popups/paymentPopup";
import CompleteFileUpload from "../../common/CompleteFileUpload";
import CustomFileUpload from "../../common/CustomFileUpload";
import AutocompleteAddress from "../../common/GoogleMapsApi/AutocompleteAddress";
import SelectInputField from "../../common/SelectInputField";
import CustomButton from "../../customButtons";
import PractitionerListPopup from "../../Popups/PractitionerListPopup";
import SinglePractitionerDetailPopup from "../../Popups/SinglePractitonerDetail";
// import { loadStripe } from "@stripe/stripe-js";
import Term from "../../Popups/termsCondition/Term";

const MintPropertyNFTForm = () => {
  document.title = "Mint NFTs";
  const [loading, setLoading] = useState(false);
  const { setEditNftData, userRole } = useAuthContext();
  const navigate = useNavigate();
  const { state: pendingNftData } = useLocation();

  const [viewPractitionerDetail, setViewPractitionerDetail] = useState(false);
  const [selectedPractitoner, setSelectedPractitoner] = useState(null);
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  const [showPractitionerListPopup, setShowPractitionerListPopup] =
    useState(false);

  const [selectProperty, setSelectProperty] = useState(() => ({
    label:
      pendingNftData?.companyName || pendingNftData?.company_document
        ? "Yes"
        : "",
  }));

  const [houseUrl, setHouseUrl] = useState(() =>
    pendingNftData ? pendingNftData.image : null
  );
  const [entityName, setEntityName] = useState(() =>
    pendingNftData ? pendingNftData.companyName : ""
  );
  const [settlementStatment, setSettlementStatement] = useState(() =>
    pendingNftData ? pendingNftData.document : ""
  );
  const [uploadingSettlement, setUploadingSettlement] = useState(false);

  const [address, setAddress] = useState(() =>
    pendingNftData ? pendingNftData.address : ""
  );
  const [latLngPlusCode, setLatLngPlusCode] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(() =>
    pendingNftData ? pendingNftData.address : ""
  );
  const [entityDocument, setEntityDocument] = useState(() =>
    pendingNftData ? pendingNftData.company_document : null
  );
  const [uploadingEntity, setUploadingEntity] = useState(false);

  const [propertyCategoryOptions, setPropertyCategoryOptions] = useState([
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ]);
  const [isChecked, setIsChecked] = useState(false);
  const [userData, setUserData] = useState({});
  const [data, setData] = useState({});
  const [minPropertyData, setMinPropertyData] = useState({
    address: "",
    // agentId: pendingNftData
    //   ? pendingNftData.agentId
    //   : JSON.parse(localStorage.getItem("profile_info"))?.user?.id,
    // ...(selectProperty?.label === "Yes" ||
    //   (pendingNftData?.company_preview && {
    //     companyName: entityName,
    //     company_document: entityDocument,
    //   })),
    description: "description",
    docCategory: "settlement",
    document: settlementStatment,
    image: houseUrl,
    name: "",
    price: 19.99,
    title: "",
    practitioner_nft_id: "",
    practitioner_id: "",
  });

  useEffect(() => {
    setMinPropertyData((prev) => {
      return {
        ...prev,
        ...(selectProperty?.label === "Yes" && {
          companyName: entityName,
          company_document: entityDocument,
        }),
        image: houseUrl,
        document: settlementStatment,
        address: selectedAddress && selectedAddress,
      };
    });

    if (selectProperty?.label === "No") {
      delete minPropertyData.companyName;
      delete minPropertyData.company_document;
    }
    // eslint-disable-next-line
  }, [
    selectProperty,
    houseUrl,
    entityDocument,
    settlementStatment,
    selectedAddress,
    entityName,
  ]);

  // const getVerifiedCompanies = async () => {
  //   try {
  //     api.setJWT(getToken());
  //     const response = await api.get("verify_company_list");
  //     const verifiedCompanies = response?.data?.data?.map((company) => {
  //       return { value: company.id, label: company.companyName };
  //     });
  //     setPropertyCategoryOptions((initalCompanies) => [
  //       ...[
  //         { value: true, label: "Yes" },
  //         { value: false, label: "No" },
  //       ],
  //       ...verifiedCompanies,
  //     ]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
  //   getVerifiedCompanies();
  //   getUserData();
  //   return () => setEditNftData(null);
  //   // eslint-disable-next-line
  // }, []);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // Identity Verification Session
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
  //   // setShowPaymentCard(false);
  //   // eslint-disable-next-line
  // }, []);

  async function handleSubmit(event) {
    // try {
    event.preventDefault();

    if (!minPropertyData.name) {
      toast.error("Please fill the name field!");
      return;
    }

    if (!minPropertyData.address) {
      toast.error("Please enter address!");
      return;
    }

    if (minPropertyData.image < 1) {
      toast.error("Please upload the photo of house");
      return;
    }
    // if (userData?.stripe_user_block) {
    //   return toast.error("User has been blocked");
    // }

    if (selectProperty?.label === "Yes") {
      if (!minPropertyData.companyName) {
        toast.error("Please fil the Entity Name field!");
        return;
      }
      if (!minPropertyData.company_document) {
        toast.error("Please Upload a legal document for entity!");
        return;
      }
    }

    if (!isChecked) {
      toast.error("Please read and accept the Terms and Conditions");
      return;
    }

    setLoading(true);

    setLoading(false);
    const isPrev = localStorage.getItem("mintnftdata");
    if (isPrev) {
      let deta = JSON.parse(isPrev);
      deta = [...deta, minPropertyData];
      localStorage.setItem("mintnftdata", JSON.stringify(deta));
    } else {
      localStorage.setItem("mintnftdata", JSON.stringify([minPropertyData]));
    }
    setTimeout(() => {
      navigate("/nftWallet/NftWallet");
    }, 3000);
    // const data = {
    //   ...minPropertyData,
    //   practitioner_nft_id: selectedPractitoner
    //     ? selectedPractitoner?.practitioner_nft_id
    //     : null,
    //   practitioner_id: selectedPractitoner ? selectedPractitoner?.id : null,
    // };
    // pendingNftData?.address === selectedAddress
    //   ? (data.title = `${
    //       pendingNftData?.title?.includes("@")
    //         ? pendingNftData?.title?.split("@")[0]
    //         : pendingNftData?.title
    //     }@${minPropertyData.title}`)
    //   : (data.title = `${latLngPlusCode.plusCode}@${minPropertyData.title}`);

    // apinew.setJWT(getToken());
    // const res = pendingNftData
    //   ? await apinew.put(`/api/property_nft/${pendingNftData.id}`, data)
    //   : await apinew.post("/api/create_property_nft", data);

    // if (res?.status >= 200 && res?.status < 400) {
    //   // Creating Identity Verification session again
    //   if (res?.data?.data.client_secret) {
    //     const { error } = await (process.env
    //       .REACT_APP_PUBLIC_IS_LIVE_STRIPE === "true"
    //       ? liveStripe
    //       : stripe
    //     ).verifyIdentity(res?.data?.data.client_secret);
    //     if (error) {
    //       toast.error("Identity Verification went wrong!", {
    //         duration: 4000,
    //       });
    //       navigate("/nftWallet/NftWallet");
    //       console.log("[error]", error);
    //       setLoading(false);
    //       navigate("/nftWallet/NftWallet");
    //     } else {
    //       // setShowPaymentCard(false);
    //       navigate("/nftWallet/NftWallet");
    //     }

    //     return;
    //   }

    // For Edititng NFT. If payment is successful then navigate.
    // pendingNftData?.payment_intent_id && navigate("/nftWallet/NftWallet");

    //     setLoading(false);
    //     // setShowPaymentCard(true);
    //     setData({ id: res?.data?.data?.id });
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   console.log(error);
    // }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setMinPropertyData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // to separate first and last name
  const handleNameChange = (e) => {
    const { name, value } = e.target;

    setMinPropertyData((prev) => {
      const [firstName = "", lastName = ""] = prev.name.split(" ");
      const updatedFirstName = name === "first name" ? value : firstName;
      const updatedLastName = name === "last name" ? value : lastName;
      const updatedName = updatedFirstName + " " + updatedLastName;
      return { ...prev, name: updatedName };
    });
  };

  const handleViewPractitionerDetail = () => {
    setViewPractitionerDetail(true);
  };

  const removePractitioner = () => {
    setSelectedPractitoner(null);
  };

  const [terms, setTerms] = useState(false);

  const handleTerms = () => {
    setTerms(true);
  };

  const handleChecked = (e) => {
    setIsChecked(e.target.checked);
    console.log(e.target.checked);
  };

  return (
    <>
      {terms && <Term setTerms={setTerms} />}
      {viewPractitionerDetail && (
        <SinglePractitionerDetailPopup
          practitionerData={selectedPractitoner}
          setViewPractitionerDetail={setViewPractitionerDetail}
        />
      )}
      {showPaymentCard && (
        <PaymentPopup
          mintNFTData={data}
          setShowPaymentCard={setShowPaymentCard}
        />
      )}
      <div className="py-4 w-full px-10">
        <h1 className="mb-5 text-heading-xs sm:text-heading-sm lg:text-heading-lg font-graphik leading-[18px] sm:leading-[44px] text-white">
          Mint Property NFT
        </h1>

        <div className="bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] p-[1px] rounded-[24px]">
          <div
            style={{
              background:
                "linear-gradient(94.09deg, #12134d 3.97%, #10053c 51.03%, #12134d 95.99%)",
            }}
            className="w-full py-10 px-[12%] lg:px-[201px] xl:px-[250px] rounded-[24px]"
          >
            <form className="flex flex-col gap-5">
              <h2 className="text-heading-xs sm:text-heading-sm md:text-heading-lg text-white">
                Step One: Property Information
              </h2>
              <div className="w-full flex flex-col sm:flex-row  gap-4">
                <div className="sm:w-[50%]">
                  <InputField
                    inputType="text"
                    labelName="First Name on Govt ID"
                    inputId="first name"
                    inputPlaceholder="Enter first name"
                    grayText="Exact Legal name on Government ID"
                    inputName="first name"
                    inputValue={minPropertyData.name.split(" ")[0]}
                    inputOnChangeFunc={handleNameChange}
                  />
                </div>
                <div className="sm:w-[50%]">
                  <InputField
                    inputType="text"
                    labelName="Last Name on Govt ID"
                    inputId="last name"
                    inputPlaceholder="Enter last name"
                    grayText="Exact Legal name on Government ID"
                    inputName="last name"
                    inputValue={minPropertyData.name.split(" ")[1]}
                    inputOnChangeFunc={handleNameChange}
                  />
                </div>
              </div>
              {/* <InputField
                inputType="text"
                labelName="Name"
                inputId="name"
                inputPlaceholder="Enter the exact name"
                grayText="Exact Legal name on Government ID"
                inputName="name"
                inputValue={minPropertyData.name}
                inputOnChangeFunc={handleChange}
              /> */}
              <SelectInputField
                labelName="Property:"
                grayText="Is this property in a trust, LLC, or business entity?"
                dropdownList={propertyCategoryOptions}
                initialValue={pendingNftData?.companyName ? "Yes" : "No"}
                inputOnChangeFunc={handleChange}
                selected={selectProperty}
                setSelected={setSelectProperty}
              />
              {selectProperty?.label === "Yes" && (
                <>
                  <InputField
                    inputType="text"
                    labelName="Entity Name:"
                    inputId="entityName"
                    inputPlaceholder="Enter the entity name"
                    grayText="Exact name of trust, LLC, or business entity"
                    inputName="companyName"
                    inputValue={minPropertyData?.companyName}
                    inputOnChangeFunc={(e) => setEntityName(e.target.value)}
                  />
                  <CompleteFileUpload
                    labelName="Upload a legal document for entity:"
                    grayText="Files types supported: JPG/PNG/PDF (Max Size: 100 MB)"
                    s3Url={entityDocument}
                    setS3Url={setEntityDocument}
                    uploadingToS3={uploadingEntity}
                    setUploadingToS3={setUploadingEntity}
                    editFilePayload={pendingNftData?.company_document_preview}
                    formId={1}
                    maxFileSize={100}
                    fileType="application/pdf"
                    allowPdf={true}
                    property={true}
                    privateBucket={true}
                  />
                </>
              )}
              {/* <AutocompleteAddress
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                setLatLngPlusCode={setLatLngPlusCode}
                address={address}
                setAddress={setAddress}
                setSelectedProvince={setSelectedProvince}
                setSelectedCountry={setSelectedCountry}
                selectedCountry={selectedCountry}
                latLngPlusCode={latLngPlusCode}
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
                  inputValue={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                />
              </div>

              {userRole === "Consumer" && (
                <>
                  {selectedProvince.length > 0 && !selectedPractitoner && (
                    <button
                      type="button"
                      className="text-label-md heading-3 sm:text-[1.2375em] bg-white/0 border-0 outline-none text-white  cursor-pointer w-max"
                      onClick={() => setShowPractitionerListPopup(true)}
                    >
                      <img src="/assets/icons/add.png" alt="" />{" "}
                      <span className="ms-2">Select Agent</span>
                    </button>
                  )}

                  {showPractitionerListPopup && (
                    <PractitionerListPopup
                      setShowPractitionerListPopup={
                        setShowPractitionerListPopup
                      }
                      setSelectedPractitoner={setSelectedPractitoner}
                      selectedPractitoner={selectedPractitoner}
                      selectedProvince={selectedProvince}
                      selectedCountry={selectedCountry}
                    />
                  )}

                  {selectedPractitoner && (
                    <div>
                      <h4 className="text-label-md heading-3 sm:text-[1.2375em] text-white font-normal">
                        Selected Practitioner:
                      </h4>
                      <div className="mt-2 bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] p-0.5 rounded-[24px]">
                        <p className="w-full flex gap-2 justify-between text-white px-4 bg-dark-blue border-0 rounded-[24px] placeholder:font-medium focus:outline-none text-[13px] py-2.5">
                          <span className=":text-[13px] h-max my-auto">
                            {" "}
                            {selectedPractitoner.firstName +
                              " " +
                              selectedPractitoner.lastName}
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              onClick={handleViewPractitionerDetail}
                              className="cursor-pointer material-symbols-outlined "
                            >
                              visibility
                            </span>

                            <span
                              onClick={removePractitioner}
                              className="cursor-pointer material-symbols-outlined text-[red]"
                            >
                              Close
                            </span>
                          </div>
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
              <InputField
                labelName="Appartment No:"
                inputType="text"
                inputPlaceholder="Enter apartment number"
                inputId="apartmentNo"
                inputName="title"
                inputValue={minPropertyData.title}
                inputOnChangeFunc={handleChange}
              />
              <CustomFileUpload
                labelName="Upload a photo of the house:"
                grayText="Files types supported: JPG/PNG (Max Size: 5MB)"
                imageUrl={houseUrl}
                setImageUrl={setHouseUrl}
                editFilePayload={minPropertyData.image}
                formId={2}
                maxFileSize={5}
              />
              {/* <CompleteFileUpload
                labelName="Upload a photo of the house:"
                grayText="Files types supported: JPG/PNG (Max Size: 5MB)"
                s3Url={houseUrl}
                setS3Url={setHouseUrl}
                uploadingToS3={uploadingSettlement}
                setUploadingToS3={setUploadingSettlement}
                editFilePayload={pendingNftData?.document_preview}
                formId={3}
                maxFileSize={100}
                fileType="application/image"
                allowPdf={true}
                property={true}
                privateBucket={true}
              /> */}
              <CompleteFileUpload
                labelName="Upload a copy of the Settlement Statement (Optional)"
                grayText="Files types supported: JPG/PNG/PDF (Max Size: 100 MB)"
                s3Url={settlementStatment}
                setS3Url={setSettlementStatement}
                uploadingToS3={uploadingSettlement}
                setUploadingToS3={setUploadingSettlement}
                editFilePayload={pendingNftData?.document_preview}
                formId={3}
                maxFileSize={100}
                fileType="application/pdf"
                allowPdf={true}
                property={true}
                privateBucket={true}
              />
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
                      className="underline ms-1 text-xs  sm:text-sm cursor-pointer"
                    >
                      Terms & Conditions
                    </p>
                  </label>
                </div>
              </div>

              <CustomButton
                text={
                  pendingNftData ? "Update Property NFT" : "Mint Property NFT"
                }
                px="sm:px-2.5"
                py="sm:py-3 md:py-3.5"
                fsSm="sm:text-[1rem]"
                fsMd="md:text-[1.25rem]"
                type="submit"
                isLoading={loading ? true : null}
                handleButtonClick={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MintPropertyNFTForm;
