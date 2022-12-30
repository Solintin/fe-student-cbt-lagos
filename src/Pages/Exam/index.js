import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import prev from "../../assets/Svg/prev.svg";
import next from "../../assets/Svg/next.svg";
import Questions from "../../assets/QuestionBank.json";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  setCurrentQuestion,
  setTouchedQuestion,
} from "../../Redux/Actions/ActionCreators";
function Exam() {
  const [questions, setQuestion] = useState(Questions);
  //   const [randomQuestions, setRandomQuestions] = useState([]);
  //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //   const [prevQuestion, setPrevQuestion] = useState(null);
  //   const [nextQuestion, setNextQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { questionBank, currentQuestion, touchedQuestion } = useSelector(
    (state) => state.examination
  );
  const generateRandomQuestion = (data) => {
    let arrayContainer = [];
    let questionContainer = [];
    const genNum = Math.floor(Math.random() * data.length);
    arrayContainer.push(genNum);
    questionContainer = [...questionContainer, data[genNum]];
    for (let counter = 0; counter < data.length - 1; counter++) {
      let newGen = Math.floor(Math.random() * data.length);
      while (arrayContainer.lastIndexOf(newGen) !== -1) {
        newGen = Math.floor(Math.random() * data.length);
      }
      arrayContainer.push(newGen);
      questionContainer = [...questionContainer, data[newGen]];
    }
    // setRandomQuestions(questionContainer);
    dispatch(fetchQuestions(questionContainer));

    setLoading(false);
  };

  const updateCurrentQuestion = (index) => {
    dispatch(setCurrentQuestion(index));
  };
  console.log(loading);

  const handleNextQuestion = () => {
    if (currentQuestion < questionBank.length - 1) {
      let index = currentQuestion + 1;
      updateCurrentQuestion(index);
    }
  };
  const handlePrevQuestion = () => {
    let index = currentQuestion - 1;
    updateCurrentQuestion(index);
  };

  const isQuestionTouched = (question) => {
    return touchedQuestion.find((item) => item.id === question.id);
  };
  const handleTouchedQuestion = (question) => {
    const touchedQuestionCopy = touchedQuestion;
    console.log(touchedQuestionCopy);
    if (touchedQuestionCopy.length > 0) {
      const isQuestionAnswered = isQuestionTouched(question);
      console.log(isQuestionAnswered);
      if (!isQuestionAnswered) {
        dispatch(setTouchedQuestion([...touchedQuestionCopy, question]));
      }
    } else {
      dispatch(setTouchedQuestion([...touchedQuestionCopy, question]));
    }
  };
  const pickQuestion = (questionId) => {
    updateCurrentQuestion(questionId);
  };
  const handleAnswer = (question, answer) => {
    handleTouchedQuestion(question);
    handleNextQuestion();
  };

  useEffect(() => {
    generateRandomQuestion(Questions);
    console.log(currentQuestion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-[#F5F6FF] min-h-screen">
      <Header />
      <div className="px-14 pt-28">
        <div className="flex justify-center">
          <div className="bg-[#A098AE26] text-primary-100 font-medium py-4 px-6 text-sm rounded">
            <h1 title="exam-title">Physics</h1>
          </div>
        </div>

        {!loading && (
          <div className="grid grid-cols-12 gap-x-10">
            <div className="col-span-8" title="Question">
              <div>
                <h1 className="text-primary-100 mb-2">
                  Question {currentQuestion + 1}
                </h1>

                <div className="mt-2 p-4 rounded bg-white text-primary-100 ">
                  <p>{questionBank[currentQuestion]?.question}</p>
                </div>
                <div className="mt-4 bg-white p-4 rounded flex flex-col gap-4">
                  <div
                    onClick={() => {
                      handleAnswer(
                        questionBank[currentQuestion],
                        questionBank[currentQuestion]?.optionA
                      );
                    }}
                    className="p-4 border hover:border-green-500 rounded text-primary-100"
                  >
                    A). {questionBank[currentQuestion]?.optionA}
                  </div>
                  <div
                    onClick={() => {
                      handleAnswer(
                        questionBank[currentQuestion],
                        questionBank[currentQuestion]?.optionA
                      );
                    }}
                    className="p-4 border hover:border-green-500 rounded text-primary-100"
                  >
                    B). {questionBank[currentQuestion]?.optionB}
                  </div>
                  <div
                    onClick={() => {
                      handleAnswer(
                        questionBank[currentQuestion],
                        questionBank[currentQuestion]?.optionA
                      );
                    }}
                    className="p-4 border hover:border-green-500 rounded text-primary-100"
                  >
                    C). {questionBank[currentQuestion]?.optionC}
                  </div>
                  <div
                    onClick={() => {
                      handleAnswer(
                        questionBank[currentQuestion],
                        questionBank[currentQuestion]?.optionA
                      );
                    }}
                    className="p-4 border hover:border-green-500 rounded text-primary-100"
                  >
                    D). {questionBank[currentQuestion]?.optionD}
                  </div>
                </div>
              </div>

              <div className="py-14 justify-center flex gap-10">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                  className={`${
                    currentQuestion === 0 ? "bg-gray-300" : "bg-primary-100"
                  } py-2 px-4 flex items-center gap-2 rounded bg-primary-100 text-white`}
                  title="previous"
                >
                  <img src={prev} className="h-4 w-4" alt="" />
                  <p>Prev</p>
                </button>
                <button
                  className={`py-2 px-4 rounded bg-info-600 text-white`}
                  title="next"
                >
                  59:02
                </button>
                <button
                  disabled={currentQuestion === questionBank.length - 1}
                  onClick={handleNextQuestion}
                  className={`${
                    currentQuestion === questionBank.length - 1
                      ? "bg-gray-300"
                      : "bg-primary-100"
                  }  py-2 px-4 flex items-center gap-2 rounded  text-white`}
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
                {questionBank.map((question, id) => {
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        pickQuestion(id);
                      }}
                      className={`${
                        isQuestionTouched(question)
                          ? "bg-green-500 text-white"
                          : "text-primary-100"
                      } bg-[#A098AE26] hover:bg-green-500 hover:text-white  w-8 text-center flex justify-center  px-2 border rounded`}
                    >
                      {id + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Exam;
