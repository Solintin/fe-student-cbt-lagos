// Action Creators
import * as type from "./Types";
import axios from "../../Utils/useAxios";
import toast from "react-hot-toast";

const GetUsersSuccess = (data) => {
  return {
    type: type.FETCH_USER_SUCCESS,
    payload: data,
  };
};

const loginSuccess = (data) => {
  return {
    type: type.LOGIN_SUCCESS,
    payload: data,
  };
};
const logout = () => {
  return {
    type: type.LOGOUT,
  };
};

const fetchUser = (token, navigate) => {
  return (dispatch) => {
    try {
      axios
        .get("/user/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(GetUsersSuccess(res.data));
          if (res.data.role.toLowerCase() === "student") {
            navigate("/dashboard");
          } else {
            toast.error("Please Login as a student");
            navigate("/");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
};

const LoginAction = (loginParams, navigate, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      await axios.post("/auth/student/login", loginParams).then((res) => {
        dispatch(loginSuccess(res.data));
        dispatch(fetchUser(res.data, navigate));
        setLoading(false);
        toast.success("Login Successful");
      });
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };
};

const fetchQuestions = (data) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_QUESTIONS", payload: data });
  };
};
const setCurrentQuestion = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_CURRENT_QUESTION", payload: data });
  };
};
const setTouchedQuestion = (data) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_TOUCHED_QUESTIONS", payload: data });
  };
};
const setQuestionsAnsweredCorrectly = (data) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_CORRECT_ANSWERS", payload: data });
  };
};
const setTickedQuestions = (data) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_TICKED_QUESTIONS", payload: data });
  };
};
const setExamTime = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_TIME", payload: data });
  };
};

export {
  LoginAction,
  loginSuccess,
  fetchQuestions,
  setCurrentQuestion,
  setTouchedQuestion,
  setQuestionsAnsweredCorrectly,
  setTickedQuestions,
  setExamTime,
  logout,
};
