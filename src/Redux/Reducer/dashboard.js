const initailState = {
  dashboardFeeds: [],
};
const dashboard = (state = initailState, action) => {
  switch (action.type) {
    case "FETCH_DASHBOARD_FEED":
      return {
        ...state,
        dashboardFeeds: action.payload,
      };

    default:
      return state;
  }
};

export default dashboard;
