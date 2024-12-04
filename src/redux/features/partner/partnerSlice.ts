import { createSlice } from "@reduxjs/toolkit";
import { getParnters } from "./_partnerAction";

const initialState: any = {
  data: [],
  isLoading: true,
  isSuccess: false,
  responseCode: null,
  responseMessage: '',
  totalRecord: 0,
};

export const partnerList = createSlice({
  name: "partnerList",
  initialState: initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getParnters.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })

      .addCase(getParnters.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload.data;
        state.responseMessage = payload.responseMessage
        state.responseCode = payload.responseCode
        state.totalRecord = payload.totalRecord
      })
      .addCase(getParnters.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
  },
});
