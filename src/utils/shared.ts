import "./style.scss";
import { Slide, toast } from "react-toastify";
import Swal from "sweetalert2";
import { getParnters } from "../redux/features/partner/_partnerAction";
import { getUsers } from "../redux/features/user/_userAction";
import { getEvents } from "../redux/features/event/_eventAction";
import { getServices } from "../redux/features/service/_serviceAction";
import { getSubServices } from "../redux/features/subServices/_subServicesAction";
import { getWellnessTypes } from "../redux/features/wellnessTypes/_wellnessTypesAction";

export const commonSwtichCases = (id: any, searchValue: any, dispatch: any) => {
    searchValue = encodeURIComponent(searchValue)
    switch (id) {
        case 'PARTNER':
            dispatch(getParnters({ search: searchValue.trim() }))
            break;
        case 'User':
            dispatch(getUsers({ search: searchValue.trim(), page: 1, limit: 10 }))
            break;
        case 'Event':
            dispatch(getEvents({ search: searchValue.trim(), page: 1, limit: 10 }))
            break;
        case "subServices":
            dispatch(getSubServices({ search: searchValue.trim(), page: 1, limit: 10 }))
            break;
        case 'Service':
            dispatch(getServices({ search: searchValue.trim(), page: 1, limit: 10 })); 
            break;
        case "WellnessTypes":
            dispatch(getWellnessTypes({ search: searchValue.trim(), page: 1, limit: 10 })); 
            break;
        default:
    }
}

export const conFirmMessage = (values) => {
    return Swal.fire(values)
}

export const commonUserStatusSwtichCases = (id: any, values: any, dispatch: any) => {
    switch (id) {
        case 'Speciality':
            // dispatch(getSpeciality({ search: searchValue.trim() }))
            break;
        case 'Category':
            // dispatch(getCategory({ search: searchValue.trim() }))
            break;
        case 'USER':
            dispatch(getUsers({ page: 1, limit: 10 }))
            break;
        default:
    }
}

export const docUrl = (images: any) => {
    const urlArray: any = [];
    for (let i = 0; i < images.length; i++) {
        urlArray.push(images[i].url);
    }
    return urlArray
}

export const toastifyOptions: any = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
};

export const notify = (message: any, type: any) => {
    if (type === 'error') {
        return toast.error(message, toastifyOptions);
    } else if (type === 'info') {
        return toast.info(message, toastifyOptions);
    } else if (type === 'warning') {
        return toast.warning(message, toastifyOptions);
    } else if (type === 'success') {
        return toast.success(message, toastifyOptions);
    }
};


