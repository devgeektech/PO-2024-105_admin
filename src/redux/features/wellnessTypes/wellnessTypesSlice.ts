import { createSlice } from "@reduxjs/toolkit";
import { getWellnessTypes } from "./_wellnessTypesAction";

const initialState: any = {
  data: [],
  isLoading: true,
  isSuccess: false,
  responseCode: null,
  responseMessage: '',
  totalRecord: 0,
};

export const wellnessTypesList = createSlice({
  name: "wellnessTypes",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getWellnessTypes.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getWellnessTypes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload.data||[];
        state.responseMessage = payload.responseMessage
        state.responseCode = payload.responseCode
        state.totalRecord = payload.totalRecord || 0
      })
      .addCase(getWellnessTypes.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
  },
});
