import axios from "axios";
import { BASE_URL } from "../constants/endpoints";

// fetch data via api for practitioner listings


  export const fetchPractitionerData = async (email) => {
    try {
      const token = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(`${BASE_URL}/api/check_practitioner_minted?email=${email}`);
      return response?.data?.data;
    } catch (error) {
      console.error(error);
    }
  }

  // fetch data via api for property listings
  export const fetchPropertyData = async (email) => {
    try {
      const token = localStorage.getItem("access");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(`${BASE_URL}/api/check_property_minted?email=${email}`);
      return response?.data?.data;
    } catch (error) {
      console.error(error);
    }
  }