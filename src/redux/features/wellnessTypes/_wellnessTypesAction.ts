import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notify } from "../../../utils/shared";
import { TIMES_DURATION } from "../../../utils/const";
const API_URL = process.env.REACT_APP_API_URL;
const GET_WELLNESS_TYPES = `${API_URL}/adminWeb/wellnessTypes`
const DELETE_WELLNESS_TYPES = `${API_URL}/adminWeb/wellnessType/`
const ADD_WELLNESS_TYPES = `${API_URL}/adminWeb/wellnessType`
const UPDATE_WELLNESS_TYPES = `${API_URL}/adminWeb/wellnessType/`
export const getWellnessTypes = createAsyncThunk(
  "getWellnessTypes",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { page, limit, search = '' } = values
      const { data } = await axios.get(`${GET_WELLNESS_TYPES}?page=${page}&limit=${limit}&search=${search}`, {});
      return data;
    } catch (error: any) {
      const { responseMessage } = error?.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const updateWellnessType = createAsyncThunk(
  "updateWellnessType",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.put(`${UPDATE_WELLNESS_TYPES}${values.id}`, values);
      notify(data.responseMessage, 'success');
      dispatch(getWellnessTypes({page: values.selectedPage || 1, limit:10}));
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const addWellnessType = createAsyncThunk(
  "addWellnessType",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(`${ADD_WELLNESS_TYPES}`, values);
      notify(data.responseMessage, 'success');
      dispatch(getWellnessTypes({ page: values.selectedPage || 1, limit: 10 }))
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);


export const deleteWellnessType = createAsyncThunk(
  "deleteWellnessType",
  async (values: any, { rejectWithValue, dispatch }) => { 
    try {
      const { data } = await axios.delete(`${DELETE_WELLNESS_TYPES}${values.id}`);
      notify(data.responseMessage, 'success'); 
      dispatch(getWellnessTypes({page: values.selectedPage || 1, limit:10}));
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);



