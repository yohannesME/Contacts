import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import contactSlice from './features/contact/contactSlice';
import allContactsSlice from './features/allJobs/allContactsSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    contact: contactSlice,
    allContacts : allContactsSlice,
  },
});
