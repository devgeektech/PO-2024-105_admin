import { createSlice } from "@reduxjs/toolkit";
import { getSubServices } from "./_subServicesAction";

const initialState: any = {
  data: [],
  isLoading: true,
  isSuccess: false,
  responseCode: null,
  responseMessage: '',
  totalRecord: 0,
};

export const subServicesList = createSlice({
  name: "subServices",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSubServices.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getSubServices.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload.data||[];
        state.responseMessage = payload.responseMessage
        state.responseCode = payload.responseCode
        state.totalRecord = payload.totalRecord || 0
      })
      .addCase(getSubServices.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
  },
});
