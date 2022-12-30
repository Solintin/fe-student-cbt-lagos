import React from "react";
import Header from "../../components/Header";
import prev from "../../assets/Svg/prev.svg";
import next from "../../assets/Svg/next.svg";
function index() {
  const N = 60;
  const arr = Array.from({ length: N });
  console.log(arr);
  return (
    <div className="bg-[#F5F6FF] min-h-screen">
      <Header />
      <div className="px-14 pt-28">
        <div className="flex justify-center">
          <div className="bg-[#A098AE26] text-primary-100 font-medium py-4 px-6 text-sm rounded">
            <h1 title="exam-title">Physics</h1>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-10">
          <div className="col-span-8" title="Question">
            <h1 className="text-primary-100 mb-2">Question 1.</h1>

            <div className="mt-2 p-4 rounded bg-white text-primary-100 ">
              <p>
                A boy is standing on an elevator which is traveling downward
                with a constant velocity of 30 meters per second. The boy throws
                a ball vertically upward with a velocity of 10 meters per second
                relative to the elevator. What is the velocity of the ball,
                MAGNITUDE AND DIRECTION, relative to the elevator shaft the
                instant the boy releases the ball?
              </p>
            </div>
            <div className="mt-4 bg-white p-4 rounded flex flex-col gap-4">
              <div className="p-4 border hover:border-green-500 rounded text-primary-100">
                A). tangent to the path of motion
              </div>
              <div className="p-4 border hover:border-green-500 rounded text-primary-100">
                B). tangent to the path of motion
              </div>
              <div className="p-4 border hover:border-green-500 rounded text-primary-100">
                C). tangent to the path of motion
              </div>
              <div className="p-4 border hover:border-green-500 rounded text-primary-100">
                D). tangent to the path of motion
              </div>
            </div>
            <div className="py-14 justify-center flex gap-10">
              <button
                className="py-2 px-4 flex items-center gap-2 rounded bg-primary-100 text-white"
                title="previous"
              >
                <img src={prev} className="h-4 w-4" alt="" />
                <p>Prev</p>
              </button>
              <button
                className="py-2 px-4 rounded bg-info-600 text-white"
                title="next"
              >
                59:02
              </button>
              <button
                className="py-2 px-4 flex items-center gap-2 rounded bg-primary-100 text-white"
                title="next"
              >
                <p>Next</p>
                <img src={next} className="h-4 w-4" alt="" />
              </button>
            </div>
          </div>
          <div className="col-span-4">
            <h3 className="font-medium text-primary-100 mb-2">
              Quick navigation
            </h3>
            <div className="bg-white p-4  rounded flex  flex-wrap gap-4">
              {arr.map((_, id) => {
                return (
                  <button className="bg-[#A098AE26] hover:bg-green-500 hover:text-white  w-8 text-center flex justify-center text-primary-100 px-2 border rounded">
                    {id + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
