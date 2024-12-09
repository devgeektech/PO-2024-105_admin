import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notify } from "../../../utils/shared";
const API_URL = process.env.REACT_APP_API_URL;
const GET_SUB_SERVICES = `${API_URL}/adminWeb/subservices`
const DELETE_SUB_SERVICE = `${API_URL}/adminWeb/subservice/`
const ADD_SUB_SERVICE = `${API_URL}/adminWeb/subservice`
const UPDATE_SUB_SERVICE = `${API_URL}/adminWeb/subservice/`
export const getSubServices = createAsyncThunk(
  "getSubServices",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { page, limit, search = '' } = values
      const { data } = await axios.get(`${GET_SUB_SERVICES}?page=${page}&limit=${limit}&search=${search}`, {});
      return data;
    } catch (error: any) {
      const { responseMessage } = error?.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubService = createAsyncThunk(
  "updateSubService",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.put(`${UPDATE_SUB_SERVICE}${values.id}`, values);
      notify(data.responseMessage, 'success');
      dispatch(getSubServices({page: values.selectedPage || 1, limit:10}));
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const addSubService = createAsyncThunk(
  "addSubService",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(`${ADD_SUB_SERVICE}`, values);
      notify(data.responseMessage, 'success');
      dispatch(getSubServices({ page: values.selectedPage || 1, limit: 10 }))
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);


export const deleteSubService = createAsyncThunk(
  "deleteSubService",
  async (values: any, { rejectWithValue, dispatch }) => { 
    try {
      const { data } = await axios.delete(`${DELETE_SUB_SERVICE}${values.id}`);
      notify(data.responseMessage, 'success'); 
      dispatch(getSubServices({page: values.selectedPage || 1, limit:10}));
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);



