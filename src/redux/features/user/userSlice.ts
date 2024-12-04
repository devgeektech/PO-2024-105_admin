import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./_userAction";

const initialState: any = {
  data: [],
  isLoading: true,
  isSuccess: false,
  responseCode: null,
  responseMessage: '',
  totalRecord: 0,
};

export const userList = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload.data||[];
        state.responseMessage = payload.responseMessage
        state.responseCode = payload.responseCode
        state.totalRecord = payload.totalRecord || 0
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
  },
});
