import { SET_ALL_ADS, SET_ALL_IMGS } from "../actions/types/ads";

const initialAds = {
  allAds: [],
  allImgs: [],
};

function adsReducer(state = initialAds, action: any) {
  switch (action.type) {
    case SET_ALL_ADS: {
      const { allAds } = action.payload;

      return {
        ...state,
        allAds: allAds,
      };
    }

    case SET_ALL_IMGS: {
      const { allImgs } = action.payload;

      return {
        ...state,
        allImgs: allImgs,
      };
    }

    default:
      return state;
  }
}

export default adsReducer;
