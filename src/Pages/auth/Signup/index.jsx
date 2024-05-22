import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import InputField from "../../../Components/Auth/SignUp/InputField";
import InputPassword from "../../../Components/Auth/SignUp/InputPassword";
import InputPhone from "../../../Components/Auth/SignUp/InputPhone";
import SignupPopup from "../../../Components/Popups/signupPopup";
import CodeVerificationPopup from "../../../Components/Popups/verificationPopup";
import LoadingSpinner from "../../../Components/common/LoadingSpinner/LoadingSpinner";
import { useAuthContext } from "../../../Context/authContext";
import { AUTH_REGISTER } from "../../../constants/endpoints";
import { signUpSchema } from "../../../schema";
import apinew from "../../../services/apinew";
import PractitionerForm from "./PractitionerForm";

function Signup() {
  document.title = "Signup";
  const [loading, setLoading] = useState(false);

  const { role, setRole, email, setEmail, practitionerDetails } =
    useAuthContext();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async function (values, action) {
      try {
        setLoading(true);
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
          confirm_password: values.confirmPassword,
          role: role,
        };
        const res = await apinew.post(AUTH_REGISTER, payload);
        if (res.data.success) {
          toast.success("Welcome to Consortia! Please verify your email");
          setLoading(false);
          setShowOtpPopup(true);
          setEmail(values.email);
          action.resetForm();
        }
      } catch (error) {
        setLoading(false);
      }
    },
  });

  // show & hide password validation eye

  const [showPasswords, setShowPasswords] = useState({
    password1: false,
    password2: false,
  });

  const togglePasswordVisibility = (inputName) => {
    setShowPasswords({
      ...showPasswords,
      [inputName]: !showPasswords[inputName],
    });
  };

  //   --------------------------------   Popup Controler

  const [showModal, setShowModal] = useState(
    practitionerDetails ? false : true
  );

  const handleButtonClick = (value) => {
    setRole(value);
    setShowModal(false);
  };

  //   --------------------------------   Popup Controler
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  //   --------------------------------   forms screen Controler

  return (
    <>
      {showOtpPopup && <CodeVerificationPopup email={email} />}
      {showModal && <SignupPopup handleButtonClick={handleButtonClick} />}
      <div className="bg-blockchain-bg bg-no-repeat bg-cover h-screen overflow-auto text-white">
        {/* sign up --- container */}
        <div className="h-full md:grid md:grid-cols-2">
          {/* sign up  ------ left */}

          <div
            className="relative xs:hidden md:block text-center"
            style={{ background: "rgba(24, 10, 91, 0.8)" }}
          >
            <img
              src="/assets/images/signupbackground.jpg"
              className="h-screen w-full opacity-20 absolute start-0"
              alt=""
            />

            <img
              src="/assets/images/consortiaLogo.svg"
              alt="Consortia logo"
              className="w-[320px] h-[260px]"
            />
          </div>

          {/* sign up ------ right */}
          <div className="">
            <div>
              <h1 className="text-heading-xs sm:text-heading-sm lg:text-heading-lg mt-5 font-graphik  sm:leading-[44px] text-center">
                {!practitionerDetails
                  ? "User Registration"
                  : "Practitioner Details"}
              </h1>
            </div>
            {!practitionerDetails ? (
              <>
                <form
                  className="lg:w-[450px] pt-[30px] ss:w-[360px] sm:w-[380px] space-y-7 mx-auto"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      className="text-label-md heading-3 sm:text-[1.2375em]"
                      htmlFor="FirstName"
                    >
                      Name
                    </label>

                    <div className="flex justify-between mt-2">
                      <div className="w-[46%]">
                        <InputField
                          inputType="text"
                          inputId="FirstName"
                          inputPlaceholder="First Name"
                          inputName="firstName"
                          inputValue={values.firstName}
                          inputOnChangeFunc={handleChange}
                          onBlur={handleBlur}
                          errorMsg={errors.firstName}
                          errors={errors.firstName}
                          touched={touched.firstName}
                        />
                      </div>
                      <div className="w-[46%]">
                        <InputField
                          inputType="text"
                          inputId="LastName"
                          inputPlaceholder="Last Name"
                          inputName="lastName"
                          inputValue={values.lastName}
                          inputOnChangeFunc={handleChange}
                          onBlur={handleBlur}
                          errorMsg={errors.lastName}
                          errors={errors.lastName}
                          touched={touched.lastName}
                        />
                      </div>
                    </div>
                  </div>

                  <InputField
                    inputType="email"
                    inputId="Email"
                    inputPlaceholder="mail@example.com"
                    inputName="email"
                    inputValue={values.email}
                    inputOnChangeFunc={handleChange}
                    onBlur={handleBlur}
                    errorMsg={errors.email}
                    labelName="Email"
                    errors={errors.email}
                    touched={touched.email}
                  />

                  <div>
                    <label className="text-label-md heading-3 sm:text-[1.2375em]">
                      Phone Number
                    </label>
                    <InputPhone
                      inputType="phone"
                      inputId="Phone Number"
                      inputPlaceholder="Phone number"
                      inputName="phoneNumber"
                      inputValue={values.phoneNumber}
                      inputOnChangeFunc={handleChange}
                      onBlur={handleBlur}
                      errorMsg={errors.phoneNumber}
                      labelName="Phone Number"
                      errors={errors.phoneNumber}
                      touched={touched.phoneNumber}
                      setFieldValue={setFieldValue}
                    />
                  </div>

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

                  <InputPassword
                    labelName="Confirm Password"
                    inputType={showPasswords.password2 ? "text" : "password"}
                    inputPlaceholder="Confirm Password"
                    inputValue={values.confirmPassword}
                    inputOnChangeFunc={handleChange}
                    onBlur={handleBlur}
                    errorMsg={errors.confirmPassword}
                    showPassFunch={togglePasswordVisibility}
                    showPassword={showPasswords.password2}
                    inputName="confirmPassword"
                    password="password2"
                    errors={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />

                  {role === "Consumer" ? (
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
                      Create Account
                      {loading ? <LoadingSpinner /> : null}
                    </button>
                  ) : (
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
                      Next
                      {loading ? <LoadingSpinner /> : null}
                    </button>
                  )}

                  <div className="text-center">
                    Already have an account?{" "}
                    <Link
                      to={"/"}
                      className="ps-2 decoration-1 underline pointer cursor-pointer font-semibold text-lg	"
                    >
                      Login
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <PractitionerForm />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
