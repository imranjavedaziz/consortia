import api from "./api";

import { AUTH_LOGIN } from "../constants/endpoints.js";

export async function login(payload) {
  const res = await api.post(AUTH_LOGIN, payload);
  // console.log("auth service....", res);
  //   set the local storage if res of success is true
  if (res.data.success) {
    localStorage.setItem("profile_info", JSON.stringify(res?.data?.data));
    localStorage.setItem("access", res?.data?.data?.access);
  }
  return res;
}
