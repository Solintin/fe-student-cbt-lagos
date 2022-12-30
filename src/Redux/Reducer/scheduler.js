const initailState = {
  cameraID: "",
  time: 0,
  sled_start : 0,
  sled_stop : 0,
  schedulers: null,
};
const scheduler = (state = initailState, action) => {
  switch (action.type) {
    case "SET_CAMERA_ID":
      return {
        ...state,
        cameraID: action.payload,
      };
    case "SET_TIME":
      return {
        ...state,
        time: action.payload,
      };
    case "SET_SLED_START":
      return {
        ...state,
        sled_start: action.payload,
      };
    case "SET_SLED_STOP":
      return {
        ...state,
        sled_stop: action.payload,
      };
    
    case "GET_SCHEDULERS_SUCCESS":
      return {
        ...state,
        schedulers: action.payload,
      };

    default:
      return state;
  }
};

export default scheduler;
