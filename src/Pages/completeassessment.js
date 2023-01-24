import React from "react";
import Header from "../components/Header";
import close from "../assets/Svg/close.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div>
      <Header />

      <section className="container mx-auto max-w-2xl px-4 pt-24">
        <main className=" main my-10  md:p-10 p-4">
          <div className="flex justify-between">
            <h3 className="text-gray-400">Results</h3>
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              <img src={close} alt="" />
            </button>
          </div>

          <div className="tab p-4 mt-4">
            <h1 className="py-10 text-center text-green-600 font-bold">
              Congratulations, Assessment Completed Successfully.
            </h1>
            <button
              onClick={handleLogout}
              className="my-10 p-4 mx-auto text-white bg-red-500 font-medium"
            >
              Logout
            </button>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Dashboard;
