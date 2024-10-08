import React from "react";

function DisablesInputField(props) {
  const {
    grayText,
    inputType,
    inputId,
    inputPlaceholder,
    inputName,
    inputValue,
    inputOnChangeFunc,
    padding,
    labelName,
    inputOnFocusFunc,
    pattern,
    maxLength,
    onKeyDown,
    onBlur,
  } = props;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="text-label-md heading-3 sm:text-[1.2375em] text-white"
      >
        {labelName}
      </label>
      {grayText && (
        <span className="block text-[#FAFBFC]/50 text-[9px] sm:text-[12px]">
          {grayText}
        </span>
      )}
      <div className="bg-gradient-to-r from-[#1D2CDF] to-[#B731FF] p-0.5 rounded-[24px]">
        <input
          className={`w-full text-white px-4 bg-dark-blue border-0 rounded-[24px] placeholder:font-medium focus:outline-none text-[13px] ${
            padding ? padding : "py-2.5"
          }`}
          type={inputType}
          id={inputId}
          placeholder={inputPlaceholder}
          name={inputName}
          value={inputValue}
          onChange={inputOnChangeFunc}
          style={{ zIndex: -1 }}
          onFocus={inputOnFocusFunc}
          maxLength={maxLength}
          pattern={pattern}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          disabled
        />
      </div>
    </div>
  );
}

export default DisablesInputField;
