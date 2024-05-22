import React, { useEffect } from "react";
import { useState } from "react";

const SearchInputField = ({
  labelName,
  grayText,
  dropdownList,
  selected,
  setSelected,
  setShowPractitionerListPopup,
}) => {
  const [inputProvince, setInputProvince] = useState("");
  const [provincesList, setProvincesList] = useState([]);
  const toFilterProvinces = inputProvince.toLowerCase();

  useEffect(() => {
    let all_provinces = dropdownList;
    let tempFilterProvince = [...all_provinces];
    if (toFilterProvinces) {
      tempFilterProvince = tempFilterProvince.filter((curElem) => {
        if (curElem.label.toLowerCase().includes(toFilterProvinces)) {
          return true;
        }
      });
      setProvincesList(tempFilterProvince);
    }
  }, [dropdownList, toFilterProvinces]);

  const handleChange = (e) => {
    setSelected("");
    setInputProvince(e.target.value);
  };

  return (
    <div className="space-y-1.5">
      <label className="text-label-md heading-3 sm:text-[1.2375em] text-white">
        {labelName}
      </label>
      {grayText && (
        <span className="block text-[#FAFBFC]/50 text-[9px] sm:text-[12px]">
          {grayText}
        </span>
      )}

      <div className="relative bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] p-0.5 rounded-[24px]">
        <input
          className={`w-full text-white px-4 bg-dark-blue border-0 py-2.5 rounded-[24px] placeholder:font-medium focus:outline-none text-[13px]`}
          autoComplete="off"
          type="search"
          value={selected || inputProvince}
          placeholder="Search practitioner by State"
          onChange={handleChange}
        />
        {!selected && inputProvince && (
          <ul
            className="absolute py-2 bg-[#313770]  w-[95%] left-3  list-none rounded-[8px] border-[1px] border-solid border-white/30 max-h-[250px]"
            style={{ zIndex: 1, overflowY: "scroll" }}
          >
            {provincesList?.map((item, ind) => (
              <li
                key={ind}
                className={`px-3 cursor-pointer text-white hover:bg-[#41477B]
                text-[12px] sm:text-[14px]`}
                onClick={() => {
                  setSelected(item.label);
                  setShowPractitionerListPopup(true);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchInputField;
