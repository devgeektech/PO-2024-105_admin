import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notify } from "../../../utils/shared";
const API_URL = process.env.REACT_APP_API_URL;
const GET_ALL_COMPANIES = `${API_URL}/adminWeb/companies`;
const ADD_COMPANY_DETAILS = `${API_URL}/adminWeb/company`;
const UPDATE_COMPANY_DETAILS = `${API_URL}/adminWeb/company/`;

export const getCompanies = createAsyncThunk(
  "getCompanies",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { page, limit, search = '' } = values
      const { data } = await axios.get(`${GET_ALL_COMPANIES}?page=${page}&limit=${limit}&search=${search}`, {});      
      return data;
    } catch (error: any) {
      const { responseMessage } = error?.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const updateCompany = createAsyncThunk(
  "updateCompany",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.put(`${UPDATE_COMPANY_DETAILS}${values.id}`, values);
      notify(data.responseMessage, 'success');
      dispatch(getCompanies({page: values.selectedPage || 1, limit:10}));
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const addCompany = createAsyncThunk(
  "addCompany",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(`${ADD_COMPANY_DETAILS}`, values);      
      notify(data.responseMessage, 'success');
      dispatch(getCompanies({ page: values.selectedPage || 1, limit: 10 }))
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "deleteCompany",
  async (values: any, { rejectWithValue, dispatch }) => { 
    try {
      const { data } = await axios.delete(`${UPDATE_COMPANY_DETAILS}${values.id}`);
      notify(data.responseMessage, 'success'); 
      dispatch(getCompanies({page: values.selectedPage || 1, limit:10}));
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);
