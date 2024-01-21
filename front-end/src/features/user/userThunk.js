import { toast } from "react-toastify";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearAllContactsState } from "../allJobs/allContactsSlice";
import { clearValues } from "../contact/contactSlice";
import { logoutUser } from "./userSlice";
export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getCurrentUserThunk = async (url) => {
  try {
    const resp = await customFetch.get(url , {withCredentials: true});
    console.log(resp.data.user);
    return resp.data.user;
  } catch (error) {
    return toast.error(error.response.data.msg);
  }
};

export const verifyEmailThunk = async (url, payload, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, payload);
    return resp.data;
  } catch (error) {
    return thunkAPI.registerUserThunk(error.response.data.msg);
  }
};
export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user, { withCredentials: true });
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllContactsState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
