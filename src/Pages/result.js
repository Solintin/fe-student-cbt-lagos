import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import close from "../assets/Svg/close.svg";

import { useNavigate } from "react-router-dom";
import axios from "../Utils/useAxios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function Dashboard() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const fetchResults = (e) => {
    setLoading(true);
    axios
      .get(`/result`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setResults(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        // toast.error(error.response.data.error.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            {loading && (
              <div className="grid place-content-center py-2">
                <div className="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-primary-100 border-l-primary-100 animate-spin"></div>
              </div>
            )}
            {results.length > 0 ? (
              <div>
                <div className=" py-4 grid grid-cols-12 gap-10 text-primary-100 font-medium border-b">
                  <div className="col-span-2 ">S/N</div>
                  <div className="col-span-5">Name</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-3">Score</div>
                </div>
                {results.map((item, idx) => (
                  <div
                    key={idx}
                    className=" py-4 grid grid-cols-12 gap-10 text-primary-100 font-medium border-b"
                  >
                    <div className="col-span-2"> {idx + 1} </div>
                    <div className="col-span-5"> {item.assessment.title} </div>
                    <div className="col-span-2"> {item.assessment.type} </div>
                    <div className="col-span-3">
                      {" "}
                      {item.totalCorrectAnswer}{" "}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-red-400 font">
                No Result yet
              </div>
            )}
          </div>
        </main>
      </section>
    </div>
  );
}

export default Dashboard;
