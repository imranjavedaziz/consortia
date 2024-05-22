import React, { useState } from "react";
import AutocompleteAddress from "../../common/GoogleMapsApi/AutocompleteAddress";
import InputField from "../../Auth/SignUp/InputField";
import { toast } from "react-hot-toast";
import CustomButton from "../../customButtons";
import apinew from "../../../services/apinew";
import { EDIT_USER_PROFILE } from "../../../constants/endpoints";
import { getToken } from "../../../utils/localStorage";
import { useAuthContext } from "../../../Context/authContext";

const CompleteAddressPopup = () => {
  const { setDataResync } = useAuthContext;
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedAddress, setSelectedAddress] = useState();
  const [address, setAddress] = useState();
  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedZipCode, setSelectedZipcode] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [otherZipCode, setOtherZipCode] = useState("");

  const handleZipCode = (e) => {
    setOtherZipCode(e.target.value);
  };

  const patchProfileData = async (payload) => {
    setDataResync(false);
    apinew.setJWT(getToken());
    const res = await apinew.patch(
      `${EDIT_USER_PROFILE}/${
        JSON.parse(localStorage.getItem("profile_info"))?.user?.id
      }`,
      payload
    );
    if (res?.data?.success) {
      setDataResync(true);
      const old_profile_info = JSON.parse(localStorage.getItem("profile_info"));
      const new_profile_info = {
        ...old_profile_info,
        user: {
          ...old_profile_info.user,
          zipCode: selectedZipCode
            ? selectedZipCode.toLowerCase()
            : otherZipCode.toLowerCase(),
          city: selectedCity.toLowerCase(),
          address: selectedAddress.toLowerCase(),
          country: selectedCountry.toLowerCase(),
          state: selectedProvince.toLowerCase(),
        },
      };
      localStorage.setItem("profile_info", JSON.stringify(new_profile_info));
      setLoading(false);
      toast.success("Details Added Successfully");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedProvince === "" && selectedCity === "") {
        toast.error("Please add state and city in the address field.");
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

      const payload = {
        country: selectedCountry.toLowerCase(),
        zipCode: selectedZipCode
          ? selectedZipCode.toLowerCase()
          : otherZipCode.toLowerCase(),
        city: selectedCity.toLowerCase(),
        address: selectedAddress.toLowerCase(),
        state: selectedProvince.toLowerCase(),
      };

      patchProfileData(payload);
      setOtherZipCode("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 sm:gap-8 mt-5 ">
      <div className="w-full">
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
      <CustomButton
        text="Complete Profile"
        handleButtonClick={handleSubmit}
        type="button"
        isLoading={loading}
      />
    </div>
  );
};

export default CompleteAddressPopup;
