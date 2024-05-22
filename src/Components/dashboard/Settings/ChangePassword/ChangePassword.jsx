import { useFormik } from "formik";
import React, { useState } from "react";
import { CHANGE_PASSWORD } from "../../../../constants/endpoints";
import api from "../../../../services/api";
import { getToken } from "../../../../utils/localStorage";
import InputPassword from "../../../Auth/SignUp/InputPassword";
import ChangePasswordVerification from "../../../Popups/verificationPopup/ChangePasswordVerification";
import LoadingSpinner from "../../../common/LoadingSpinner/LoadingSpinner";
import * as Yup from "yup";

const ChangePassword = () => {
  document.title = "Change Password";
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  // show & hide password validation eye

  const [showPasswords, setShowPasswords] = useState({
    password1: false,
    password2: false,
    password3: false,
  });

  const togglePasswordVisibility = (inputName) => {
    setShowPasswords({
      ...showPasswords,
      [inputName]: !showPasswords[inputName],
    });
  };

  const initialValues = {
    current_password: "",
    password: "",
    confirm_password: "",
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
      onSubmit: async (values, action) => {
        try {
          setLoading(true);
          const payload = {
            current_password: values.current_password,
            password: values.password,
            confirm_password: values.confirm_password,
          };
          api.setJWT(getToken());
          const res = await api.post(CHANGE_PASSWORD, payload);
          if (res?.data?.success) {
            setPassword(payload.password);
            action.resetForm();
            setLoading(false);
            setShowOtpPopup(true);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      },
    });

  //   --------------------------------   Popup Controler
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  return (
    <>
      {showOtpPopup && <ChangePasswordVerification password={password} />}
      <div>
        <div className="py-4 w-full px-10  text-white">
          <h1 className="text-heading-xs sm:text-heading-sm lg:text-heading-lg font-graphik leading-[18px] sm:leading-[44px]">
            Settings
          </h1>

          <div className="bg-gradient-to-r mt-5 from-[#1D2CDF] to-[#B731FF] p-[1px] rounded-[24px] ">
            <div
              style={{
                background:
                  "linear-gradient(94.09deg, #12134d 3.97%, #10053c 51.03%, #12134d 95.99%)",
              }}
              className="w-full py-10 px-[12%] lg:px-[201px] xl:px-[250px] rounded-[24px]"
            >
              <form
                className="flex flex-col gap-5 max-w-[700px] mx-auto"
                onSubmit={handleSubmit}
              >
                <div className="text-center">
                  <h1 className="text-heading-xs sm:text-heading-sm lg:text-heading-lg font-graphik leading-[18px] sm:leading-[44px]">
                    Password
                  </h1>
                </div>

                <InputPassword
                  labelName="Current Password"
                  inputType={showPasswords.password1 ? "text" : "password"}
                  inputPlaceholder="Entry Your Current Password"
                  showPassFunch={togglePasswordVisibility}
                  showPassword={showPasswords.password1}
                  inputName="current_password"
                  inputValue={values.current_password}
                  inputOnChangeFunc={handleChange}
                  onBlur={handleBlur}
                  errorMsg={errors.current_password}
                  errors={errors.current_password}
                  touched={touched.current_password}
                  password="password1"
                />

                <InputPassword
                  labelName="New Password"
                  inputType={showPasswords.password2 ? "text" : "password"}
                  inputPlaceholder="Entry New Current Password"
                  showPassFunch={togglePasswordVisibility}
                  showPassword={showPasswords.password2}
                  password="password2"
                  inputName="password"
                  inputValue={values.password}
                  inputOnChangeFunc={handleChange}
                  onBlur={handleBlur}
                  errorMsg={errors.password}
                  errors={errors.password}
                  touched={touched.password}
                />

                <InputPassword
                  labelName="Confirm New Password"
                  inputType={showPasswords.password3 ? "text" : "password"}
                  inputPlaceholder="Confirm Your New Current Password"
                  showPassFunch={togglePasswordVisibility}
                  showPassword={showPasswords.password3}
                  password="password3"
                  inputName="confirm_password"
                  inputValue={values.confirm_password}
                  inputOnChangeFunc={handleChange}
                  onBlur={handleBlur}
                  errorMsg={errors.confirm_password}
                  errors={errors.confirm_password}
                  touched={touched.confirm_password}
                />

                <br />

                <button
                  type="submit"
                  className="text-white cursor-pointer flex item-center justify-center gap-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                    borderRadius: "24px",
                    width: "100%",
                    border: 0,
                    padding: "10px",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Change Password
                  {loading ? <LoadingSpinner /> : null}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
