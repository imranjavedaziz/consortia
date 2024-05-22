// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { BASE_URL } from "../../src/constants/endpoints";

// axios.defaults.baseURL = BASE_URL;

// axios.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;

//   if (!expectedError) {
//     toast.error("An unexpected error occured.");
//   }

//   return Promise.reject(error);
// });

// export function setJWT(token) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }

// export default {
//   get: axios.get,
//   post: axios.post,
//   put: axios.put,
//   delete: axios.delete,
//   setJWT,
// };
