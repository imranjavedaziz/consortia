import React from "react";
import { useEffect } from "react";

const HomePrepFinancing = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="m-10">
        <div className="text-heading-xs sm:text-heading-sm lg:text-heading-lg mb-10 font-graphik  sm:leading-[44px]">
          Home Prep Financing
        </div>
        <div>
          <div
            data-tf-widget="ftB68hqZ"
            data-tf-opacity="100"
            data-tf-iframe-props="title=Knock"
            data-tf-transitive-search-params
            data-tf-
            medium="snippet"
            data-tf-hidden="hubspot_utk=,hubspot_page_name=,hubspot_page_url="
            style={{ width: "100%", height: "500px" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default HomePrepFinancing;
