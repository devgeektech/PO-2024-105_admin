import { createSlice } from "@reduxjs/toolkit";
import { getCompanies } from "./_companyAction";

const initialState: any = {
  data: [],
  isLoading: true,
  isSuccess: false,
  responseCode: null,
  responseMessage: '',
  totalRecord: 0,
};

export const companiesList = createSlice({
  name: "companyList",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCompanies.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getCompanies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload.data||[];
        state.responseMessage = payload.responseMessage;
        state.responseCode = payload.responseCode;
        state.totalRecord = payload.totalRecord || 0;        
      })
      .addCase(getCompanies.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
  },
});
