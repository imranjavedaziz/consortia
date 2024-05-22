import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL, GET_PROFILE_BY_USERID } from "../constants/endpoints";
import { getId, getToken } from "../utils/localStorage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState("Consumer");
  const [email, setEmail] = useState("");
  const [practitionerDetails, setPractitionerDetails] = useState(false);
  const [profileDetail, setProfileDetail] = useState("");
  const [refetchFromLocalStorage, setRefetchFromLocalStorage] = useState(false);
  const [editNftData, setEditNftData] = useState(null);
  const [headshot, setHeadshot] = useState("head");
  const [editPractitionerNftData, setEditPractitionerNftData] = useState(null);
  const [otpResetPassword, setOtpResetPassword] = useState(false);
  const [emailPswdReset, setEmailPswdReset] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(null);
  const [dataResync, setDataResync] = useState(false);
  const [videoPopup, setVideoPopup] = useState(null);
  const [minting, setMinting] = useState(false);

  // User Data Store

  const isLoggedIn = localStorage.getItem("access");
  const [navigate, setNavigate] = useState(isLoggedIn);

  function handleLogin(token) {
    localStorage.setItem("access", token);
    setNavigate(true);
  }

  function handleLogout() {
    localStorage.clear();
    setNavigate(false);
  }

  // Get Login User Data
  // useEffect(() => {
  //   // Create an instance of Axios
  //   const axiosInstance = axios.create({
  //     baseURL: BASE_URL, // Replace with your API base URL
  //   });

  //   // Add an interceptor to include the JWT token in the request headers
  //   axiosInstance.interceptors.request.use(
  //     (config) => {
  //       config.headers.Authorization = `Bearer ${getToken()}`;
  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );
  //   // Make a request using the axiosInstance
  //   axiosInstance
  //     .get(GET_PROFILE_BY_USERID + getId())
  //     .then((response) => {
  //       setProfileDetail(response?.data?.data?.user);
  //       setHeadshot(response?.data?.data?.user?.headshot);
  //       setVideoPopup(profileDetail?.isWatched);
  //       setEmail(profileDetail.email);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   // eslint-disable-next-line
  // }, [isLoggedIn, dataResync, videoPopup]);

  // var userRole = JSON.parse(localStorage.getItem("profile_info"));
  // userRole = userRole?.user?.role;
  let userRole = localStorage.getItem("role");
  console.log(userRole);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        headshot,
        setHeadshot,
        profileDetail,
        role,
        setRole,
        handleLogin,
        navigate,
        setNavigate,
        handleLogout,
        email,
        setEmail,
        practitionerDetails,
        setPractitionerDetails,
        userRole,
        refetchFromLocalStorage,
        setRefetchFromLocalStorage,
        setEditNftData,
        editNftData,
        editPractitionerNftData,
        setEditPractitionerNftData,
        otpResetPassword,
        setOtpResetPassword,
        emailPswdReset,
        setEmailPswdReset,
        showVideo,
        setShowVideo,
        isSideBarOpen,
        setIsSideBarOpen,
        dataResync,
        setDataResync,
        videoPopup,
        setVideoPopup,
        setMinting,
        minting,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuthContext };
