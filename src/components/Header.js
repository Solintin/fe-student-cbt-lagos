import React from "react";
import logo from "../assets/img/school-logo.jpg";
import avatar from "../assets/Svg/avatar.svg";
import abort from "../assets/Svg/abort.svg";

function index() {
  return (
      <div className="fixed bg-primary-100 inset-x-0 py-4 md:px-10">
        <div
          className="grid grid-cols-12 divide-x-2  divide-white"
          title="Header"
        >
          <div className="col-span-8 flex items-center  gap-4">
            <img src={logo} alt="" className="h-16 w-16 rounded" />
            <div>
              <h1 className="text-white font-bold text-2xl">
                Bluefield Secondary School
              </h1>
              <h4 className="text-white  mt-2 text-base">
                Computer Based Test (CBT) Platform
              </h4>
            </div>
          </div>
          <div className="col-span-4 pl-2 flex items-center  gap-4">
            <img src={avatar} alt="" />
            <div>
              <h1 className="text-white font-bold text-xl">
                Welcome, Adekunle
              </h1>
              <h4 className="text-white font-medium text-sm">#1234567890</h4>
            </div>
            <button className="rounded-xl text-white font-semibold text-xs p-3 bg-info-600 flex items-center gap-4">
              <img src={abort} alt="" className="w-5 h-5" />
              Abort test
            </button>
          </div>
        </div>
        
      </div>

  );
}

export default index;
