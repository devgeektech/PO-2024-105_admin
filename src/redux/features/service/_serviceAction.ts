import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notify } from "../../../utils/shared";
const API_URL = process.env.REACT_APP_API_URL;
const GET_ALL_SERVICES = `${API_URL}/adminWeb/services`;
const ADD_SERVICES_DETAILS = `${API_URL}/adminWeb/service`;
const UPDATE_SERVICE_DETAILS = `${API_URL}/adminWeb/service/`;

export const getServices = createAsyncThunk(
  "getServices",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { page, limit, search = '' } = values
      const { data } = await axios.get(`${GET_ALL_SERVICES}?page=${page}&limit=${limit}&search=${search}`, {});      
      return data;
    } catch (error: any) {
      const { responseMessage } = error?.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const updateServiceDetails = createAsyncThunk(
  "updateServiceDetails",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.put(`${UPDATE_SERVICE_DETAILS}${values.id}`, values);
      notify(data.responseMessage, 'success');
      dispatch(getServices({page: values.selectedPage || 1, limit:10}));
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const addServiceDetails = createAsyncThunk(
  "addServiceDetails",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(`${ADD_SERVICES_DETAILS}`, values);      
      notify(data.responseMessage, 'success');
      dispatch(getServices({ page: values.selectedPage || 1, limit: 10 }))
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const deleteService = createAsyncThunk(
  "deleteService",
  async (values: any, { rejectWithValue, dispatch }) => { 
    try {
      const { data } = await axios.delete(`${UPDATE_SERVICE_DETAILS}${values.id}`);
      notify(data.responseMessage, 'success'); 
      dispatch(getServices({page: values.selectedPage || 1, limit:10}));
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);
