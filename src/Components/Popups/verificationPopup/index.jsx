import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../Context/authContext";
import { BASE_URL, RESEND_OTP, VERIFY_OTP } from "../../../constants/endpoints";
import CustomButton from "../../customButtons";

const CodeVerificationPopup = ({ email }) => {
  const [loading, setLoading] = useState(false);
  const { handleLogin, setPractitionerDetails } = useAuthContext();

  const navigate = useNavigate();
  const [popupController, setPopupController] = useState(true);
  const [code, setCode] = useState("");

  const handleSubmitOtp = (event) => {
    setLoading(true);
    // Form submission logic
    event.preventDefault();
    const url = BASE_URL + VERIFY_OTP;
    const headers = { "Content-Type": "application/json" };
    const otpData = {
      email: email,
      otp: code,
      otp_type: "Email",
    };

   if(otpData.otp === ""){
    toast.error("Please Enter OTP to continue.")
    setLoading(false)
   } else {
    axios
    .post(url, otpData, { headers })
    .then((res) => {
      localStorage.setItem("access", res?.data?.access);
      localStorage.setItem("profile_info", JSON.stringify(res?.data?.data));
      toast.success(res?.data?.message);
      setLoading(false);
      setPopupController(false);
      if (
        res?.data?.data?.user?.role === "Practitioner" &&
        !res.data?.data?.user?.practitionerType
      ) {
        setPractitionerDetails(true);
        navigate("/auth/signup");
      } else {
        handleLogin(res?.data?.access);
        navigate("/dashboard/landing");
        localStorage.removeItem("signup_info");
      }
    })

    .catch((err) => {
      setLoading(false);
      console.log(err);
      toast.error(err?.response?.data?.message);
    });
   }
  };

  const resendOtpCode = (event) => {
    event.preventDefault();

    // Form submission logic
    event.preventDefault();
    const url = BASE_URL + RESEND_OTP;
    const headers = { "Content-Type": "application/json" };
    const otpData = {
      email: email,
    };

    axios
      .post(url, otpData, { headers })
      .then((res) => {
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error("abcd");
      });
  };

  return (
    <>
      {popupController && (
        <form
          onSubmit={handleSubmitOtp}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 "
        >
          <div className="bg-light-blue p-7 sm:p-10 relative  w-[80%] sm:w-[380px] md:w-[571px] rounded-[24px] text-white ">
            {/* cross icon */}

            <div
              onClick={() => {
                setPopupController(false);
              }}
            >
              <img
                src="/assets/icons/cross.svg"
                alt=""
                className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] absolute right-8 sm:right-10 top-[2rem] sm:top-[3.5rem] cursor-pointer "
              />
            </div>

            <h2 className="text-heading-xs sm:text-heading-sm md:text-heading-lg font-semibold ">
              Verification Code
            </h2>

            <p className=" text-[10px] sm:text-[15px] md:text-xl my-3">
              Verification email has been sent to your email
            </p>
            <div className="mt-8">
              <div className="bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] p-1 rounded-[24px] ">
                <div className="bg-dark-blue rounded-[24px] flex">
                  <input
                    className="w-full py-2.5 xl:py-3 px-4 bg-dark-blue/50 border-0 rounded-[24px] placeholder:text-white placeholder:opacity-60 text-white focus:outline-none text-[13px] sm:text-[16px]"
                    type="number"
                    name="verificationCode"
                    id="verificationCode"
                    placeholder="Enter Code"
                    onChange={(event) => {
                      setCode(event.target.value);
                    }}
                  />
                  <button
                    type="submit"
                    className="cursor-pointer text-[10px] bg-[transparent] sm:text-[12px] text-[#fae94d] whitespace-nowrap my-auto pr-4 border-0"
                    onClick={resendOtpCode}
                  >
                    Resend Code
                  </button>
                </div>
              </div>
            </div>
            <div className="sm:gap-8 mt-5 sm:mt-14">
              <CustomButton
                type="submit"
                text="Send Request"
                py="sm:py-2.5"
                isLoading={loading ? true : null}
              />
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default CodeVerificationPopup;
