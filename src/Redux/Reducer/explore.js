const initailState = {
  exploreContent: [],
  exploreContentAnimals: [],
  exploreContentPeople: [],
  exploreContentNature: [],
  exploreContentLifestyle: [],
  exploreContentCulture: [],
  exploreProfessionals: [],
  explorePopUp: false,
  inviteLink: "",
};
const explore = (state = initailState, action) => {
  switch (action.type) {
    case "FETCH_EXPLORE":
      return {
        ...state,
        exploreContent: action.payload,
      };

    case "FETCH_EXPLORE_ANIMALS":
      return {
        ...state,
        exploreContentAnimals: action.payload,
      };

    case "FETCH_EXPLORE_LIFESTYLE":
      return {
        ...state,
        exploreContentLifestyle: action.payload,
      };
      

    case "FETCH_EXPLORE_NATURE":
      return {
        ...state,
        exploreContentNature: action.payload,
      };

    case "FETCH_EXPLORE_PEOPLE":
      return {
        ...state,
        exploreContentPeople: action.payload,
      };

    case "FETCH_EXPLORE_CULTURE":
      return {
        ...state,
        exploreContentCulture: action.payload,
      };
    case "FETCH_PROFESSIONALS":
      return {
        ...state,
        exploreProfessionals: action.payload,
      };
    case "SWITCH":
      return {
        ...state,
        explorePopUp: action.payload,
      };
    case "GET_INVITE_LINK":
      return {
        ...state,
        inviteLink: action.payload,
      };

    default:
      return state;
  }
};

export default explore;
