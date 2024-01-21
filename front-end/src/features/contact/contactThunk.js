import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import {
  getAllContacts,
  hideLoading,
  showLoading,
} from "../allJobs/allContactsSlice";
import { clearValues } from "./contactSlice";

export const createContactThunk = async (contact, thunkAPI) => {
  try {
    const resp = await customFetch.post("/contacts", contact);
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteContactThunk = async (contactId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/contacts/${contactId}`);
    thunkAPI.dispatch(getAllContacts());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editContactThunk = async ({ contactId, contact }, thunkAPI) => {
  try {
    console.log(contactId, contact);
    const resp = await customFetch.patch(`/contacts/${contactId}`, contact);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
