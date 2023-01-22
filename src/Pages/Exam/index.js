import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import prev from "../../assets/Svg/prev.svg";
import next from "../../assets/Svg/next.svg";
import submitIcon from "../../assets/Svg/submit.svg";
import axios from "../../Utils/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchQuestions,
  setCurrentQuestion,
  setExamTime,
  setQuestionsAnsweredCorrectly,
  setTickedQuestions,
  setTouchedQuestion,
} from "../../Redux/Actions/ActionCreators";
import { useTimer } from "../../Hooks/useTimer";
import SubmitModal from "../../components/submitModal";
import toast from "react-hot-toast";
function Exam() {
  const dispatch = useDispatch();
  const {
    questionBank,
    currentQuestion,
    touchedQuestion,
    correctAnswers,
    tickedQuestions,
    examTime,
    assessment,
  } = useSelector((state) => state.examination);
  const [minutes, seconds, totalTime] = useTimer(examTime);

  //   if (totalTime < 1) {
  //     alert("Quiz has ended");
  //   }

  const naviagte = useNavigate();

  const [submit, setSubmit] = useState(false);

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
    return touchedQuestion.find((item) => item._id === question._id);
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

  const handleTickedQuestion = (question, answer) => {
    const isExist = tickedQuestions.find((item) => item.qid === question._id);
    if (!isExist) {
      //if question is not available, store it...
      dispatch(
        setTickedQuestions([
          ...tickedQuestions,
          { qid: question._id, tickedAnswer: answer },
        ])
      );
    } else {
      //if not, update it
      //remove the former and update with the latter
      const updatedTickedQuestions = tickedQuestions.filter(
        (item) => item.qid !== question._id
      );
      dispatch(
        setTickedQuestions([
          ...updatedTickedQuestions,
          { qid: question._id, tickedAnswer: answer },
        ])
      );
    }
  };
  const isPickedAnswer = (question, answer) => {
    let isAnswer = false;
    tickedQuestions.forEach((q) => {
      if (q.qid === question._id && q.tickedAnswer === answer) {
        isAnswer = true;
      }
    });
    return isAnswer;
  };
  const handleAnswer = (question, answer) => {
    dispatch(setExamTime(totalTime * 1000));
    handleTouchedQuestion(question);
    handleNextQuestion();
    const isExist = correctAnswers.find((item) => item._id === question._id);
    if (isExist) {
      const updatedQuestionsAnsweredCorrectly = correctAnswers.filter(
        (item) => item._id !== question._id
      );
      dispatch(
        setQuestionsAnsweredCorrectly(updatedQuestionsAnsweredCorrectly)
      );
    }
    if (answer === question.correctAns && !isExist) {
      dispatch(setQuestionsAnsweredCorrectly([...correctAnswers, question]));
    }

    handleTickedQuestion(question, answer);
  };

  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    axios
      .post(
        `/assessment/complete`,
        {
          assessmentId: assessment._id,          totalAttempted: touchedQuestion.length,
          totalCorrectAnswer: correctAnswers.length,
          totalWrongAnswer: questionBank.length - correctAnswers.length,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Assessment successfully submitted");
        dispatch({ type: "LOGOUT" });
        naviagte("/")
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data.error.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    generateRandomQuestion(questionBank);
    if (questionBank.length === 0) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-[#F5F6FF] min-h-screen">
      <Header />
      <div className="md:px-14 px-4 pt-28 ">
        <div className="flex justify-between mb-4 md:pr-4 md:w-8/12">
          <div className="bg-[#A098AE26] text-primary-100 font-medium py-4 px-6 text-sm rounded">
            <h1 title="exam-title"> {assessment.title} </h1>
          </div>
          <button
            className={`${
              totalTime < 300 ? "bg-info-600" : "bg-info-100"
            } py-2 px-4 rounded  text-white`}
          >
            {minutes > 9 ? minutes : "0" + minutes} :
            {seconds > 9 ? seconds : "0" + seconds}
          </button>
        </div>

        {questionBank.length > 0 && (
          <div className="grid md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-8 col-span-12" title="Question">
              <div>
                <h1 className="text-primary-100 mb-2">
                  Question {currentQuestion + 1}
                </h1>

                <div className="mt-2 p-4 rounded bg-white text-primary-100 ">
                  <p>{questionBank[currentQuestion]?.question}</p>
                  {questionBank[currentQuestion]?.image && (
                    <img
                      src={questionBank[currentQuestion]?.image.url}
                      alt="question_image"
                      className="my-4 h-36 w-full object-contain"
                    />
                  )}
                </div>
                <div className="mt-4 bg-white p-4 rounded flex flex-col gap-4">
                  <div
                    onClick={() => {
                      handleAnswer(
                        questionBank[currentQuestion],
                        questionBank[currentQuestion]?.options.a
                      );
                    }}
                    className={`${
                      isPickedAnswer(
                        questionBank[currentQuestion],
                        questionBank[currentQuestion]?.options.a
                      ) && "choosedAnswer"
                    } p-4 border-2 hover:border-green-500 rounded text-primary-100`}
                  >
                    A). {questionBank[currentQuestion]?.options.a}
                  </div>
                  <div
                    onClick={() => {
                      handleAnswer(
                        questionBank[currentQuestion],
                        questionBank[currentQuestion]?.options.b
                      );
                    }}
                    className={`${
                      isPickedAnswer(
                        questionBank[currentQuestion],
                        questionBank[currentQuestion]?.options.b
                      ) && "choosedAnswer"
                    } p-4 border-2 hover:border-green-500 rounded text-primary-100`}
                  >
                    B). {questionBank[currentQuestion]?.options.b}
                  </div>
                  <div
                    onClick={() => {
                      handleAnswer(
                        questionBank[currentQuestion],
                        questionBank[currentQuestion]?.options.c
                      );
                    }}
                    className={`${
                      isPickedAnswer(
                        questionBank[currentQuestion],
                        questionBank[currentQuestion]?.options.c
                      ) && "choosedAnswer"
                    } p-4 border-2 hover:border-green-500 rounded text-primary-100`}
                  >
                    C). {questionBank[currentQuestion]?.options.c}
                  </div>
                  <div
                    onClick={() => {
                      handleAnswer(
                        questionBank[currentQuestion],
                        questionBank[currentQuestion]?.options.d
                      );
                    }}
                    className={`${
                      isPickedAnswer(
                        questionBank[currentQuestion],
                        questionBank[currentQuestion]?.options.d
                      ) && "choosedAnswer"
                    } p-4 border-2 hover:border-green-500 rounded text-primary-100`}
                  >
                    D). {questionBank[currentQuestion]?.options.d}
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
            <div className="md:col-span-4 col-span-12 w-full">
              <h3 className="hidden md:block font-medium text-primary-100 mb-2">
                Quick navigation
              </h3>
              <div className="bg-white p-4  rounded hidden md:flex  flex-wrap gap-4">
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
                      }  hover:bg-green-500 hover:text-white  w-8 text-center flex justify-center  px-2 border rounded`}
                    >
                      {id + 1}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setSubmit(!submit)}
                className={` py-2 px-4 rounded flex md:ml-auto mx-auto items-center gap-4 bg-green-500  text-white md:my-6 mb-6`}
                title="submit"
              >
                <img src={submitIcon} className="h-4 w-4" alt="" />
                <h3>Submit</h3>
              </button>
            </div>
          </div>
        )}
      </div>

      {submit && (
        <SubmitModal
          handleModal={() => {
            setSubmit(!submit);
          }}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </div>
  );
}

export default Exam;
