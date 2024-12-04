import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setFiles, setPartnerProfileImages } from "../shared/sharedSlice";
import { notify } from "../../../utils/shared";
const API_URL = process.env.REACT_APP_API_URL;
const GET_ALL_USER = `${API_URL}/users/getAllUsers`;
const ADD_USER_DETAILS = `${API_URL}/users`;
const UPDATE_USER_DETAILS = `${API_URL}/users/`;
const APPROVE_USER = `${API_URL}/users/approve/`;
const VERIFY_PARTNER = `${API_URL}/verifyPartnerByAdmin`;
const COMMON_FILE_UPLOAD = `${API_URL}/fileUpload`;

export const getUsers = createAsyncThunk(
  "getUsers",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { page, limit, search = '' } = values
      const { data } = await axios.get(`${GET_ALL_USER}?page=${page}&limit=${limit}&search=${search}`, {});
      return data;
    } catch (error: any) {
      const { responseMessage } = error?.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const verifyPartner = createAsyncThunk(
  "verifyPartner",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { id, verifiedStatus } = values
      const { data } = await axios.patch(`${VERIFY_PARTNER}/${id}`, { verifiedStatus: verifiedStatus });
      // notify(data.responseMessage, 'success');
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const commonFileUpload = createAsyncThunk(
  "commonFileUpload",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `${COMMON_FILE_UPLOAD}`,
        data: values,
        headers: { "Content-Type": "multipart/form-data" },
      })
      dispatch(setFiles(data))
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const partnerProfileImage = createAsyncThunk(
  "commonFileUpload",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `${COMMON_FILE_UPLOAD}`,
        data: values,
        headers: { "Content-Type": "multipart/form-data" },
      })
      dispatch(setPartnerProfileImages(data))
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "updateUserDetails",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      let selectedPage = values.get("selectedPage")
      const { data } = await axios.put(`${UPDATE_USER_DETAILS}${values.get("id")}`, values);
      notify(data.responseMessage, 'success');
      dispatch(getUsers({page: selectedPage || 1, limit:10}));
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const approveUser = createAsyncThunk(
  "approveUser",
  async (values: any, { rejectWithValue, dispatch }) => { 
    try {
      const { data } = await axios.put(`${APPROVE_USER}${values.id}`, values);
      notify(data.responseMessage, 'success'); 
      dispatch(getUsers({page: values.selectedPage || 1, limit:10}));
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const addUserDetails = createAsyncThunk(
  "addUserDetails",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      let selectedPage = values.get("selectedPage")
      const { data } = await axios.post(`${ADD_USER_DETAILS}`, values);
      notify(data.responseMessage, 'success');
      dispatch(getUsers({ page: selectedPage || 1, limit: 10 }))
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);


export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (values: any, { rejectWithValue, dispatch }) => { 
    try {
      const { data } = await axios.delete(`${UPDATE_USER_DETAILS}${values.id}`);
      notify(data.responseMessage, 'success'); 
      dispatch(getUsers({page: values.selectedPage || 1, limit:10}));
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const assignMemberToTrainer=createAsyncThunk(
  "assignMembersToTrainer",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      // let selectedPage = values.get("selectedPage")

     console.error('pvalue isss@@@!!!dfsdfsfd',values)
      const { data } = await axios.put(`${UPDATE_USER_DETAILS}trainer/${values.trainer}/assignedMembers`, values.participants);
      notify(data.responseMessage, 'success');
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
)
