import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const GET_ALL_EXPORT_USER = `${API_URL}/users/getAllUsersForExport`;
const GET_ALL_MEMBERS = `${API_URL}/users/getAllMembers`;
const GET_ALL_TRAINERS = `${API_URL}/users/getAllTrainers`;
const GET_ASSIGNED_USER_DETAILS = `${API_URL}/users/`;
const GET_SLOTS = `${API_URL}/users/slots/`
export const getAllUserToExport = async () => {
    try {
        const { data } = await axios.get(GET_ALL_EXPORT_USER);
        return data;
    } catch (error: any) {
        return error;
    }
}


export const getAllMembers = async (params:any) => {
    try {
        const { data } = await axios.get(GET_ALL_MEMBERS,{params});
        return data;
    } catch (error: any) {
        return error;
    }
}

export const getAllTrainers = async (params:any) => {
    try {
        const { data } = await axios.get(GET_ALL_TRAINERS,{params});
        return data;
    } catch (error: any) {
        return error;
    }
}

export const getAssignedUser = async (id:any) => {
    try {     
        const { data } = await axios.get(`${GET_ASSIGNED_USER_DETAILS}trainer/${id}/assignedMembers`);
        return data;
    } catch (error: any) {
        return error;
    }
}

export const getSlots = async (payload:any) => {
    try {     
        const { data } = await axios.get(`${GET_SLOTS}${payload.date}`,{params:payload});
        return data;
    } catch (error: any) {
        return error;
    }
}
