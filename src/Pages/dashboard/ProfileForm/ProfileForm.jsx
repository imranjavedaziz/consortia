import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import CustomFileUpload from "../../../Components/common/CustomFileUpload";
import CustomButton from "../../../Components/customButtons";
import { useAuthContext } from "../../../Context/authContext";
import { EDIT_USER_PROFILE } from "../../../constants/endpoints";
import api from "../../../services/api";
import { getToken } from "../../../utils/localStorage";
import CustomTextArea from "../../../Components/common/CustomTextArea";
import InputField from "../../../Components/Auth/SignUp/InputField";
import AutocompleteAddress from "../../../Components/common/GoogleMapsApi/AutocompleteAddress";

function ProfileForm({ setControlProfileForm }) {
  const [loading, setLoading] = useState(false);
  const {
    userRole,
    setHeadshot,
    setShowVideo,
    headshot,
    profileDetail,
    setDataResync,
    setVideoPopup
  } = useAuthContext();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [address, setAddress] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedZipCode, setSelectedZipcode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [otherZipCode, setOtherZipCode] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const showLicenseSince = JSON.parse(localStorage.getItem("profile_info"))
    ?.user?.licenseNumber;

  const handleZipCode = (e) => {
    setOtherZipCode(e.target.value);
  };
  const [formData, setFormData] = useState({
    bio: "",
    headshot: "",
    licenseSince: "",
  });

  useEffect(() => {
    setFormData({
      bio,
      headshot: imageUrl,
      licenseSince: selectedDate,
      zipCode: selectedZipCode
        ? selectedZipCode?.toLowerCase()
        : otherZipCode?.toLowerCase(),
      city: selectedCity?.toLowerCase(),
      address: selectedAddress?.toLowerCase(),
    });
  }, [
    bio,
    imageUrl,
    otherZipCode,
    selectedAddress,
    selectedCity,
    selectedDate,
    selectedZipCode,
  ]);


  const handleSubmit = async (event) => {
    console.log(profileDetail);
    event.preventDefault();
    setDataResync(false);

    if (!imageUrl && !headshot)
      return toast.error("Please Upload Profile Photo");

    if (userRole === "Practitioner") {
      if (!profileDetail.licenseSince && !selectedDate && showLicenseSince) {
        return toast.error("License Since Date is required");
      }

      if (!profileDetail.bio) {
        if (!bio) {
          return toast.error("Bio is required");
        }

        if (bio.length > 1000) {
          return toast.error("Bio should be less than 1000 characters");
        }
      }

      if (
        !profileDetail.city ||
        !profileDetail.address ||
        !profileDetail.zipCode
      ) {
        

        if (selectedCity === "" && selectedProvince === "") {
          toast.error("Please write complete address with state and city in address field.");
          setLoading(false);
          return;
        }

        if (selectedZipCode === "" && otherZipCode === "") {
          toast.error("Postal code is required");
          setLoading(false);
          return;
        }

        if (selectedProvince === "") {
          toast.error("Please add state name in the address field.");
          setLoading(false);
          return;
        }
        if (selectedCity === "") {
          toast.error("Please add city name in the address field.");
          setLoading(false);
          return;
        }
      }
    }

    // Remove the empty property
    Object.keys(formData).forEach((key) => {
      if (
        formData[key] === "" ||
        formData[key] === null ||
        formData[key]?.length === 0
      ) {
        delete formData[key];
      }
    });

    try {
      setDataResync(false);
      setLoading(true);
      api.setJWT(getToken());
      const res = await api.patch(
        EDIT_USER_PROFILE +
          "/" +
          JSON.parse(localStorage.getItem("profile_info"))?.user?.id,
        formData
      );
      if (res?.data?.success) {
        setDataResync((prev)=> !prev);
        setLoading(false);
        setControlProfileForm(false);
        setVideoPopup(profileDetail.isWatched)
        
        if (userRole === "Practitioner") {
          if (!headshot) {
            setHeadshot(res?.data?.data?.user?.headshot);
          }
          setShowVideo(true);
        } else {
          setHeadshot(res?.data?.data?.headshot);
          setShowVideo(true);
        }
      }
    } catch (error) {
      console.log(false);
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {" "}
        <form
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          onSubmit={handleSubmit}
        >
          <div className=" max-h-[600px] xl:max-h-[700px] overflow-auto bg-light-blue p-7 sm:p-10  w-[300px] sm:w-[380px] md:w-[571px] rounded-[24px] text-white ">
            <h2 className="text-heading-xs sm:text-heading-sm md:text-heading-lg font-semibold ">
              Complete Profile
            </h2>
            <p className=" text-[10px] sm:text-[15px] md:text-xl my-3">
              {`Please complete your ${userRole} profile to start minting NFTs`}
            </p>

            {userRole === "Practitioner" && !profileDetail.bio && (
              <CustomTextArea
                inputType="text"
                inputId="Bio"
                labelName="Bio"
                padding="py-10"
                inputPlaceholder="Bio"
                inputName="bio"
                value={bio}
                inputOnChangeFunc={(e) => {
                  setBio(e.target.value);
                }}
              />
            )}

            {!headshot && (
              <div className="my-10">
                <CustomFileUpload
                  labelName="Headshot:"
                  grayText="Files types supported: JPG, PNG, PDF, Max Size: 5MB"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  formId={6}
                  maxFileSize={5}
                />
              </div>
           )} 

            {/* complete profile popup for address */}

            {userRole === "Practitioner" && (
              <>
                {!profileDetail.address && (
                  <div>
                    <div className="w-full my-5">
                      <AutocompleteAddress
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}
                        address={address}
                        setAddress={setAddress}
                        setSelectedProvince={setSelectedProvince}
                        setSelectedCountry={setSelectedCountry}
                        selectedCountry={selectedCountry}
                        setSelectedZipcode={setSelectedZipcode}
                        setSelectedCity={setSelectedCity}
                      />
                    </div>

                    {selectedZipCode === "" ? (
                      <div className="w-full">
                        <InputField
                          inputType="text"
                          inputId="selectedZipCode"
                          inputPlaceholder="Zip Code"
                          inputName="selectedZipCode"
                          inputValue={otherZipCode}
                          inputOnChangeFunc={handleZipCode}
                          labelName="Zip Code"
                        />
                      </div>
                    ) : null}
                  </div>
                )}

                {!profileDetail.licenseSince && (
                  <div className={`${headshot && "mt-5"} `}>
                    <label
                      htmlFor=""
                      className=" text-[14px] sm:md:text-[16px] font-medium text-white/90"
                    >
                      License Since Date:
                    </label>
                    <div className="bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] p-0.5 mt-2 rounded-[24px]">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyy"
                        showYearDropdown
                        scrollableMonthYearDropdown
                        placeholderText="DD/MM/YYYY"
                        className="w-full border-0 outline-none text-white px-4 py-3 bg-dark-blue rounded-[24px] placeholder:font-medium focus:outline-none text-[13px]"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="flex justify-center gap-4 sm:gap-8 mt-5 sm:mt-14">
              <CustomButton
                text="Complete Profile"
                px="sm:px-2.5"
                py="sm:py-3 md:py-4"
                fsSm="sm:text-[1rem]"
                type="submit"
                fsMd="md:text-[1.25rem]"
                isLoading={loading ? true : null}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfileForm;
