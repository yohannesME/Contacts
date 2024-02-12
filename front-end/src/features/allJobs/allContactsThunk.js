import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllContactsThunk = async (_, thunkAPI) => {
  const { page, search, searchRelation, sort } =
    thunkAPI.getState().allContacts;
  let url = `/contacts?relation=${searchRelation}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/stats");

    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
