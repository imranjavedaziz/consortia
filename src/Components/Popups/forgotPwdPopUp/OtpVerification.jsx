import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { VERIFY_OTP_MFA } from "../../../constants/endpoints";
import api from "../../../services/api";
import InputField from "../../Auth/SignUp/InputField";
import CustomButton from "../../customButtons";
import { useAuthContext } from "../../../Context/authContext";

const OtpVerification = ({ setOtpResetPassword }) => {
  const { emailPswdReset } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({
    email: emailPswdReset,
    email_otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!data.email_otp) {
        toast.error("Please Enter Email OTP!");
        return;
      }
      setloading(true);
      const res = await api.post(VERIFY_OTP_MFA, data);
      if (res?.data?.success) {
        setloading(true);
        navigate(`/auth/reset-password`, {
          state: res?.data?.reset_token,
        });
        setOtpResetPassword(false);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 ">
      <form onSubmit={handleSubmit}>
        <div className="bg-light-blue p-7 sm:p-10 relative  w-[80%] sm:w-[380px] md:w-[571px] rounded-[24px] text-white ">
          {/* cross icon */}
          <div
            onClick={() => {
              setOtpResetPassword(false);
            }}
          >
            <img
              src="/assets/icons/cross.svg"
              alt=""
              className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] absolute right-8 sm:right-10 top-[2rem] sm:top-[3.5rem] cursor-pointer "
            />
          </div>
          <h2 className="text-heading-xs sm:text-heading-sm md:text-heading-lg font-semibold ">
            Reset Password
          </h2>
          <p className=" text-[10px] sm:text-[15px] md:text-xl my-3 mb-5 pb-3">
            Please check your email, we have sent verification code to reset
            your password.
          </p>

          <InputField
            inputType="number"
            inputId="Email OTP Number"
            inputPlaceholder="Enter Verification Code"
            inputName="email_otp"
            labelName="Verification Code"
            inputValue={data.email_otp}
            inputOnChangeFunc={handleChange}
          />
          <div className="sm:gap-8 mt-5 sm:mt-10">
            <CustomButton
              type="submit"
              text="Submit"
              py="sm:py-2.5"
              isLoading={loading ? true : null}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtpVerification;
