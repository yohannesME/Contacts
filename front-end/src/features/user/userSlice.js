import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk,
  verifyEmailThunk,
  getCurrentUserThunk,
  forgetPasswordThunk,
  ResetPasswordThunk,
  logoutThunk,
} from "./userThunk";

export const currentUser = createAsyncThunk("user/showMe", async () => {
  return getCurrentUserThunk("/users/showMe");
});

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  emailExist: false,
  passwordReseted: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);

export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async (payload, thunkAPI) => {
    return verifyEmailThunk("/auth/verify-email", payload);
  }
);

export const ForgetPassword = createAsyncThunk(
  "user/forgot-password",
  async (payload, thunkAPI) => {
    return forgetPasswordThunk("/auth/forgot-password", payload);
  }
);

export const ResetPassword = createAsyncThunk(
  "user/reset-password",
  async (payload, thunkAPI) => {
    return ResetPasswordThunk("/auth/reset-password", payload);
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/users/updateUser", user, thunkAPI);
  }
);

export const logout = createAsyncThunk('user/logout', async(user, thunkAPI) => {
  return logoutThunk("auth/logout")
})

export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      logout()
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currentUser.fulfilled, (state, action) => {
        // console.log(action);
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { msg } = payload;
        state.isLoading = false;

        // state.user = currentUser();
        // addUserToLocalStorage(user);
        toast.success(`${msg}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        // console.log(user);
        addUserToLocalStorage(user);

        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`User Updated!`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error("There was an error..");
      })
      .addCase(ForgetPassword.fulfilled, (state, { payload }) => {
        const { msg } = payload;
        toast.success(msg);
      })
      .addCase(ForgetPassword.rejected, (state, { payload }) => {
        toast.error("No Account Found.");
      })
      .addCase(ResetPassword.rejected, (state, { payload }) => {
        const { msg } = payload;
        toast.error(msg);
      })
      .addCase(ResetPassword.fulfilled, (state, { payload }) => {
        const { msg } = payload;
        toast.success(msg);
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
