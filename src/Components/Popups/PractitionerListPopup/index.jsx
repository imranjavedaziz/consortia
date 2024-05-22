import { useEffect, useState } from "react";
import profileImg from "./profile.png";
import apinew from "../../../services/apinew";
import "../../common/CustomCheckBox/customCheckBox.css";
import {

  PRACTITIONER_LIST_BY_ALL_STATES,
  PRACTITIONER_LIST_BY_STATE,
} from "../../../constants/endpoints";
import {  getToken } from "../../../utils/localStorage";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import SelectInputField from "../../common/SelectInputField";
import { getStateAgainstCountry } from "../../../utils/countriesAndStatesApi";
import nextIcon from "../../../../src/assets/icons/Next.png"
import prevIcon from "../../../../src/assets/icons/Prev.png"

const PractitionerListPopup = ({
  setShowPractitionerListPopup,
  setSelectedPractitoner,
  selectedProvince,
  selectedPractitoner,
  selectedCountry,
}) => {
  const [practitionerList, setPractitionerList] = useState([]);
  const [searchPractitionerList, setSearchPractitioner] = useState("");
  const [filterPractitionerList, setFilterPractitioner] = useState([]);
  const [statesAgainstCountry, setStatesAgainstCountry] = useState([]);
  const [selectedStateFromDropdown, setSelectedStateFromDropdown] = useState(
    []
  );

  const [Loader, setLoader] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    const getStates = async () => {
      const resStates = await getStateAgainstCountry(selectedCountry);
      setStatesAgainstCountry(resStates);
    };
    getStates();
  }, [selectedCountry]);

  const getPractitionerList = async () => {
  
    try {
      setLoader(true);
      apinew.setJWT(getToken());
      const res = await apinew.get(
        `${
          PRACTITIONER_LIST_BY_STATE + selectedProvince.toLowerCase()
        }`
      );

      setPractitionerList(res.data.data);

      if (!practitionerList.length) {
        setUserNotFound(true);
      }

      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  useEffect(() => {
    getPractitionerList();
    // eslint-disable-next-line
  }, [selectedProvince]);

  useEffect(() => {
    const END_POINT =
      selectedStateFromDropdown.value === "united states"
        ? PRACTITIONER_LIST_BY_ALL_STATES
        : PRACTITIONER_LIST_BY_STATE + selectedStateFromDropdown.value 
    const getPractitionerListByState = async () => {
      try {
        setLoader(true);
        apinew.setJWT(getToken());
        const res = await apinew.get(
          END_POINT
        );
        setPractitionerList(res.data.data);
            // console.log("working",res.data.data);
        setLoader(false);
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    };

    if (selectedStateFromDropdown !== null) {
      getPractitionerListByState();
    }
  }, [selectedStateFromDropdown]);

  const toFilterPractitioner = searchPractitionerList.toLowerCase();

  useEffect(() => {
    let allPractitionerList = practitionerList;
    let tempFilterPractitioner = [...allPractitionerList];

    if (toFilterPractitioner) {
      tempFilterPractitioner = tempFilterPractitioner.filter((curElem) => {
        return (
          `${curElem.practitioner_detail?.firstName?.toLowerCase()} ${curElem.practitioner_detail?.lastName.toLowerCase()}`.includes(
            toFilterPractitioner
          ) ||
          curElem.practitioner_detail?.lastName?.toLowerCase().includes(toFilterPractitioner) ||
          curElem.practitioner_detail?.email?.toLowerCase().includes(toFilterPractitioner) ||
          curElem.practitioner_detail?.companyName?.toLowerCase().includes(toFilterPractitioner)
        );
      });
    }

    // Update the state with the filtered practitioners
    setFilterPractitioner(tempFilterPractitioner);
    // eslint-disable-next-line
  }, [practitionerList, searchPractitionerList]);

  if (selectedPractitoner) {
    setShowPractitionerListPopup(false);
  }

  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const practitionersPerPage = 9;

  useEffect(() => {
    setTotalPages(
      Math.ceil(filterPractitionerList.length / practitionersPerPage)
    );
  }, [practitionersPerPage, filterPractitionerList]);

 
    const handlePageClick = ( page) => {
      
      setCurrentPage(page);
    };
  
    const handlePreviousPage = (event) => {
      event.preventDefault(); 
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = (event) => {
      event.preventDefault(); 
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
       
      }
    };
  

  const visibleButtons = 5;
  const rangeStart = Math.max(1, currentPage - Math.floor(visibleButtons / 2));
  const rangeEnd = Math.min(totalPages, rangeStart + visibleButtons - 1);




  const indexOfLastPractitioner = currentPage * practitionersPerPage;
  const indexOfFirstPractitioner =
    indexOfLastPractitioner - practitionersPerPage;
  const currentPractitioners = filterPractitionerList.slice(
    indexOfFirstPractitioner,
    indexOfLastPractitioner
  );
  
  

  return (
    <div className="py-4  px-8 fixed inset-0 flex items-center  justify-center z-50 bg-black/50 ">
      <div className="bg-gradient-to-r max-w-[1250px]  max-h-[80vh] overflow-auto mx-auto relative mt-5 from-[#1D2CDF] to-[#B731FF] p-[1px] rounded-[24px]">
        <div
          style={{
            background:
              "linear-gradient(94.09deg, #12134d 3.97%, #10053c 51.03%, #12134d 95.99%)",
          }}
          className=" py-10 px-[1rem] lg:px-[2rem] xl:px-[2.5rem] min-h-[400px] rounded-[24px]"
        >
          <div
            className="absolute top-5 right-10"
            onClick={() => {
              setShowPractitionerListPopup(false);
            }}
          >
            <img
              alt=""
              src="/assets/icons/cross.svg"
              className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-4 mt-5">
            <h3 className="col-span-1 max-[1052px]:col-span-4 text-heading-xs sm:text-heading-sm lg:text-[2rem] font-graphik leading-[18px] sm:leading-[44px] text-white whitespace-nowrap">
              All Agents
            </h3>

            <div className="col-span-3 max-[1052px]:col-span-4 flex justify-end  items-center flex-wrap gap-4 w-full">
              <div className="w-[280px] pb-1  max-[700px]:my-3">
                <SelectInputField
                  initialValue={"Please Select Search Area"}
                  dropdownList={statesAgainstCountry}
                  selected={selectedStateFromDropdown}
                  setSelected={setSelectedStateFromDropdown}
                  allStates={true}
                />
              </div>

              <div className="bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] p-0.5 rounded-[24px]  ">
                <input
                  className={`   text-white px-4 bg-dark-blue border-0  rounded-[24px] placeholder:font-medium focus:outline-none text-[13px] ${"py-2.5"}`}
                  placeholder={"Search by name, company, email"}
                  value={selectedPractitoner}
                  onChange={(e) => setSearchPractitioner(e.target.value)}
                  style={{ zIndex: -1, width: "275px" }}
                />
              </div>
            </div>
          </div>

          {/* ---- User List -------- */}

          {Loader && (
            <div className="text-center mt-[100px]">
              <LoadingSpinner />
            </div>
          )}

          {!Loader && !currentPractitioners.length && userNotFound && (
            <div className="text-center mt-[100px]">No practitioner Found!</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-[2.5rem] gap-x-[1rem] gap-y-[2.5rem] ">
            {!Loader &&
              filterPractitionerList &&
              currentPractitioners?.map((practitioner, index) => (
                <div
                  key={index}
                  className="grid  items-center gap-x-2.5 p-[0.8rem] rounded-xl bg-light-blue"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex ">
                  
                      <img
                        className="rounded-full w-[2.8rem] aspect-square"
                        src={practitioner.practitioner_detail?.headshot || profileImg}
                        alt="Profile"
                      />
                      <div className="ms-2 flex flex-col justify-center ">
                        <h4 className=" text-[0.7rem]">
                          {practitioner.practitioner_detail?.firstName +
                            " " +
                            practitioner.practitioner_detail?.lastName}
                        </h4>
                        <div class="ss:w-[140px] ">
                          <p class="whitespace-normal break-words text-[0.55rem]">
                            {practitioner.practitioner_detail?.companyName}
                          </p>
                        </div>
                        <div class="ss:w-[140px] ">
                          <p class="whitespace-normal break-words text-[0.55rem]">
                            {practitioner.practitioner_detail?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className=""
                      onClick={() => {
                        setSelectedPractitoner({...practitioner?.practitioner_detail, state: practitioner.state, practitioner_nft_id: practitioner.id})
                      }}
                    >
                      <button
                        type="button"
                        className=" w-full px-4  bg-gradient-to-r from-[#1D2CDF] to-[#b731ff] rounded-[12px] text-white  py-1.5 border-none cursor-pointer  font-semibold"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* pagination */}

          {!Loader && filterPractitionerList.length > 9 && (
            <div className="w-full mt-4 flex justify-center gap-4 [&>*]:border-0 [&>*]:cursor-pointer">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1 ? "text-white/50" : "text-white"
                } text-[18px] bg-white/0`}
              >
                {/* {"<"} */}
                <span className="flex justify-center px-2 items-center gap-1 border-solid border-[1px] border-white rounded-[4px]">
                  <img src={prevIcon} alt="prev icon" /> Prev
                </span>
              </button>
              {rangeStart > 1 && (
                <button className="text-white font-medium bg-white/0">
                  ...
                </button>
              )}
              {[...Array(rangeEnd - rangeStart + 1)].map((_, index) => {
                const pageNumber = rangeStart + index;
                return (
                  <button
                    className={`text-white font-medium w-[30px] h-[30px] rounded-full ${
                      pageNumber === currentPage
                        ? // ? "bg-primary-main hover:bg-primary-main/70"
                          "bg-gradient-to-r bg-[#1D2CDF] hover:bg-primary-main/70"
                        : "bg-white/0"
                    }`}
                    key={pageNumber}
                    type="button"
                    onClick={() => handlePageClick(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              {rangeEnd < totalPages && (
                <button className="text-white font-medium bg-white/0">
                  ...
                </button>
              )}
              <button
                className={`${
                  currentPage === totalPages ? "text-white/50" : "text-white"
                } text-[18px] bg-white/0`}
                type="button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                {/* {">"} */}
                <span className="flex justify-center items-center gap-1 px-2 border-solid border-[1px] border-white rounded-[4px]">
                  Next <img src={nextIcon} alt="next icon" />
                </span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PractitionerListPopup;
