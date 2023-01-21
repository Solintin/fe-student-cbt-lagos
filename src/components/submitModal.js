import React from "react";
import { useSelector } from "react-redux";

function SubmitModal({ handleModal, handleSubmit, loading }) {
  const { questionBank, touchedQuestion } = useSelector(
    (state) => state.examination
  );
  return (
    <div className="fixed  inter bg-[#00000090] inset-0 grid place-content-center py-10">
      <div className="rounded-lg bg-white w-[350px]">
        <div className="p-4 text-center  border-b-2">
          <h1 className="font-bold text-primary-100">Submit Test</h1>
        </div>
        <div className="py-6 text-center text-gray-600 px-4 ">
          Are you sure you want to submit, You've answered
          <span className="font-semibold mx-2 text-black">
            {touchedQuestion.length}
          </span>
          out of
          <span className="font-semibold mx-2 text-black">
            {questionBank.length}
          </span>
          questions
        </div>
        <div className="flex justify-center gap-8 mb-6">
          <button
            onClick={handleSubmit}
            className={`py-2 px-4 rounded flex bg-green-500 items-center gap-4 text-white`}
          >
            {loading ? (
              <div className="grid place-content-center py-2">
                <div className="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-primary-100 border-l-primary-100 animate-spin"></div>
              </div>
            ) : (
              <h3>Yes</h3>
            )}
          </button>
          <button
            onClick={handleModal}
            className={`py-2 px-4 rounded flex bg-red-500  items-center gap-4 text-black `}
          >
            <h3>No</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitModal;
