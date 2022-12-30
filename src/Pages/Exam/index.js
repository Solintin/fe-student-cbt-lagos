import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import prev from "../../assets/Svg/prev.svg";
import next from "../../assets/Svg/next.svg";
import Questions from "../../assets/QuestionBank.json";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  setCurrentQuestion,
  setQuestionsAnsweredCorrectly,
  setTouchedQuestion,
} from "../../Redux/Actions/ActionCreators";
import { useTimer } from "../../Hooks/useTimer";
function Exam() {
  //   const [questions, setQuestion] = useState(Questions);
  //   const [randomQuestions, setRandomQuestions] = useState([]);
  //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [minutes, seconds] = useTimer(180000);
  //   console.log(minutes);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { questionBank, currentQuestion, touchedQuestion, correctAnswers } =
    useSelector((state) => state.examination);
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

    const isExist = correctAnswers.find((item) => item.id === question.id);
    if (answer === question.answer && !isExist) {
      dispatch(setQuestionsAnsweredCorrectly([...correctAnswers, question]));
    }
  };

  useEffect(() => {
    if (questionBank.length === 0) {
      generateRandomQuestion(Questions);
    }
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

        {questionBank.length > 0 && (
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
                        questionBank[currentQuestion]?.optionB
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
                        questionBank[currentQuestion]?.optionC
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
                        questionBank[currentQuestion]?.optionD
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
                  {minutes > 9 ? minutes : "0" + minutes} :{" "}
                  {seconds > 9 ? seconds : "0" + seconds}
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
