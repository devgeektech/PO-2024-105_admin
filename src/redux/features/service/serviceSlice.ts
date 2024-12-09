import { createSlice } from "@reduxjs/toolkit";
import { getServices } from "./_serviceAction";

const initialState: any = {
  data: [],
  isLoading: true,
  isSuccess: false,
  responseCode: null,
  responseMessage: '',
  totalRecord: 0,
};

export const serviceList = createSlice({
  name: "serviceList",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getServices.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getServices.fulfilled, (state, { payload }) => {
        console.log("object",payload)
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload.data||[];
        state.responseMessage = payload.responseMessage;
        state.responseCode = payload.responseCode;
        state.totalRecord = payload.totalRecord || 0;

        console.log('state.data >>>>> ',state.data);
        
      })
      .addCase(getServices.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
  },
});
