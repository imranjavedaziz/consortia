import axios from "axios";
import { toast } from "react-hot-toast";
import { LEAD_FORM_BASE_URL } from "../../src/constants/endpoints";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: LEAD_FORM_BASE_URL,
});

axiosInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.REACT_APP_HIGHLEVEL_API_KEY}`;
// delete axiosInstance.defaults.headers.common["Authorization"];
// Set the JWT token in the Authorization header
// const setJWT = (token) => {
//   if (token) {
//   }
// };

// Response Handling
axiosInstance.interceptors.response.use(
  (response) => {
    // toast.success(response.data.message);
    return response;
  },
  (error) => {
    // return error.response;
    // toast.error("We apologize for the inconvenience!");
    return Promise.reject(error);
    // console.log("inside error.....");
    // const expectedError =
    //   error.response &&
    //   error.response.status >= 400 &&
    //   error.response.status < 500;
    // if (expectedError) {
    //   if (Array.isArray(error?.response?.data?.message)) {
    //     toast.error(error?.response?.data?.message?.error?.[0]);
    //   } else {
    //     if (typeof error?.response?.data?.message === "string") {
    //       toast.error(error?.response?.data?.message);
    //     } else {
    //       toast.error(Object.values(error?.response?.data?.message)?.[0]?.[0]);
    //     }
    //   }
    // } else {
    //   toast.error(
    //     "We apologize for the inconvenience. Your patience is appreciated!"
    //   );
    // }
    // return Promise.reject(error);
  }
);

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  patch: axiosInstance.patch,
};
