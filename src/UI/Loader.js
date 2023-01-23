import React from "react";

function Loader() {
  return (
    <div>
      <div className="grid place-content-center">
        <div className="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-primary-100 border-l-primary-100 animate-spin"></div>
      </div>
    </div>
  );
}

export default Loader;
