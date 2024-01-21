import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { currentUser } from "../user/userSlice";
import {
  createContactThunk,
  deleteContactThunk,
  editContactThunk,
} from "./contactThunk";

const initialState = {
  isLoading: false,
  name: "",
  mobilePhone: "",
  email: "",
  location: "",
  createdAt: "",
  relation: "Friend",
  relationOption: ["Friend", "Relative", "Co-Worker", "Other"],
  officePhone: "",
  isEditing: false,
  editContactId: "",
};

export const createContact = createAsyncThunk(
  "contact/createContact",
  createContactThunk
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  deleteContactThunk
);

export const editContact = createAsyncThunk(
  "contact/editContact",
  editContactThunk
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: (state) => {
      return initialState;
    },
    setEditContact: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Contact Created");
      })
      .addCase(createContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editContact.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Contact Modified...");
      })
      .addCase(editContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearValues, setEditContact } =
  contactSlice.actions;

export default contactSlice.reducer;
