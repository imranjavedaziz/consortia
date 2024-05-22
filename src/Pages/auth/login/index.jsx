import { useFormik } from "formik";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "../../../Components/Auth/SignUp/InputField";
import InputPassword from "../../../Components/Auth/SignUp/InputPassword";
import ForgotPwd from "../../../Components/Popups/forgotPwdPopUp/ForgotPwd";
import OtpVerification from "../../../Components/Popups/forgotPwdPopUp/OtpVerification";
import CodeVerificationPopup from "../../../Components/Popups/verificationPopup";
import CustomButton from "../../../Components/customButtons";
import { useAuthContext } from "../../../Context/authContext";
import { AUTH_LOGIN } from "../../../constants/endpoints";
import { loginSchema } from "../../../schema";
import apinew from "../../../services/apinew";
import { toast } from "react-hot-toast";

const Login = () => {
  //   --------------------------------   Popup Controler
  const { state } = useLocation();

  const [showOtpPopup, setShowOtpPopup] = useState(state?.popup ? true : false);
  const [email, setEmail] = useState(state?.email ? state?.email : "");
  const [loading, setloading] = useState(false);

  document.title = "Login";
  const {
    handleLogin,
    otpResetPassword,
    setOtpResetPassword,
    setPractitionerDetails,
    setShowVideo,
    setRole,
  } = useAuthContext();
  const navigateToDashboard = useNavigate();

  const [forgotPwdPopup, setforgotPwdPopup] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: function (values, action) {
        setloading(true);
        if (
          values.email === "consumer@gmail.com" &&
          values.password === "consumer123"
        ) {
          const payload = {
            email: values.email,
            password: values.password,
          };
          localStorage.setItem("profile_info", JSON.stringify(payload));
          localStorage.setItem(
            "access",
            JSON.stringify("df3jh5j3vtj45hk4j2hg4ec2jbr2rh248")
          );
          localStorage.setItem("role", "Consumer");

          setTimeout(() => {
            action.resetForm();
            setloading(false);
            navigateToDashboard("/dashboard/landing");
            handleLogin("df3jh5j3vtj45hk4j2hg4ec2jbr2rh248");
            setRole("Consumer");
            toast.success("Welcome back!");
          }, 3000);
        } else if (
          values.email === "practitioner@gmail.com" &&
          values.password === "practitioner123"
        ) {
          const payload = {
            email: values.email,
            password: values.password,
          };
          localStorage.setItem("profile_info", JSON.stringify(payload));
          localStorage.setItem(
            "access",
            JSON.stringify("df3jh5j3vtj45hk4j2hg4ec2jbr2rh248")
          );
          localStorage.setItem("role", "Practitioner");
          setTimeout(() => {
            action.resetForm();
            setloading(false);
            navigateToDashboard("/dashboard/landing");
            handleLogin("df3jh5j3vtj45hk4j2hg4ec2jbr2rh248");
            setRole("Practitioner");
            toast.success("Welcome back!");
          }, 3000);
        } else {
          toast.error("Invalid Credentials");
          setloading(false);
          return;
        }
      },
    });

  const [showPasswords, setShowPasswords] = useState({
    password: false,
  });

  const togglePasswordVisibility = (inputName) => {
    setShowPasswords({
      ...showPasswords,
      [inputName]: !showPasswords[inputName],
    });
  };

  return (
    <>
      {showOtpPopup && <CodeVerificationPopup email={email} />}
      {forgotPwdPopup && <ForgotPwd setforgotPwdPopup={setforgotPwdPopup} />}
      {otpResetPassword && (
        <OtpVerification setOtpResetPassword={setOtpResetPassword} />
      )}

      <div className="h-screen overflow-auto py-4 bg-blockchain-bg bg-no-repeat bg-cover">
        {/* login --- container */}
        <div className="flex h-full">
          {/* login ------ left */}
          <div className="flex-1 flex justify-center items-center flex-col gap-6 text-white">
            <img
              src="assets/images/consortiaLogo.svg"
              alt="Consortia logo"
              className="w-[104px] h-[54px] sm:w-[217px] sm:h-[125px] "
            />
            <h1 className="text-heading-xs sm:text-heading-sm lg:text-heading-lg font-graphik leading-[18px] sm:leading-[44px]">
              Hello! Welcome Back!
            </h1>
            <h2 className="text-heading-xs sm:text-heading-sm lg:text-heading-lg font-poppins leading-[49px]">
              Login to your account
            </h2>

            <form onSubmit={handleSubmit} className="w-[70%] space-y-7">
              <InputField
                inputType="email"
                inputId="Email"
                inputPlaceholder="mail@example.com"
                inputName="email"
                inputValue={values.email}
                inputOnChangeFunc={handleChange}
                onBlur={handleBlur}
                errorMsg={errors.email}
                labelName="Enter Your Email"
                errors={errors.email}
                touched={touched.email}
              />

              <InputPassword
                labelName="Password"
                inputType={showPasswords.password1 ? "text" : "password"}
                inputPlaceholder="Minimum of 8 characters"
                inputValue={values.password}
                inputOnChangeFunc={handleChange}
                onBlur={handleBlur}
                errorMsg={errors.password}
                showPassFunch={togglePasswordVisibility}
                showPassword={showPasswords.password1}
                inputName="password"
                password="password1"
                errors={errors.password}
                touched={touched.password}
              />
              <div>
                <div className="flex justify-between px-2">
                  <div>
                    <input
                      className="cursor-pointer border-[#3DB8D1] border-2"
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                    />
                    <label
                      className="text-[10px] sm:text-[12px] ml-1.5 cursor-pointer md:text-[14px]"
                      htmlFor="rememberMe"
                    >
                      Remember Me
                    </label>
                  </div>
                  <div>
                    <div
                      className="text-[10px] sm:text-[12px] md:text-[14px] underline bg-[#6565]/0 text-light-pink border-none cursor-pointer"
                      onClick={() => {
                        setforgotPwdPopup(true);
                      }}
                    >
                      Forgot Password?
                    </div>
                  </div>
                </div>
                <div className="mt-2.5">
                  <CustomButton
                    text="Login"
                    type="submit"
                    isLoading={loading ? true : null}
                  />
                </div>
                <div className="text-center mt-2">
                  <span className="mr-2 text-[10px] sm:text-[12px] lg:text-[14px]">
                    Don't have an account yet?
                  </span>
                  <Link
                    className="text-secondary-purpleBlue font-semibold text-[10px] sm:text-[12px] lg:text-[14px]"
                    to="/auth/signup"
                  >
                    Signup
                  </Link>
                </div>
              </div>
            </form>
          </div>
          {/* login ------ right */}
          <div className="flex-1 md:flex justify-center items-center hidden">
            <img
              className="w-[80%] "
              src="assets/images/loginLaptopImage.png"
              alt="laptop"
              title="Laptop"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
