import React from "react";

const BlockchainDataPopup = ({ setDataPopup, data }) => {
  const handleCrossClick = () => {
    setDataPopup(false);
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 ">
        <div className="bg-light-blue p-7 sm:p-10 relative  w-[80%] sm:w-[380px] md:w-[571px] rounded-[24px] text-white ">
          <div className="flex justify-between items-center">
            <h2 className="text-heading-xs sm:text-heading-sm md:text-heading-lg font-semibold ">
              Blockchain Data
            </h2>
            <div onClick={handleCrossClick}>
              <img
                src="/assets/icons/cross.svg"
                alt=""
                className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] absolute right-8 sm:right-10 top-[2rem] sm:top-[3.5rem] cursor-pointer "
              />
            </div>
          </div>

          <div className="overflow-auto py-5 text-[18px]">
            <code className="">{JSON.stringify(data)}</code>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockchainDataPopup;
