import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../Components/Auth/SignUp/InputField";
import InputPassword from "../Components/Auth/SignUp/InputPassword";
import InputPhone from "../Components/Auth/SignUp/InputPhone";
import LoadingSpinner from "../Components/common/LoadingSpinner/LoadingSpinner";
import { useAuthContext } from "../Context/authContext";
import { AUTH_REGISTER, BASE_URL } from "../constants/endpoints";
import { signUpSchema } from "../schema";
import apiLeadForm from "../services/apiLeadForm";
import {
  fetchPractitionerData,
  fetchPropertyData,
} from "../utils/propertyAndPractitioner";
import ConsumerMetaPixel from "../services/helmet/ConsumerMetaPixel";
import PractitionerMetaPixel from "../services/helmet/PractitionerMetaPixel";

function Signup({ setShowLeadForm }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let userRole = pathname.split("/")[1];
  userRole === "consumer"
    ? (userRole = "Consumer")
    : (userRole = "Practitioner");
  document.title = `${userRole} Lead Form`;
  const [loading, setLoading] = useState(false);

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
        const signupPayload = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
          confirm_password: values.confirmPassword,
          role: userRole,
        };
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: `+${values.phoneNumber}`,
          customField: {
            rZKDB2gmvljCcGfaHNS7: userRole,
          },
        };
        userRole === "Consumer"
          ? (payload.tags = ["Consumer", "NoPropNFT"])
          : (payload.tags = ["Practitioner", "NoPractNFT"]);
        try {
          const res = await axios.post(BASE_URL + AUTH_REGISTER, signupPayload);
          if (res.data.success) {
            const leadRes = await apiLeadForm.post("/contacts/", payload);
            if (leadRes.status === 200) {
              toast.success("User account created! Thank You for Submitting!");
              setLoading(false);
              action.resetForm();
              navigate("/", { state: { popup: true, email: payload.email } });
            }
          }
        } catch (err) {
          // For existing users
          if (!err.response.data.success) {
            if (userRole === "Consumer") {
              const propertyNFTData = await fetchPropertyData(values.email);
              propertyNFTData.forEach((obj) => {
                if (obj.is_minted) {
                  payload.tags[1] = "PropNFT";
                  return;
                }
              });
            } else {
              const practitionerNFTData = await fetchPractitionerData(
                values.email
              );
              practitionerNFTData.forEach((obj) => {
                if (obj.is_minted) {
                  payload.tags[1] = "PractNFT";
                  return;
                }
              });
            }
            const leadRes = await apiLeadForm.post("/contacts/", payload);
            if (leadRes.status === 200) {
              toast.success("User already exists! Thank You for Submitting!");
              setLoading(false);
              action.resetForm();
              navigate("/");
            }
          }
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

  const consumerVideo = "https://consortiamedia.s3.amazonaws.com/Consumer.mp4";
  const practitionerVideo =
    "https://consortiamedia.s3.amazonaws.com/Practitioner.mp4";

  return (
    <>
      {userRole === "Consumer" ? (
        <ConsumerMetaPixel />
      ) : userRole === "Practitioner" ? (
        <PractitionerMetaPixel />
      ) : null}
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <div className=" bg-light-blue h-[90%] max-h-[900px] overflow-auto py-7 px-3 sm:p-10 relative  w-[95%] sm:w-[480px] md:w-[671px] rounded-[24px] text-white">
          {/* sign up ------ right */}
          <div
            className="px-2 py-4 relative"
            style={{ boxSizing: "border-box" }}
          >
            <img
              onClick={() => setShowLeadForm(false)}
              src="/assets/icons/cross.svg"
              alt=""
              className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] cursor-pointer absolute right-1 top-1"
            />
            <div>
              <h1 className="text-heading-xs sm:text-heading-sm lg:text-heading-lg mt-5 font-graphik  sm:leading-[44px] text-center">
                {userRole}
              </h1>
            </div>
            {/* iframe video */}

            {/* <div
              className="flex items-center justify-center xs:block md:hidden mt-4"
              style={{ textAlign: "-webkit-center" }}
            >
              <div
                style={{ justifySelf: "center", zIndex: 99999 }}
                className="mt-1 ss:w-[360px] sm:w-[380px]"
              >
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%", // This is for a 16:9 aspect ratio (adjust as needed)
                    height: 0,
                    overflow: "hidden",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <iframe
                    style={{
                      zIndex: 99999,
                      opacity: 1,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    src={
                      userRole === "Consumer"
                        ? consumerVideo
                        : practitionerVideo
                    }
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
            iframe video */}

            <form
              className="lg:w-[450px] pt-[30px] ss:w-[360px] sm:w-[380px] space-y-7 mx-auto"
              onSubmit={handleSubmit}
            >
              {/* <div>
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
              </div> */}
              <InputField
                inputType="text"
                inputId="FirstName"
                labelName="First Name"
                inputPlaceholder="First Name"
                inputName="firstName"
                inputValue={values.firstName}
                inputOnChangeFunc={handleChange}
                onBlur={handleBlur}
                errorMsg={errors.firstName}
                errors={errors.firstName}
                touched={touched.firstName}
              />

              <InputField
                inputType="text"
                inputId="LastName"
                labelName="Last Name"
                inputPlaceholder="Last Name"
                inputName="lastName"
                inputValue={values.lastName}
                inputOnChangeFunc={handleChange}
                onBlur={handleBlur}
                errorMsg={errors.lastName}
                errors={errors.lastName}
                touched={touched.lastName}
              />

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
                Submit
                {loading ? <LoadingSpinner /> : null}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

// {/* <div className="bg-blockchain-bg bg-no-repeat bg-cover h-screen overflow-auto text-white">
// {/* sign up --- container */}
// <div className="h-full md:grid md:grid-cols-2">
//   {/* sign up  ------ left */}

//   <div
//     className="relative xs:hidden md:block text-center"
//     style={{ background: "rgba(24, 10, 91, 0.8)" }}
//   >
//     {/* <img
//       src="/assets/images/signupbackground.jpg"
//       className=" opacity-20 absolute inset-0 mx-auto my-auto"
//       alt=""
//     /> */}

//     <img
//       src="/assets/images/consortiaLogo.svg"
//       alt="Consortia logo"
//       className="w-[320px] h-[260px]"
//     />

//     {/* iframe video */}
//     {/* <div className="mt-1"
//       style={{zIndex:99999}}
//     >
//       <iframe
//       style={{zIndex:99999, opacity:1, position: 'relative'}}
//         width="80%"
//         height="400"
//         src={userRole === "Consumer" ? consumerVideo : practitionerVideo}
//         title="YouTube video player"
//         frameborder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         allowFullScreen
//       ></iframe>
//     </div> */}
//     <div className="flex items-center justify-center ">
//       <div
//         className="mt-1"
//         style={{ width: "80%", justifySelf: "center", zIndex: 99999 }}
//       >
//         <div
//           style={{
//             position: "relative",
//             paddingBottom: "56.25%", // This is for a 16:9 aspect ratio (adjust as needed)
//             height: 0,
//             overflow: "hidden",
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           <iframe
//             style={{
//               zIndex: 99999,
//               opacity: 1,
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//             }}
//             src={
//               userRole === "Consumer"
//                 ? consumerVideo
//                 : practitionerVideo
//             }
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             allowFullScreen
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   </div> */}
