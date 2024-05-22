import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import floorPlan from "./assets/Floor Plan.svg";
import inviteClients from "./assets/Invite your clients 1.svg";
import certifiedListing from "./assets/Make Certified Listing 1.svg";
import mintPractitioner from "./assets/Practitioner NFT 1.svg";
import prepFinancing from "./assets/Home Prep Financing.svg";
import applianceInspection from "./assets/appliance inspection.jpg";
import { useAuthContext } from "../../../../Context/authContext";
import { BASE_URL } from "../../../../constants/endpoints";
import axios from "axios";

const DashboardBottomComp = () => {
  const { userRole } = useAuthContext();
  // practitioner dashboard bottom data
  const practitionerContent = [
    {
      id: 4,
      img: mintPractitioner,
      link: "/practitionerNfts/mint-nft",
      active: true,
    },
    {
      id: 2,
      img: inviteClients,
      active: false,
    },
    {
      id: 3,
      img: certifiedListing,
      active: false,
    },
    {
      id: 1,
      img: applianceInspection,
      link: "/applianceInspectionReport",
      active: false,
    },

    {
      id: 5,
      img: floorPlan,
      link: "/freeFloorPlan",
      active: false,
    },
  ];

  // practitioner dashboard bottom data
  const consumerContent = [
    {
      id: 1,
      img: applianceInspection,
      link: "/applianceInspectionReport",
      active: false,
    },

    {
      id: 5,
      img: floorPlan,
      link: "/freeFloorPlan",
      active: false,
    },
  ];

  const [practitionerData, setPractitionerData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [data, setData] = useState([]);

  // fetch data via api for practitioner listings

  // async function fetchPractitionerData() {
  //   try {
  //     const token = localStorage.getItem("access");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     };
  //     const response = await axios.get(
  //       `${BASE_URL}/api/user_practitioners_list`,
  //       {
  //         headers,
  //       }
  //     );
  //     setPractitionerData(response?.data?.results);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // fetch data via api for property listings
  // async function fetchPropertyData() {
  //   try {
  //     const token = localStorage.getItem("access");

  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     };
  //     const response = await axios.get(`${BASE_URL}/api/user_property_list`, {
  //       headers,
  //     });
  //     setPropertyData(response.data.results);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   if (userRole === "Practitioner") {
  //     fetchPractitionerData();
  //   } else if (userRole === "Consumer") {
  //     fetchPropertyData();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (userRole === "Practitioner") {
  //     if (practitionerData.length !== 0) {
  //       const updatedData = practitionerContent.map((item) => ({
  //         ...item,
  //         active: true,
  //       }));
  //       setData(updatedData);
  //     } else {
  //       setData(practitionerContent);
  //     }
  //   } else if (userRole === "Consumer") {
  //     if (propertyData.length !== 0) {
  //       const updatedData = consumerContent.map((item) => ({
  //         ...item,
  //         active: true,
  //       }));
  //       setData(updatedData);
  //     } else {
  //       setData(consumerContent);
  //     }
  //   }
  // }, [practitionerData, propertyData]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8">
      {consumerContent?.map((item, ind) => {
        return (
          <NavLink
            to={item.link}
            key={item.id}
            className={`relative ${!item.active && "pointer-events-none"}`}
          >
            <img
              className="w-full duration-500 h-full  ease-in-out hover:scale-[1.03] rounded-[35px]"
              src={item.img}
              alt=""
            />
            <div
              className={`top-0 w-full h-full bg-black/40 absolute rounded-[35px] ${
                !item?.active ? "block" : "hidden"
              }`}
            ></div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default DashboardBottomComp;
