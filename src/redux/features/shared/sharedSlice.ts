import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  id: '',
  showModal: false,
  categoryModal: false,
  userDetailsModal: false,
  userShowDetailsModal: false,
  partnerShowDetailsModal: false,
  partnerDetailsModal: false,
  eventDetailsModal: false,
  serviceDetailsModal: false,
  roomDetailsModal: false,
  bookingDetailsModal: false,
  taskDetailsModal: false,
  eventModal: false,
  assignMemberModal: false,
  forumDetailsModal: false,
  wellnessTypesModal: false,
  subServicesModal: false,
  companyModal: false,
  formDetails: {},
  eventDetail: {},
  partnerDetails: {},
  memberAssignedTrainerDetails:{},
  files: [],
  selectedPage: 1,
  partnerStatusModal: false,  
};

export const sharedSlice = createSlice({
  name: "sharedSlice",
  initialState: initialState,
  reducers: {
    setId: (state, { payload }) => {
      state.id = payload
    },
    setModalStatus: (state, { payload }) => {
      state.showModal = payload
    },
    setFormDetails: (state, { payload }) => {
      state.formDetails = payload
    },
    setEventDetail: (state, { payload }) => {
      state.eventDetail = payload
    },
    setCategoryModalStatus: (state, { payload }) => {
      state.categoryModal = payload
    },
    setUserModalStatus: (state, { payload }) => {
      state.userDetailsModal = payload
    },
    setUserShowModalStatus: (state, { payload }) => {
      state.userShowDetailsModal = payload
    },
    setPartnerShowModalStatus: (state, { payload }) => {
      state.partnerShowDetailsModal = payload
    },
    setPartnerModalStatus: (state, { payload }) => {
      state.partnerDetailsModal = payload
    },
    setEventModalStatus: (state, { payload }) => {
      state.eventDetailsModal = payload;
    },
    setServiceModalStatus:  (state, { payload }) => {
      state.serviceDetailsModal = payload;
    },
    setBookingModalStatus: (state, { payload }) => {
      state.bookingDetailsModal = payload;
    },
    setRoomModalStatus: (state, { payload }) => {
      state.roomDetailsModal = payload;
    },
    setTaskModalStatus: (state, { payload }) => {
      state.taskDetailsModal = payload;
    },
    setEventDetailModalStatus: (state, { payload }) => {
      state.eventModal = payload;
    },
    setForumModalStatus: (state, { payload }) => {
      state.forumDetailsModal = payload;
    },
    setFiles: (state, { payload }) => {
      state.files = payload.data
    },
    setPartnerProfileImages: (state, { payload }) => {
      state.formDetails.profilePicture = payload.data[0]?.url
    },
    setSelectedPage: (state, { payload }) => {
      state.selectedPage = payload
    },
    setAssignMembersModalStaus: (state, { payload }) => {
      state.assignMemberModal = payload
    },
    setMemberAssignedTrainerDetails:(state, { payload }) => {
      state.memberAssignedTrainerDetails = payload
    },
    setWellnessTypesModalStatus: (state, { payload }) => {
      state.wellnessTypesModal = payload;
    },
    setSubservicesModalStatus: (state, { payload }) => {
      state.subServicesModal = payload;
    },
    setCompanyModalStatus: (state, { payload }) => {
      state.companyModal = payload; 
    },
    setPartnerDetails: (state, { payload }) => {
      state.partnerDetails = payload
    },
    setPartnerStatusModalStaus: (state, { payload }) => {
      state.partnerStatusModal = payload
    },
  },
});

export const {
  setId,
  setModalStatus,
  setFormDetails,
  setEventDetail,
  setCategoryModalStatus,
  setUserModalStatus,
  setEventModalStatus,
  setServiceModalStatus,
  setRoomModalStatus,
  setBookingModalStatus,
  setEventDetailModalStatus,
  setFiles,
  setPartnerProfileImages,
  setUserShowModalStatus,
  setPartnerShowModalStatus,
  setPartnerModalStatus,
  setTaskModalStatus,
  setForumModalStatus,
  setSelectedPage,
  setAssignMembersModalStaus,
  setMemberAssignedTrainerDetails,
  setWellnessTypesModalStatus,
  setSubservicesModalStatus,
  setCompanyModalStatus,
  setPartnerDetails,
  setPartnerStatusModalStaus,
} = sharedSlice.actions;