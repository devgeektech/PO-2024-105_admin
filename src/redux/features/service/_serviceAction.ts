import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notify } from "../../../utils/shared";
import { TIMES_DURATION } from "../../../utils/const";
const API_URL = process.env.REACT_APP_API_URL;
const GET_ALL_SERVICES = `${API_URL}/adminWeb/services`;
const ADD_EVENTS_DETAILS = `${API_URL}/events`;
const UPDATE_EVENTS_DETAILS = `${API_URL}/events/`;
const APPROVE_EVENT = `${API_URL}/events/approve/`;
const CREATE_SLOTS = `${API_URL}/users/slots`;

export const getServices = createAsyncThunk(
  "getServices",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { page, limit, search = '' } = values
      const { data } = await axios.get(`${GET_ALL_SERVICES}?page=${page}&limit=${limit}&search=${search}`, {});
      console.log('data >>>>>.. ',data);
      
      return data;
    } catch (error: any) {
      const { responseMessage } = error?.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const updateEventDetails = createAsyncThunk(
  "updateServiceDetails",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.put(`${UPDATE_EVENTS_DETAILS}${values.id}`, values);
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
      // console.log(values,">>> valuse >>>>")
      const { data } = await axios.post(`${ADD_EVENTS_DETAILS}`, values);
      const dur = TIMES_DURATION.find(item => item.value === values.timeDuration);
      const min = dur ? dur.min : null;
      if(data.responseCode === 200 && data.data._id){
        let payload = {
          startSlot: values.time,
          date: values.date,
          duration: min,
          serviceId: data?.data?._id,
          users: values.users,
          roomId: values.room
        }
        await axios.post(`${CREATE_SLOTS}`,payload);
      }
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
      const { data } = await axios.delete(`${UPDATE_EVENTS_DETAILS}${values.id}`);
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


export const approveService = createAsyncThunk(
  "approveService",
  async (values: any, { rejectWithValue, dispatch }) => { 
    try {
      const { data } = await axios.put(`${APPROVE_EVENT}${values.id}`, values);
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



