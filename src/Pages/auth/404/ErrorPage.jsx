import React from "react";

const ErrorPage = () => {
  return (
    <div className="bg-error-bg bg-no-repeat text-white bg-cover min-h-screen relative">
      <div className="text-center flex justify-center items-center h-[100vh] text-xl	">
        <div className="pe-5" style={{ borderRight: "3px solid white" }}>
          404
        </div>{" "}
        <div className="ms-5">This page could not be found.</div>
      </div>
    </div>
  );
};

export default ErrorPage;
