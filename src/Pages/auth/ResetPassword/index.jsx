import { useFormik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputPassword from "../../../Components/Auth/SignUp/InputPassword";
import ForgotPwd from "../../../Components/Popups/forgotPwdPopUp/ForgotPwd";
import CodeVerificationPopup from "../../../Components/Popups/verificationPopup";
import CustomButton from "../../../Components/customButtons";
import { RESET_PASSWORD } from "../../../constants/endpoints";
import api from "../../../services/api";

const ResetPassword = () => {
  //   --------------------------------   Popup Controler
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);

  document.title = "Reset Password";
  const navigateToDashboard = useNavigate();
  const { state: reset_token } = useLocation();
  const [forgotPwdPopup, setforgotPwdPopup] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: Yup.object().shape({
        password: Yup.string()
          .required("Password is required.")
          .min(8, "Password must be at least 8 characters long."),
        confirm_password: Yup.string()
          .required("Confirm password is required.")
          .oneOf([Yup.ref("password"), null], "Passwords do not match."),
      }),
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async function (values, action) {
        try {
          setloading(true);
          const payload = {
            password: values.password,
            confirm_password: values.confirm_password,
          };
          const res = await api.post(
            `${RESET_PASSWORD + reset_token}`,
            payload
          );
          if (res?.data?.success) {
            navigateToDashboard("/");
          } else {
            setloading(false);
          }
        } catch (error) {
          if (error?.response?.data?.email_verified === false) {
            setloading(false);
            setEmail(values.email);
            setShowOtpPopup(true);
            return;
          }
          console.log(error);
          setloading(false);
        }
      },
    });

  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirm_password: false,
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
      <div className="h-screen overflow-auto py-4 bg-blockchain-bg bg-no-repeat bg-cover">
        {/* login --- container */}
        <div className="flex h-full">
          {/* login ------ left */}
          <div className="flex-1 flex justify-center items-center flex-col gap-6 text-white">
            <h1 className="text-heading-xs sm:text-heading-sm lg:text-heading-lg font-graphik leading-[18px] sm:leading-[44px]">
              Reset Your Passsword
            </h1>

            <form onSubmit={handleSubmit} className="w-[70%] space-y-7">
              <InputPassword
                labelName="Password"
                inputType={showPasswords.password ? "text" : "password"}
                inputPlaceholder="Minimum of 8 characters"
                inputValue={values.password}
                inputOnChangeFunc={handleChange}
                onBlur={handleBlur}
                errorMsg={errors.password}
                showPassFunch={togglePasswordVisibility}
                showPassword={showPasswords.password}
                inputName="password"
                password="password"
                errors={errors.password}
                touched={touched.password}
              />

              <InputPassword
                labelName="Confirm Password"
                inputType={showPasswords.confirm_password ? "text" : "password"}
                inputPlaceholder="Minimum of 8 characters"
                inputValue={values.confirm_password}
                inputOnChangeFunc={handleChange}
                onBlur={handleBlur}
                errorMsg={errors.confirm_password}
                showPassFunch={togglePasswordVisibility}
                showPassword={showPasswords.confirm_password}
                inputName="confirm_password"
                password="confirm_password"
                errors={errors.confirm_password}
                touched={touched.confirm_password}
              />
              <div>
                <div className="mt-2.5">
                  <CustomButton
                    text="Reset Password"
                    type="submit"
                    isLoading={loading ? true : null}
                  />
                </div>
              </div>
            </form>
          </div>
          {/* login ------ right */}
          <div className="flex-1 md:flex justify-center items-center hidden">
            <img
              className="w-[80%] "
              src="/assets/images/loginLaptopImage.png"
              alt="laptop"
              title="Laptop"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
