import { SET_ALL_ADS, SET_ALL_IMGS } from "../types/ads";

export const setAllAds = (allAds: any) => ({
  type: SET_ALL_ADS,
  payload: { allAds },
});

export const setAllImgs = (allImgs: any) => ({
  type: SET_ALL_IMGS,
  payload: { allImgs },
});
