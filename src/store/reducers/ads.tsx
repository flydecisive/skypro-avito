import { SET_ALL_ADS } from "../actions/types/ads";

const initialAds = {
  allAds: [],
};

function adsReducer(state = initialAds, action: any) {
  switch (action.type) {
    case SET_ALL_ADS: {
      const { allAds } = action.payload;

      return {
        ...state,
        allAds,
      };
    }

    default:
      return state;
  }
}

export default adsReducer;
