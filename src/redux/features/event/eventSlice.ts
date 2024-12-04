import { createSlice } from "@reduxjs/toolkit";
import { getEvents } from "./_eventAction";

const initialState: any = {
  data: [],
  isLoading: true,
  isSuccess: false,
  responseCode: null,
  responseMessage: '',
  totalRecord: 0,
};

export const eventList = createSlice({
  name: "eventList",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getEvents.fulfilled, (state, { payload }) => {
        console.log("object",payload)
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload.data||[];
        state.responseMessage = payload.responseMessage
        state.responseCode = payload.responseCode
        state.totalRecord = payload.totalRecord || 0
      })
      .addCase(getEvents.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
  },
});
