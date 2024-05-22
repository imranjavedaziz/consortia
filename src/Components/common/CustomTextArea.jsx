import React from "react";

function CustomTextArea(props) {
  const {
    grayText,
    inputType,
    inputId,
    inputPlaceholder,
    inputName,
    inputValue,
    inputOnChangeFunc,
    errorMsg,
    padding,
    labelName,
    inputOnFocusFunc,
    pattern,
    maxLength,
    onKeyDown,
    onBlur,
    errors,
    touched,
    practitionerFormerror,
    defaultValue,
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
        <textarea
          className={`w-full resize-none flex items-center py-4 text-white px-4 bg-dark-blue border-0 rounded-[24px] placeholder:font-medium focus:outline-none text-[13px] ${
            padding ? padding : "py-2.5"
          }`}
          type={inputType}
          id={inputId}
          placeholder={inputPlaceholder}
          name={inputName}
          value={inputValue}
          onChange={inputOnChangeFunc}
          style={{ zIndex: -1, resize: "none" }}
          onFocus={inputOnFocusFunc}
          maxLength={maxLength}
          pattern={pattern}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          defaultValue={defaultValue}
        />
      </div>

      {errors && touched ? (
        <p className="error mx-4 mt-1 text-[14px] text-[red]">{errorMsg}</p>
      ) : null}

      {practitionerFormerror && (
        <p className="error mx-4 mt-1 text-[14px] text-[red]">
          {practitionerFormerror}
        </p>
      )}
    </div>
  );
}

export default CustomTextArea;
