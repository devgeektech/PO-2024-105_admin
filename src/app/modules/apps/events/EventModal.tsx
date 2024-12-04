import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setEventModalStatus,
  setFiles,
  setFormDetails,
} from "../../../../redux/features/shared/sharedSlice";
import { Field, FormikProvider, useFormik } from "formik";
import { Form } from "react-bootstrap";
import FieldInputText from "../common/InputFeilds/InputTextField";
import * as Yup from "yup";
import {
  EVENTS_DURATION,
  EVENTS_TYPE,
  PARTICIPANTS_TYPES,
  REQUIRED,
  TIMES_DURATION,
} from "../../../../utils/const";
import {
  addEventDetails,
  updateEventDetails,
} from "../../../../redux/features/event/_eventAction";
import moment from "moment";
import VisibilityBox from "../common/visibility-box/VisibilityBox";
import { useCallback, useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { getAllMembers, getAllTrainers, getAssignedUser, getSlots } from "../../../../services/user.service";
import { toast } from "react-toastify";
import { LANG } from "../../../constants/language";
import Required from "../common/Required";
import Select from "react-select";

function EventModal() {
  const dispatch: any = useDispatch();
  const sharedActions: any = useSelector((state: any) => state.sharedActions);
  const roomData: any = useSelector((state: any) => state.roomList?.data) || [];
  const [members, setMembers] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [allowedTimes, setAllowedTimes] = useState<any>([]);
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const eventFormValidation = Yup.object().shape({
    date: Yup.date()
      .required(REQUIRED)
      .min(currentDate, LANG.DATE_CAN_NOT_BE_PAST),
    time: Yup.string().required(REQUIRED),
    room: Yup.string().required(REQUIRED),
    description: Yup.string(),
    eventType: Yup.string().required(REQUIRED),
    timeDuration: Yup.string().required(REQUIRED),
    eventDuration: Yup.string().required(REQUIRED),
    participantType: Yup.string().required(REQUIRED),
    maxParticipant: Yup.number().required(REQUIRED),
    createdBy: Yup.string().required(REQUIRED),
    participants: Yup.array(),
    teamA: Yup.array(),
    teamB: Yup.array(),
    price: Yup.number().required(REQUIRED),
  });

  const formIntialValues = {
    date: sharedActions.formDetails.date
      ? moment(sharedActions.formDetails.date).format("YYYY-MM-DD")
      : "",
    time: sharedActions.formDetails.time || "",
    room: sharedActions.formDetails.room?._id || "",
    description: sharedActions.formDetails.description || "",
    eventType: sharedActions?.formDetails?.eventType || "",
    eventDuration: sharedActions?.formDetails?.eventDuration || "",
    createdBy: sharedActions?.formDetails?.createdBy?._id || "",
    timeDuration: sharedActions?.formDetails?.timeDuration || "",
    participantType: sharedActions?.formDetails?.participantType || "",
    maxParticipant: sharedActions?.formDetails?.maxParticipant || "",
    location: sharedActions?.formDetails?.location || "",
    teamA: sharedActions?.formDetails?.teamA?.length
      ? sharedActions?.formDetails?.teamA?.map((p: any) => p?.user)
      : [],
    teamB: sharedActions?.formDetails?.teamB?.length
      ? sharedActions?.formDetails?.teamB?.map((p: any) => p?.user)
      : [],
    participants: sharedActions?.formDetails?.participants?.length
      ? sharedActions?.formDetails?.participants?.map((p: any) => p?.user)
      : [],
    price: sharedActions?.formDetails?.price || "",
  };

  const eventFormik = useFormik({
    initialValues: formIntialValues,
    validationSchema: eventFormValidation,
    onSubmit: (values: any, { resetForm }) => {
      if (isInvalidForm()) {
        toast.error(LANG.MEMBERS_IS_REQUIRED);
        return;
      }
      values.selectedPage = sharedActions.selectedPage;
      let teamA = [],
        teamB = [],
        participants = [];
      if (values.participantType == "individual") {
        participants = values?.participants?.map((p: any) => {
          return { user: p?._id };
        });
      } else {
        teamA = values?.teamA?.map((p: any) => {
          return { user: p?._id };
        });
        teamB = values?.teamB?.map((p: any) => {
          return { user: p?._id };
        });
      }
      let users: any = [];
      if (teamA && teamA.length > 0) {
        teamA.forEach((item: any) => {
          users.push(item.user);
        });
      }

      if (teamB && teamB.length > 0) {
        teamB.forEach((item: any) => {
          users.push(item.user);
        });
      }
      if (participants && participants.length > 0) {
        participants.forEach((item: any) => {
          users.push(item.user);
        });
      }

      if (sharedActions?.formDetails?._id) {
        dispatch(
          updateEventDetails({
            ...values,
            id: sharedActions.formDetails?._id,
            teamA,
            teamB,
            participants,
          })
        );
      } else {
        dispatch(
          addEventDetails({ ...values, participants, teamA, teamB, users })
        );
      }
      dispatch(setFormDetails({}));
      setTimeout(() => {
        dispatch(setEventModalStatus(false));
        resetForm();
      }, 500);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    // dispatch(getRooms({ page: 1, limit: 1000 }));
    getTrainerData();
    if (sharedActions?.formDetails?._id && eventFormik?.values?.time)
      setAllowedTimes([
        { value: eventFormik?.values?.time, label: eventFormik?.values?.time },
      ]);
  }, []);

  useEffect(() => { }, [allowedTimes]);

  const closeModal = () => {
    dispatch(setEventModalStatus(false));
    dispatch(setFormDetails({}));
    dispatch(setFiles([]));
  };

  const handleSelectMember = (selectedList: any, selectedItem: any) => {
    if (selectedList?.length > eventFormik.values?.maxParticipant) {
      toast.error(LANG.LIMIT_IS_EXCEEDED_FORM_MAX_LIMIT);
    } else {
      eventFormik.setFieldValue("participants", selectedList);
    }
  };

  const handleSelectTeamA = (selectedList: any, selectedItem: any) => {
    const check = eventFormik.values.teamA.some((tb: any) =>
      selectedList.includes(tb)
    );
    if (check) {
      toast.error(LANG.ALREADY_SELECTED_IN_TEAM_A);
    } else {
      if (selectedList?.length > eventFormik.values?.maxParticipant) {
        toast.error(LANG.LIMIT_IS_EXCEEDED_FORM_MAX_LIMIT);
      } else {
        eventFormik.setFieldValue("teamA", selectedList);
      }
    }
  };

  const handleSelectTeamB = (selectedList: any, selectedItem: any) => {
    const check = eventFormik.values.teamA.some((tb: any) =>
      selectedList.includes(tb)
    );
    if (check) {
      toast.error(LANG.ALREADY_SELECTED_IN_TEAM_A);
    } else {
      if (selectedList?.length > eventFormik.values?.maxParticipant) {
        toast.error(LANG.LIMIT_IS_EXCEEDED_FORM_MAX_LIMIT);
      } else {
        eventFormik.setFieldValue("teamB", selectedList);
      }
    }
  };

  const getAssignedMembers = async (id: any) => {
    try {
      const result: any = await getAssignedUser(id);
      if (result?.data?.length) {
        setMembers(result?.data);
      }
    } catch (error) {

    }
  }

  const getTrainerData = async () => {
    const result = await getAllTrainers({ limit: 100, page: 1 });
    if (result?.data?.length) {
      setTrainers(result?.data);
    }
  };

  const getSlotsApi = useCallback(
    async () => {
      if (
        eventFormik.values.date != "" &&
        (eventFormik.values.timeDuration != "" ||
          eventFormik.values.room != "")
      ) {
        let value = eventFormik.values.timeDuration;

        const result: any = TIMES_DURATION.find((item) => item.value === value);
        const min = result ? result.min : null;
        const payload: any = {
          date: eventFormik.values.date,
          duration: min,
          roomId: eventFormik.values.room,
        };

        console.log(payload, ">>> payload >>>")
        // const [eventDetail] = await Promise.all([getSlots(payload)])
        let eventDetail = await getSlots(payload);
        const array: any = [];
        if (eventDetail?.data && eventDetail?.data.length > 0) {
          eventDetail?.data.forEach((item: any) => {
            array.push({ value: item.start, label: item.start });
          });
          setAllowedTimes(array);
        }
      }
    },
    [eventFormik.values]
  );

  const isInvalidForm = () => {
    console.log(
      eventFormik.values.teamA,
      "eventFormik.values.teamA >>>",
      eventFormik.values.teamB,
      "eventFormik.values.teamB >>>",
      eventFormik.values.participants,
      "eventFormik.values.participants >>>"
    );
    if (eventFormik.values.participantType === "individual") {
      return eventFormik.values.participants?.length < 1;
    } else if (eventFormik.values.participantType === "team") {
      return (
        eventFormik.values.teamA?.length < 1 &&
        eventFormik.values.teamB?.length < 1
      );
    } else {
      return true;
    }
  };

  useEffect(() => {
    getSlotsApi()
  }, [eventFormik.values.date, eventFormik.values.room, eventFormik.values.timeDuration]);

  console.log("event formik value", eventFormik.values);

  return (
    <>
      <Modal
        backdrop="static"
        size="lg"
        show={sharedActions.eventDetailsModal}
        onHide={closeModal}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {!sharedActions.formDetails._id ? "Add" : "Update"} Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormikProvider value={eventFormik}>
            <Form onSubmit={eventFormik.handleSubmit} method="POST">
              <div className="row">
                <div className="col-sm-12 col-md-4 mb-6">
                  <Form.Group>
                    <Form.Label>
                      Event Type <span>*</span>
                    </Form.Label>
                    <Select
                      className="custom-select-box"
                      value={EVENTS_TYPE.find(
                        (g) => g.value === eventFormik.values?.eventType
                      )}
                      name="eventType"
                      placeholder="Event Type"
                      onChange={(v) => {
                        eventFormik.setFieldValue("eventType", v?.value);
                      }}
                      options={EVENTS_TYPE}
                      isDisabled={sharedActions?.formDetails?._id}
                    />
                    {eventFormik.errors.eventType &&
                      eventFormik.touched.eventType && (
                        <div className="formik-errors text-danger">{`${eventFormik.errors.eventType}`}</div>
                      )}
                  </Form.Group>
                </div>
                <div className="col-sm-12 col-md-4 mb-6">
                  <Form.Group>
                    <Form.Label>
                      Event Duration <span>*</span>
                    </Form.Label>
                    <Select
                      className="custom-select-box"
                      value={EVENTS_DURATION.find(
                        (g) => g.value === eventFormik.values?.eventDuration
                      )}
                      name="eventDuration"
                      placeholder="Event Duration"
                      onChange={(v) => {
                        eventFormik.setFieldValue("eventDuration", v?.value);
                      }}
                      options={EVENTS_DURATION}
                      isDisabled={sharedActions?.formDetails?._id}
                    />
                    {eventFormik.errors.eventDuration &&
                      eventFormik.touched.eventDuration && (
                        <div className="formik-errors text-danger">{`${eventFormik.errors.eventDuration}`}</div>
                      )}
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Form.Label>
                      Room <span>*</span>
                    </Form.Label>
                    <Select
                      className="custom-select-box"
                      value={roomData?.find(
                        (g) => g._id === eventFormik.values?.room
                      )}
                      name="room"
                      placeholder="Select Room"
                      getOptionLabel={(o: any) => o?.roomName}
                      getOptionValue={(o: any) => o?._id}
                      onChange={(v) => {
                        eventFormik.setFieldValue("room", v?._id);
                        // getSlotsApi();
                      }}
                      options={roomData}
                      isDisabled={sharedActions?.formDetails?._id}
                    />
                  </Form.Group>
                  {eventFormik.errors.room && eventFormik.touched.room && (
                    <div className="formik-errors text-danger">{`${eventFormik.errors.room}`}</div>
                  )}
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="date"
                      validate={eventFormValidation}
                      type="date"
                      isRequired={true}
                      label="Date"
                      component={FieldInputText}
                      min={new Date().toISOString().split("T")[0]}
                      disabled={sharedActions?.formDetails?._id}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12 col-md-4 mb-6">
                  <Form.Group>
                    <Form.Label>
                      Time Duration <span>*</span>
                    </Form.Label>
                    <Select
                      className="custom-select-box"
                      value={TIMES_DURATION.find(
                        (g) => g.value === eventFormik.values?.timeDuration
                      )}
                      name="timeDuration"
                      placeholder="Time Duration"
                      onChange={(v) => {
                        eventFormik.setFieldValue("timeDuration", v?.value);
                        // getSlotsApi(v?.value);
                      }}
                      options={TIMES_DURATION}
                      isDisabled={sharedActions?.formDetails?._id}
                    />
                    {eventFormik.errors.timeDuration &&
                      eventFormik.touched.timeDuration && (
                        <div className="formik-errors text-danger">{`${eventFormik.errors.timeDuration}`}</div>
                      )}
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Label>
                    Start Time <span>*</span>
                  </Form.Label>
                  <Select
                    options={allowedTimes}
                    value={allowedTimes.find(
                      (option: any) =>
                        option?.value === eventFormik?.values?.time
                    )}
                    name="time"
                    onChange={(v: any) => {
                      eventFormik.setFieldValue("time", v?.value || "");
                    }}
                    placeholder="Select Time"
                    classNamePrefix="custom-select"
                    className={`${eventFormik?.touched?.time && eventFormik?.errors?.time
                        ? "border border-danger"
                        : ""
                      }`}
                    isDisabled={sharedActions?.formDetails?._id}
                  />
                  {eventFormik.errors.time && eventFormik.touched.time && (
                    <div className="formik-errors text-danger">{`${eventFormik.errors.time}`}</div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12  col-md-12 mb-6">
                  <Form.Group>
                    <Field
                      as={"textarea"}
                      name="description"
                      validate={eventFormValidation}
                      label="Description"
                      component={FieldInputText}
                      disabled={sharedActions?.formDetails?._id}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className='row'>
                <div className="col-sm-12  col-md-8 mb-6">
                  <Form.Group>
                    <Form.Label>
                      Trainer <span>*</span>
                    </Form.Label>
                    <Select
                      className="custom-select-box"
                      value={trainers.find(
                        (g) => g?._id === eventFormik.values?.createdBy
                      )}
                      name="createdBy"
                      placeholder={LANG.TRAINER}
                      onChange={(v) => {
                        eventFormik.setFieldValue("createdBy", v?._id);
                        getAssignedMembers(v?._id)
                      }}
                      getOptionLabel={(o: any) => `${o?.firstName} ${o?.lastName}`}
                      getOptionValue={(o: any) => o?._id}
                      options={trainers}
                      isDisabled={sharedActions?.formDetails?._id}
                    />
                    {eventFormik.errors.participantType &&
                      eventFormik.touched.participantType && (
                        <div className="formik-errors text-danger">{`${eventFormik.errors.participantType}`}</div>
                      )}
                  </Form.Group>
                </div>
              </div>
              <VisibilityBox show={eventFormik?.values?.createdBy}>
                <div className="row">
                  <div className="col-sm-12 col-md-4 mb-6">
                    <Form.Group>
                      <Form.Label>
                        Teams/Individual Participants <span>*</span>
                      </Form.Label>
                      <Select
                        className='custom-select-box'
                        value={PARTICIPANTS_TYPES.find((g) => g.value === eventFormik.values?.participantType)}
                        name="participantType"
                        placeholder='Teams/Individual'
                        onChange={(v) => {
                          eventFormik.setFieldValue("participantType", v?.value);
                        }}
                        options={PARTICIPANTS_TYPES}
                        isDisabled={sharedActions?.formDetails?._id}
                      />
                      {eventFormik.errors.participantType && eventFormik.touched.participantType && (
                        <div className="formik-errors text-danger">{`${eventFormik.errors.participantType}`}</div>
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-sm-12  col-md-4 mb-6">
                    <Form.Group>
                      <Field
                        name="maxParticipant"
                        validate={eventFormValidation}
                        type="number"
                        min={0}
                        isRequired={true}
                        label="Maximum Participants"
                        component={FieldInputText}
                        disabled={sharedActions?.formDetails?._id}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-sm-12  col-md-4 mb-6">
                    <Form.Group>
                      <Field
                        name="price"
                        validate={eventFormValidation}
                        type="number"
                        min={0}
                        isRequired={true}
                        label="Price"
                        component={FieldInputText}

                      />
                    </Form.Group>
                  </div>

                </div>

                <VisibilityBox show={eventFormik.values?.participantType}>
                  <div>
                    <div className="my-2">
                      <h4>
                        Members
                        <Required />
                      </h4>
                    </div>
                    {eventFormik.values?.participantType === "team" ? (
                      <>
                        <div className="row">
                          <div className="col-sm-12 col-md-6 mb-6">
                            <Form.Group>
                              <Form.Label>Team A</Form.Label>
                              <Multiselect
                                selectedValues={eventFormik.values?.teamA}
                                placeholder="Select Team A"
                                displayValue="firstName"
                                isObject={true}
                                onKeyPressFn={function noRefCheck() { }}
                                onRemove={handleSelectTeamA}
                                onSearch={function noRefCheck() { }}
                                onSelect={handleSelectTeamA}
                                options={members}
                                disable={sharedActions?.formDetails?._id}
                                showCheckbox
                              />
                            </Form.Group>
                          </div>
                          <div className="col-sm-12 col-md-6 mb-6">
                            <Form.Group>
                              <Form.Label>Team B</Form.Label>
                              <Multiselect
                                selectedValues={eventFormik.values?.teamB}
                                placeholder="Select Team A"
                                displayValue="firstName"
                                isObject={true}
                                onKeyPressFn={function noRefCheck() { }}
                                onRemove={handleSelectTeamB}
                                onSearch={function noRefCheck() { }}
                                onSelect={handleSelectTeamB}
                                options={members}
                                disable={sharedActions?.formDetails?._id}
                                showCheckbox
                              />
                            </Form.Group>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row">
                          <div className="col-sm-12 col-md-5 mb-6">
                            <Form.Group>
                              <Multiselect
                                selectedValues={
                                  eventFormik.values?.participants &&
                                  eventFormik.values?.participants
                                }
                                placeholder="Select Participant"
                                displayValue="firstName"
                                isObject={true}
                                onKeyPressFn={function noRefCheck() { }}
                                onRemove={handleSelectMember}
                                onSearch={function noRefCheck() { }}
                                onSelect={handleSelectMember}
                                options={members}
                                showCheckbox
                                disable={sharedActions?.formDetails?._id}
                              />
                            </Form.Group>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </VisibilityBox>
              </VisibilityBox>
              <Modal.Footer>
                <Button
                  type="button"
                  variant="secondary"
                  className="primaryBtn"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button type="submit" className="primaryBtn active">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </FormikProvider>
        </Modal.Body>
      </Modal>
    </>
  );
}

export { EventModal };
