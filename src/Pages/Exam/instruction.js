import React, { useEffect, useState } from "react";
import axios from "../../Utils/useAxios";
import { useSelector } from "react-redux";
import Header from "../../components/Header";

import arrow from "../../assets/Svg/arrow.svg";

import { Link } from "react-router-dom";
function Instruction() {
  const { assessment } = useSelector((state) => state.examination);


  return (
    <div className="inter bg-[#F5F6FF] min-h-screen">
      <Header />
      <div className="md:px-14 px-4 pt-28">
        <div className="flex justify-center mb-4">
          <div className="bg-[#A098AE26] text-primary-100 font-medium py-4 px-6 text-sm rounded">
            <h1 title="exam-title">{assessment.title}</h1>
          </div>
        </div>
        <div className="mt-10 mx-auto max-w-3xl space-y-4">
          <h1 className="text-red-500">
            Carefully read through the test instructions below!!!
          </h1>
         <p> {assessment.instruction} </p>

          <div>
            <Link
              to="/exam"
              className={` py-2 px-4 rounded flex ml-auto max-w-max  items-center gap-4 bg-primary-100  text-white md:my-6 mb-6`}
              title="start text"
            >
              <h3>Start test</h3>
              <img src={arrow} className="h-4 w-4" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instruction;
