import { useState } from "react";

const CustomSelectComponent = ({
  dropdownList,
  initialValue,
  selected,
  setSelected,
  allStates,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState(initialValue);

  const handleSelected = (item) => {
    setSelected(item);
  };

  const handleDropDown = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] p-0.5 rounded-[24px] relative">
      <button
        onClick={handleDropDown}
        className="flex items-center justify-between w-full rounded-[24px] border-0 bg-dark-blue px-3 py-2 cursor-pointer  text-[#FAFBFC]/50"
        style={{ zIndex: -2 }}
      >
        {option}
        {isOpen ? (
          <span className="material-symbols-outlined">arrow_drop_up</span>
        ) : (
          <span className="material-symbols-outlined">arrow_drop_down</span>
        )}
      </button>
      {isOpen && (
        <ul
          className="absolute py-2 bg-[#313770]  w-[95%] left-3  list-none rounded-[8px] border-[1px] border-solid border-white/30 max-h-[250px]"
          style={{ zIndex: 1, overflowY: "scroll" }}
        >
          {allStates && (
            <li
              className={`px-3 cursor-pointer text-white ${
                selected === "All States"
                  ? "bg-[#414761]"
                  : "hover:bg-[#41477B]"
              }  text-[12px] sm:text-[14px]`}
              onClick={(e) => {
                handleDropDown(e);
                setOption(e.target.innerText);
                handleSelected({ label: "All States", value: "united states" });
              }}
            >
              All States
            </li>
          )}
          {dropdownList?.map((item, ind) => (
            <li
              key={ind}
              className={`px-3 cursor-pointer text-white ${
                selected === item.value ? "bg-[#414761]" : "hover:bg-[#41477B]"
              }  text-[12px] sm:text-[14px]`}
              onClick={(e) => {
                handleDropDown(e);
                setOption(e.target.innerText);
                handleSelected(item);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelectComponent;
