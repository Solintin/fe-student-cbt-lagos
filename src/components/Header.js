import React from "react";
import logo from "../assets/img/school-logo.jpg";
import avatar from "../assets/Svg/avatar.svg";
import abort from "../assets/Svg/abort.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Index() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/")
  };
  return (
    <div className="fixed bg-primary-100 inset-x-0 py-4 md:px-10 px-5">
      <div
        className="grid grid-cols-12 md:divide-x-2  divide-white"
        title="Header"
      >
        <div className="md:col-span-8 col-span-6 flex items-center  gap-4">
          <img src={logo} alt="" className="h-16 w-16 rounded" />
          <div className="hidden md:block">
            <h1 className="text-white font-bold md:text-2xl">
              OKUN-AJAH COMMUNITY SENIOR SEC SCHOOL
            </h1>
            <h4 className="text-white  mt-2 text-base">
              Computer Based Test (CBT) Platform
            </h4>
          </div>
        </div>
        <div className="md:col-span-4 col-span-6  pl-2  flex items-center  gap-4">
          {currentUser?.profileImage ? (
            <img
              src={currentUser?.profileImage.url}
              alt=""
              className="w-[5.25rem] h-[5.25rem]  rounded-full object-cover"
            />
          ) : (
            <img src={avatar} alt="" className="h-12 w-12 hidden md:block" />
          )}
          <div className="space-y-1">
            <h1 className="text-white font-bold md:text-xl text-sm truncate">
              Welcome, {currentUser.fullName}
            </h1>
            <h4 className="text-white font-medium text-sm truncate">
              {currentUser.admissionNo}{" "}
            </h4>
            <button
            onClick={handleLogout}
            className="rounded-xl text-white font-semibold text-xs p-2 bg-info-600 flex items-center"
          >
            <img src={abort} alt="" className="w-3 h-3" />
            Logout
          </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Index;
