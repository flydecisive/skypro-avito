import { SET_ALL_ADS } from "../types/ads";

export const setAllAds = (allAds: any) => ({
  type: SET_ALL_ADS,
  payload: { allAds },
});
