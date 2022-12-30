// Action Creators
import * as type from "./Types";
import axios from "../../Utils/axios";
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

const fetchUser = (id, token) => {
  return (dispatch) => {
    try {
      axios
        .get(`/user_profile/${id}/`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          dispatch(GetUsersSuccess(res.data));
        });
    } catch (error) {
      console.log(error);
    }
  };
};



const LoginAction = (loginParams, navigate, location, setLoading) => {
  console.log(location);
  const redirectPath = location.state?.path || "/feed";

  return async (dispatch) => {
    setLoading(true);
    try {
      await axios.post("/auth/login/user/", loginParams).then((res) => {
        console.log(res.data);

        dispatch(loginSuccess(res.data));
        dispatch(fetchUser(res.data.user_id, res.data.token));
        setLoading(false);
        toast.success("Login Successful");
        navigate(redirectPath, { replace: true });
      });
    } catch (error) {
      setLoading(false);
      // console.log(error.response);
      const err = error.response.data.detail;
      toast.error(err);
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




export {
  LoginAction,
  loginSuccess,
  fetchQuestions,
  setCurrentQuestion,
  setTouchedQuestion,
  setQuestionsAnsweredCorrectly

}

