import React from "react";
import Header from "../components/Header";
import exam from "../assets/Svg/exam.svg";
import result from "../assets/Svg/result.svg";
import arrowright from "../assets/Svg/arrowright.svg";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <Header />

      <section className="container mx-auto max-w-2xl px-4 pt-24">
        <h1 className="md:mt-20 mt-10 text-blue-400 text-lg mb-2">What would you like to do?</h1>
        <main className="main md:p-10 p-4">
          <h3 className="text-gray-400">Take Exam</h3>
          <Link to='/exam' className="tab p-4 mt-4  grid grid-cols-12 items-center gap-4">
            <div className="col-span-1">
              <img src={exam} alt="" className="w-8 h-8" />{" "}
            </div>
            <div className="col-span-10">
              <h1 className="text-blue-300 mb-2">Examination</h1>
              <p className="mt-2 md:text-base text-xs">
                Aliquam et tristique convallis mi. Enim vel consequat sed arcu
                nisl pellentesque. Tempor mattis id.
              </p>
            </div>
            <div className="col-span-1">
              <img src={arrowright} alt="" />{" "}
            </div>
          </Link>
        </main>
        <main className=" main my-10  md:p-10 p-4">
          <h3 className="text-gray-400">View results</h3>
          <Link to="/instruction" className="tab p-4 mt-4  grid grid-cols-12 items-center gap-4">
            <div className="col-span-1">
              <img src={exam} alt="" className="w-8 h-8" />{" "}
            </div>
            <div className="col-span-10">
              <h1 className="text-blue-300 mb-2">View results</h1>
              <p className="mt-2 md:text-base text-xs">
                Aliquam et tristique convallis mi. Enim vel consequat sed arcu
                nisl pellentesque. Tempor mattis id.
              </p>
            </div>
            <div className="col-span-1">
              <img src={arrowright} alt="" />{" "}
            </div>
          </Link>
        </main>
      </section>
    </div>
  );
}

export default Dashboard;
