export const REQUIRED = 'Field is required.';

export const LANGUAGE = [
  "Hindi",
  "English",
  "Marathi",
];

export const ROLES = [
  "sponsor",
  "trainer"
];


export const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export const COMPANY_STATUS = [
  { value: "active", label: "active" },
  { value: "rejected", label: "rejected" }
];

export const EVENTS_STATUS = [
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "canceled", label: "Canceled" },
];

export const EVENTS_TYPE = [
    { value: "match", label: "Match" },
    { value: "training", label: "Training" },
    { value: "practice", label: "Practice" },
];

export const EVENTS_DURATION = [
  { value: "one_day", label: "One Day" },
  { value: "one_week", label: "One Week" },
  { value: "two_week", label: "Two Week" },
  { value: "three_week", label: "Three Week" },
  { value: "one_month", label: "One Month" },
];


export const TIMES_DURATION = [
  { value: "1", label: "1 Hr", min:"60" },
  { value: "2", label: "2 Hrs", min:"120" },
  { value: "3", label: "3 Hrs", min:"180"},
  { value: "4", label: "4 Hrs", min:"240" },
  { value: "5", label: "5 Hrs", min:"300" },
  { value: "6", label: "6 Hrs", min:"360" },
  { value: "7", label: "7 Hrs", min:"420" },
  { value: "8", label: "8 Hrs", min:"480" },
];

export const ROOM_TYPES = [
  { value: "field", label: "Field" },
  { value: "room", label: "Room" }
];

export const PARTICIPANTS_TYPES = [
  { value: "individual", label: "Individual participants" },
  { value: "team", label: "Teams" }
];