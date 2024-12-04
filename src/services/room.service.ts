import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const GET_ALL_BOOKINGS_BY_ROOM = `${API_URL}/bookings/room/`;

export const getAllBookingOfRoom = async (id:string) => {
    try {
        const { data } = await axios.get(GET_ALL_BOOKINGS_BY_ROOM+id);
        return data;
    } catch (error: any) {
        return error;
    }
}