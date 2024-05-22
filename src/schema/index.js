import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email should be a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .matches(/^[A-Za-z]+$/, "First Name can only contain alphabets"),
  lastName: Yup.string()
    .required("Last Name is required")
    .matches(/^[A-Za-z]+$/, "Last Name can only contain alphabets"),
  email: Yup.string()
    .email("Email should be a valid email")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  // .matches(
  //   /^\+([0-9]){11,12}$/gm,
  //   "Please enter a valid phone number"
  // ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should have a minimum of 8 characters")
    .matches(
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
      "Must contain atleast one lowercase, one uppercase, a number, and a symbol"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const signUpLeadFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .matches(/^[A-Za-z]+$/, "First Name can only contain alphabets"),
  lastName: Yup.string()
    .required("Last Name is required")
    .matches(/^[A-Za-z]+$/, "Last Name can only contain alphabets"),
  email: Yup.string()
    .email("Email should be a valid email")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  // .matches(
  //   /^\+([0-9]){11,12}$/gm,
  //   "Please enter a valid phone number"
  // ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should have a minimum of 8 characters")
    .matches(
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
      "Must contain atleast one lowercase, one uppercase, a number, and a symbol"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const practitionerDetailsSchema = Yup.object().shape({
  practitioner: Yup.string().required("Practitioner type is required"),
  companyName: Yup.string().required("Business Name is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("Province / State is required"),
  // other_State: Yup.string().when(["state"], {
  //   is: (state) => {
  //     return state === "Other";
  //   },
  //   then: Yup.string().required("State is required"),
  //   // .min(1, "Entity Name is required"),
  //   otherwise: Yup.string().optional(),
  // }),
  // // other_State: Yup.string().optional(),
  // license: Yup.string().when(["practitioner", "country"], {
  //   is: (practitioner, country) =>
  //     (practitioner === "agent/broker" || practitioner === "loan officer") &&
  //     country === "United States",
  //   then: Yup.string().required("This field is required"),
  //   otherwise: Yup.string().optional(),
  // }),
});

export const forgotPassword = Yup.object().shape({
  email: Yup.string()
    .email("Email should be a valid email")
    .required("Email is required"),
  // phoneNumber: Yup.string().required("Phone number is required"),
});

export const changePassword = Yup.object().shape({
  current_password: Yup.string().required("Current Password is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should have a minimum of 8 characters")
    .matches(
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
      "Must contain atleast one lowercase, one uppercase, a number, and a symbol"
    )
    .notOneOf(
      [Yup.ref("current_password"), null],
      "New password should be different from previous password"
    ),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
