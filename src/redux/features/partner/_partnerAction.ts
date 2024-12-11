import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setFiles, setPartnerProfileImages } from "../shared/sharedSlice";
import { notify } from "../../../utils/shared";
const API_URL = process.env.REACT_APP_API_URL;
const API_URL_AUTH = process.env.REACT_APP_AUTH_API_URL;
const GET_ALL_PARTNER = `${API_URL}/adminWeb/partners`;
const VERIFY_PARTNER = `${API_URL_AUTH}/verifyPartnerByAdmin`;
const COMMON_FILE_UPLOAD = `${API_URL_AUTH}/fileUpload`;
const UPDATE_PARTNER_DETAILS = `${API_URL_AUTH}/updatePartnerAccount`;
const UPPDATE_PARTNER_STATUS = `${API_URL}/adminWeb/partner/updateStatus/`;


export const getPartners = createAsyncThunk(
  "getPartners",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { page, limit, search = '' } = values
      const { data } = await axios.get(`${GET_ALL_PARTNER}?page=${page}&limit=${limit}&search=${search}`, {});
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
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

export const updatePartnerDetails = createAsyncThunk(
  "updatePartnerDetails",
  async (values: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(`${UPDATE_PARTNER_DETAILS}`, values);
      notify(data.responseMessage, 'success');
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);

export const updatePartnerStatus = createAsyncThunk(
  "updatePartnerStatus",
  async (values: any, { rejectWithValue, dispatch }) => { 
    try {
      const { data } = await axios.put(`${UPPDATE_PARTNER_STATUS}${values.id}`, values);
      notify(data.responseMessage, 'success'); 
      dispatch(getPartners({page: values.selectedPage || 1, limit:10}));
      return data;
    } catch (error: any) {
      const { responseMessage } = error.response?.data;
      notify(responseMessage, 'error');
      return rejectWithValue(error.message);
    }
  }
);


