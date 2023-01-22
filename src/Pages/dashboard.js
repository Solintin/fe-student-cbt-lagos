import React, {  useState } from "react";
import Header from "../components/Header";
import exam from "../assets/Svg/exam.svg";
import arrowright from "../assets/Svg/arrowright.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Utils/useAxios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function Dashboard() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [testloading, setTestLoading] = useState(false);
  const fetchAssessments = (assessmentType) => {
    assessmentType === "Test" ? setTestLoading(true) : setLoading(true);

    axios
      .post(
        `/assessment/start`,
        {
          assessmentType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: "SET_ASSESSMENT",
          payload: response.data.data.assessment,
        });
        dispatch({
          type: "FETCH_QUESTIONS",
          payload: response.data.data.questions,
        });
        dispatch({
          type: "SET_TIME",
          payload: response.data.data.assessment.duration * 60000,
        });
        assessmentType === "Test" ? setTestLoading(false) : setLoading(false);
        navigate("/instruction");
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data.error.message);
        assessmentType === "Test" ? setTestLoading(false) : setLoading(false);
      });
  };

  return (
    <div>
      <Header />

      <section className="container mx-auto max-w-2xl px-4 pt-24">
        <h1 className="md:mt-20 mt-10 text-blue-400 text-lg mb-2">
          What would you like to do?
        </h1>
        <main className="main md:p-10 p-4">
          <h3 className="text-gray-400">Take Exam</h3>
          <div
            onClick={() => {
              fetchAssessments("Exam");
            }}
            className="tab p-4 mt-4  grid grid-cols-12 items-center gap-4"
          >
            <div className="col-span-1">
              <img src={exam} alt="" className="w-8 h-8" />
            </div>
            <div className="col-span-10">
              <h1 className="text-blue-300 mb-2">Examination</h1>
              <p className="mt-2 md:text-base text-xs">
              Enter here to start your Examination.
              .
              </p>
              {loading && (
                <div className="grid place-content-center py-2">
                  <div className="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-primary-100 border-l-primary-100 animate-spin"></div>
                </div>
              )}
            </div>
            <div className="col-span-1">
              <img src={arrowright} alt="" />
            </div>
          </div>
        </main>
        <main className="main md:p-10 p-4 my-10">
          <h3 className="text-gray-400">Take Test</h3>
          <div
            onClick={() => {
              fetchAssessments("Test");
            }}
            className="tab p-4 mt-4  grid grid-cols-12 items-center gap-4"
          >
            <div className="col-span-1">
              <img src={exam} alt="" className="w-8 h-8" />
            </div>
            <div className="col-span-10">
              <h1 className="text-blue-300 mb-2">Test</h1>
              <p className="mt-2 md:text-base text-xs">
               Enter here to start your test.
              </p>
              {testloading && (
                <div className="grid place-content-center py-2">
                  <div className="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-primary-100 border-l-primary-100 animate-spin"></div>
                </div>
              )}
            </div>
            <div className="col-span-1">
              <img src={arrowright} alt="" />
            </div>
          </div>
        </main>
        <main className=" main   md:p-10 p-4">
          <h3 className="text-gray-400">View results</h3>
          <Link
            to="/results"
            className="tab p-4 mt-4  grid grid-cols-12 items-center gap-4"
          >
            <div className="col-span-1">
              <img src={exam} alt="" className="w-8 h-8" />
            </div>
            <div className="col-span-10">
              <h1 className="text-blue-300 mb-2">View results</h1>
              <p className="mt-2 md:text-base text-xs">
              Enter here to check your results.
              </p>
            </div>
            <div className="col-span-1">
              <img src={arrowright} alt="" />
            </div>
          </Link>
        </main>
      </section>
    </div>
  );
}

export default Dashboard;
