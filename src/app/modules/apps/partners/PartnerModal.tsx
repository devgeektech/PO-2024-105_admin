import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setFiles,
  setFormDetails,
  setPartnerModalStatus,
} from "../../../../redux/features/shared/sharedSlice";
import { Field, FormikProvider, useFormik } from "formik";
import { Form } from "react-bootstrap";
import FieldInputText from "../common/InputFeilds/InputTextField";
import * as Yup from "yup";
import { GENDERS, REQUIRED } from "../../../../utils/const";
import Select, { components } from "react-select";
import logo from "../../../../_metronic/assets/logo/admin-logo.png";
import {
  // addParnerDetails,
  updatePartnerDetails,
} from "../../../../redux/features/partner/_partnerAction";
import { useEffect, useState } from "react";
import moment from "moment";
import { LANG } from "../../../constants/language";
import VisibilityBox from "../common/visibility-box/VisibilityBox";
import { getAge, getFormData } from "../../../../utils";
import DownloadIcon from "../../../icons/DownloadIcon";
import { ARGENTINA_NATIONALITY, FILE_EXT, ISTUPNICA_OR_BRISOVNICA_NATIONALITY } from "../../../constants";
import UploadIcon from "../../../icons/UploadIcon";

const CustomMultiValueRemove = (props) => {
  if (props.data.value === "member") {
    return null;
  }
  return <components.MultiValueRemove {...props} />;
};

function PartnerModal() {
  const [imageUrl, setImageUrl] = useState<any>();
  const dispatch: any = useDispatch();
  let sharedActions: any = useSelector((state: any) => state.sharedActions);

  useEffect(() => {
    if (sharedActions?.formDetails?._id && sharedActions?.formDetails?.avatar) setImageUrl(process.env.REACT_APP_FILE_URL + sharedActions?.formDetails?.avatar)
  }, [])
  const specialityFormValidation = Yup.object().shape({
    firstName: Yup.string().required(REQUIRED),
    lastName: Yup.string().required(REQUIRED),
    gender: Yup.string().required(REQUIRED),
    email: Yup.string().required(REQUIRED),
    password: Yup.string().required(REQUIRED),
    dob: Yup.date().required(REQUIRED),
    phone: Yup.string().required(REQUIRED),
    avatar: Yup.mixed(),
    role: Yup.array().required(REQUIRED),
    street: Yup.string().required(REQUIRED),
    houseNumber: Yup.string().required(REQUIRED),
    zipCode: Yup.number().test('len', "Minumum 5 digit", (val: any) => val.toString().length === 5).required(REQUIRED),
    city: Yup.string().required(REQUIRED),
    birthPlaceCity: Yup.string().required(REQUIRED),
    birthPlaceCountry: Yup.string().required(REQUIRED),
    nationality: Yup.string().required(REQUIRED),
    parentFirstName: Yup.string(),
    parentLastName: Yup.string(),
    parentEmail: Yup.string(),
    parentPhone: Yup.string(),
    bankName: Yup.string().required(REQUIRED),
    iban: Yup.string().required(REQUIRED),
    bic: Yup.string().required(REQUIRED),
    accountHolder: Yup.string().required(REQUIRED),
    //attachments
    matchPermissionDoc: Yup.mixed(),
    clubTransferDoc: Yup.mixed(),
    doctorCerificateDoc: Yup.mixed(),
    birthCertificateDoc: Yup.mixed(),
    residenceCertificateDoc: Yup.mixed(),
    playersParentDeclarationDoc: Yup.mixed(),
    copyOfPassportDoc: Yup.mixed(),
    attachmentArgentinaDoc: Yup.mixed(),
    attachmentIstupnicaDoc: Yup.mixed(),
    attachmentBrisovnicaDoc: Yup.mixed()
  });

  const formIntialValues = {
    firstName: sharedActions.formDetails.firstName || "",
    lastName: sharedActions.formDetails.lastName || "",
    gender: sharedActions.formDetails.gender || "",
    email: sharedActions.formDetails.email || "",
    password: sharedActions.formDetails.password || "",
    dob: sharedActions.formDetails.dob
      ? moment(sharedActions.formDetails.dob).format("YYYY-MM-DD")
      : "",
    phone: sharedActions.formDetails.phone || "",
    avatar: sharedActions?.formDetails?.avatar || "",
    role: sharedActions?.formDetails?.role || [],
    street: sharedActions.formDetails.street || "",
    houseNumber: sharedActions?.formDetails?.houseNumber || "",
    zipCode: sharedActions?.formDetails?.zipCode || "",
    city: sharedActions.formDetails.city || "",
    birthPlaceCity: sharedActions.formDetails.birthPlaceCity || "",
    birthPlaceCountry: sharedActions.formDetails.birthPlaceCountry || "",
    nationality: sharedActions.formDetails.nationality || "",
    parentFirstName: sharedActions.formDetails.parentFirstName || "",
    parentLastName: sharedActions.formDetails.parentLastName || "",
    parentEmail: sharedActions.formDetails.parentEmail || "",
    parentPhone: sharedActions.formDetails.parentPhone || "",
    bankName: sharedActions.formDetails.bankName || "",
    iban: sharedActions.formDetails.iban || "",
    bic: sharedActions.formDetails.bic || "",
    accountHolder: sharedActions.formDetails.accountHolder || ""
  };

  const partnerFormik = useFormik({
    initialValues: formIntialValues,
    validationSchema: specialityFormValidation,
    enableReinitialize: true,
    onSubmit: (values: any, { resetForm }) => {
      const payload = {
        ...values,
        role: JSON.stringify(values.role),
        selectedPage: sharedActions.selectedPage
      }
      const formData = getFormData(payload);

      if (sharedActions?.formDetails?._id) {
        formData.append("id", sharedActions.formDetails._id);
        dispatch(updatePartnerDetails(formData));
      } else {
        // dispatch(addParnerDetails(formData));
      }
      dispatch(setFormDetails({}));
      setTimeout(() => {
        dispatch(setPartnerModalStatus(false));
        resetForm();
      }, 500);
    },
  });

  const closeModal = () => {
    dispatch(setPartnerModalStatus(false));
    dispatch(setFormDetails({}));
    dispatch(setFiles([]));
  };

  const handleChangeProfileImage = async (e: any) => {
    const selectedFile = e.target.files[0];
    const url = URL.createObjectURL(selectedFile);
    partnerFormik.setFieldValue("avatar", selectedFile);
    setImageUrl(url);
  };

  const onChange = (props: any) => {
    let array: any = [];
    props.forEach((item: any) => {
      array.push(item.value);
      partnerFormik.setFieldValue("role", array);
    });
  };

  const download = (filename: any) => {
    const a = document.createElement("a");
    a.href = process.env.REACT_APP_FILE_URL + filename;
    a.download = filename;
    a.target = 'blank'
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <>
      <Modal
        backdrop="static"
        size="lg"
        show={sharedActions.partnerDetailsModal}
        onHide={closeModal}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {!sharedActions.formDetails._id ? LANG.ADD : LANG.UPDATE} {LANG.PARTNER}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormikProvider value={partnerFormik}>
            <Form onSubmit={partnerFormik.handleSubmit} method="POST">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-sm-12  col-md-6 mb-6 image-upload position-relative">
                  <img
                    className="w-25"
                    src={
                      imageUrl
                        ? imageUrl
                        : logo
                    }
                    alt="profile"
                  />
                  <label
                    title={LANG.CHANGE}
                    htmlFor="file-input"
                    className="position-absolute bottom-0"
                  >
                    <i className="bi bi-pencil-square ms-2"></i>
                  </label>
                  <input
                    onChange={handleChangeProfileImage}
                    id="file-input"
                    type="file"
                  />
                </div>
                <div className="col-sm-12 col-md-6 mb-6 d-flex justify-content-end align-items-center "></div>
              </div>
              <div className="row">
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="firstName"
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.FIRST_NAME}
                      isRequired={true}
                      component={FieldInputText}
                      placeholder={LANG.FIRST_NAME}
                      maxLength={25}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="lastName"
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.LAST_NAME}
                      isRequired={true}
                      component={FieldInputText}
                      placeholder={LANG.LAST_NAME}
                      maxLength={25}
                    />
                  </Form.Group>
                </div>

                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="email"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="text"
                      label="Email"
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="phone"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.PHONE}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12 col-md-4 mb-6">
                  <Form.Group>
                    <Form.Label>
                      {LANG.GENDER} <span>*</span>
                    </Form.Label>
                    <Select
                      className="custom-select-box"
                      value={GENDERS.find(
                        (g) => g.value === partnerFormik.values?.gender
                      )}
                      name="gender"
                      placeholder={LANG.SELECT + " " + LANG.GENDER}
                      onChange={(v) => {
                        partnerFormik.setFieldValue("gender", v?.value);
                      }}
                      options={GENDERS}
                    />
                  </Form.Group>
                  {partnerFormik.errors.gender && partnerFormik.touched.gender && (
                    <div className="formik-errors text-danger">{`${partnerFormik.errors.gender}`}</div>
                  )}
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="password"
                      validate={specialityFormValidation}
                      type="password"
                      label={LANG.PASSWORD}
                      isRequired={true}
                      readOnly={sharedActions.formDetails?._id}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="dob"
                      validate={specialityFormValidation}
                      type="date"
                      isRequired={true}
                      label={LANG.BIRTHDAY}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                {/* <div className="col-sm-12 col-md-4 mb-6 multi-select-role">
                  <Form.Group>
                    <Form.Label>
                      {LANG.ROLE} <span>*</span>
                    </Form.Label>
                    {
                      <Select
                        closeMenuOnSelect={false}
                        value={partnerFormik?.values?.role?.map(
                          (el) => ({
                            label: el,
                            value: el,
                            isDisabled: el === "member",
                          })
                        )}
                        isMulti
                        isClearable={false}
                        backspaceRemovesValue={false}
                        isSearchable={false}
                        options={ROLES?.map((el) => ({
                          label: el,
                          value: el,
                          isDisabled: el === "member",
                        }))}
                        components={{
                          MultiValueRemove: CustomMultiValueRemove,
                        }}
                        onChange={onChange}
                      />
                    }
                  </Form.Group>
                  {partnerFormik.errors.role && partnerFormik.touched.role && (
                    <div className="formik-errors text-danger">{`${partnerFormik.errors.role}`}</div>
                  )}
                </div> */}
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="street"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.STREET}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="houseNumber"
                      isRequired={true}
                      validate={specialityFormValidation}
                      min={0}
                      type="number"
                      label={LANG.HOUSE_NO}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="zipCode"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="number"
                      min={0}
                      label={LANG.ZIP_CODE}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="city"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.CITY}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="birthPlaceCity"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.BIRTHPLACE_CITY}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="birthPlaceCountry"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.BIRTHPLACE_COUNTRY}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>

                <VisibilityBox show={getAge(partnerFormik.values.dob) < 18}>
                  <div className="col-sm-12  col-md-4 mb-6">
                    <Form.Group>
                      <Field
                        name="parentFirstName"
                        isRequired={true}
                        validate={specialityFormValidation}
                        type="text"
                        label={LANG.FIRSTNAME_PARENTS}
                        component={FieldInputText}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-sm-12  col-md-4 mb-6">
                    <Form.Group>
                      <Field
                        name="parentLastName"
                        isRequired={true}
                        validate={specialityFormValidation}
                        type="text"
                        label={LANG.LASTNAME_PARENTS}
                        component={FieldInputText}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-sm-12  col-md-4 mb-6">
                    <Form.Group>
                      <Field
                        name="parentEmail"
                        isRequired={true}
                        validate={specialityFormValidation}
                        type="text"
                        label={LANG.EMAIL_PARENTS}
                        component={FieldInputText}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-sm-12  col-md-4 mb-6">
                    <Form.Group>
                      <Field
                        name="parentPhone"
                        isRequired={true}
                        validate={specialityFormValidation}
                        type="text"
                        label={LANG.PHONE_PARENTS}
                        component={FieldInputText}
                      />
                    </Form.Group>
                  </div>

                </VisibilityBox>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="bankName"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.BANK_NAME}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="accountHolder"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.ACCOUNT_HOLDER}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
              </div>
              <VisibilityBox show={partnerFormik.values?.role?.includes('member')}>
                {
                  sharedActions.formDetails.type === "Erstmalige Spielerlaubnis" ? <>
                    <div className="my-3 form-control">
                      <label className="d-inline">
                        <div className="fileUpload form-group mb-1" >
                          <input className="d-none" accept={FILE_EXT} id="matchPermissionDoc" type="file"
                            name="matchPermissionDoc"
                            onChange={(ev: any) => {
                              partnerFormik.setFieldValue("matchPermissionDoc", ev.target.files[0]);
                            }}
                          />
                          <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                            <span className="text-black"> {partnerFormik.values?.matchPermissionDoc ? partnerFormik.values?.matchPermissionDoc?.name : LANG.APPLICATION_FOR_MATCH_PERMISSIONS}</span>
                            <span className="iconWrap"><UploadIcon /></span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </> : <>
                    <div className="my-3 form-control">
                      <label className="d-inline">
                        <div className="fileUpload form-group mb-1" >
                          <input className="d-none" accept={FILE_EXT} id="clubTransferDoc" type="file"
                            name="clubTransferDoc"
                            onChange={(ev: any) => {
                              partnerFormik.setFieldValue("clubTransferDoc", ev.target.files[0]);
                            }}
                          />
                          <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                            <span className="text-black">
                              {partnerFormik.values?.clubTransferDoc ? partnerFormik.values?.clubTransferDoc?.name : LANG.APPLICATION_FOR_CLUB_TRANSFER}                       </span>
                            <span className="iconWrap"><UploadIcon /></span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </>
                }
                <VisibilityBox show={partnerFormik.values?.type === 'Erstmalige Spielerlaubnis' && getAge(partnerFormik.values?.dob) < 18}>
                  <div className="my-3 form-control">
                    <label className="d-inline">
                      <div className="fileUpload form-group mb-1" >
                        <input className="d-none" accept={FILE_EXT} id="doctorCerificateDoc" type="file"
                          name="doctorCerificateDoc"
                          onChange={(ev: any) => {
                            partnerFormik.setFieldValue("doctorCerificateDoc", ev.target.files[0]);
                          }}
                        />
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black"> {partnerFormik.values?.doctorCerificateDoc ? partnerFormik.values?.doctorCerificateDoc?.name : LANG.DOCTOR_CERTIFICATE}
                          </span>
                          <span className="iconWrap"><UploadIcon /></span>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="my-3 form-control">
                    <label className="d-inline">
                      <div className="fileUpload form-group mb-1" >
                        <input className="d-none" accept={FILE_EXT} id="birthCertificateDoc" type="file"
                          name="birthCertificateDoc"
                          onChange={(ev: any) => {
                            partnerFormik.setFieldValue("birthCertificateDoc", ev.target.files[0]);
                          }}
                        />
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">{partnerFormik.values?.birthCertificateDoc ? partnerFormik.values?.birthCertificateDoc?.name : LANG.BIRTH_CERTIFICATE}
                          </span>
                          <span className="iconWrap"><UploadIcon /></span>
                        </div>
                      </div>
                    </label>
                  </div>
                </VisibilityBox>
                <VisibilityBox show={partnerFormik.values?.nationality === 'Dutch' && getAge(partnerFormik.values?.dob) > 10 && getAge(partnerFormik.values?.dob) < 18}>
                  <div className="my-3 form-control">
                    <label className="d-inline">
                      <div className="fileUpload form-group mb-1" >
                        <input className="d-none" accept={FILE_EXT} id="residenceCertificateDoc" type="file"
                          name="residenceCertificateDoc"
                          onChange={(ev: any) => {
                            partnerFormik.setFieldValue("residenceCertificateDoc", ev.target.files[0]);
                          }}
                        />
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">{partnerFormik.values?.residenceCertificateDoc ? partnerFormik.values?.residenceCertificateDoc?.name : LANG.RESIDENCE_CERTIFICATION}
                          </span>
                          <span className="iconWrap"><UploadIcon /></span>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="my-3 form-control">
                    <label className="d-inline">
                      <div className="fileUpload form-group mb-1" >
                        <input className="d-none" accept={FILE_EXT} id="playersParentDeclarationDoc" type="file"
                          name="playersParentDeclarationDoc"
                          onChange={(ev: any) => {
                            partnerFormik.setFieldValue("playersParentDeclarationDoc", ev.target.files[0]);
                          }}
                        />
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">{partnerFormik.values?.playersParentDeclarationDoc ? partnerFormik.values?.playersParentDeclarationDoc?.name : LANG.PLAYER_PARENTS_DECLARATION}
                          </span>
                          <span className="iconWrap"><UploadIcon /></span>
                        </div>
                      </div>
                    </label>
                  </div>
                </VisibilityBox>
                <VisibilityBox show={partnerFormik.values?.nationality === 'Dutch' && getAge(partnerFormik.values?.dob) > 10}>
                  <div className="my-3 form-control">
                    <label className="d-inline">
                      <div className="fileUpload form-group mb-1" >
                        <input className="d-none" accept={FILE_EXT} id="copyOfPassportDoc" type="file"
                          name="copyOfPassportDoc"
                          onChange={(ev: any) => {
                            partnerFormik.setFieldValue("copyOfPassportDoc", ev.target.files[0]);
                          }}
                        />
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black"> {partnerFormik.values?.copyOfPassportDoc ? partnerFormik.values?.copyOfPassportDoc?.name : LANG.COPY_OF_PASSPORT}
                          </span>
                          <span className="iconWrap"><UploadIcon /></span>
                        </div>
                      </div>
                    </label>
                  </div>
                </VisibilityBox>
                <VisibilityBox show={ARGENTINA_NATIONALITY.includes(partnerFormik.values?.nationality)}>
                  <div className="my-3 form-control">
                    <label className="d-inline">
                      <div className="fileUpload form-group mb-1" >
                        <input className="d-none" accept={FILE_EXT} id="attachmentArgentinaDoc" type="file"
                          name="attachmentArgentinaDoc"
                          onChange={(ev: any) => {
                            partnerFormik.setFieldValue("attachmentArgentinaDoc", ev.target.files[0]);
                          }}
                        />
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">{partnerFormik.values?.attachmentArgentinaDoc ? partnerFormik.values?.attachmentArgentinaDoc?.name : LANG.APPLICATION_ATTACHMENT_ARGETINA}
                          </span>
                          <span className="iconWrap"><UploadIcon /></span>
                        </div>
                      </div>
                    </label>
                  </div>
                </VisibilityBox>
                <VisibilityBox show={ISTUPNICA_OR_BRISOVNICA_NATIONALITY.includes(partnerFormik.values?.nationality)}>
                  <div className="my-3 form-control">
                    <label className="d-inline">
                      <div className="fileUpload form-group mb-1" >
                        <input className="d-none" accept={FILE_EXT} id="attachmentIstupnicaDoc" type="file"
                          name="attachmentIstupnicaDoc"
                          onChange={(ev: any) => {
                            partnerFormik.setFieldValue("attachmentIstupnicaDoc", ev.target.files[0]);
                          }}
                        />
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">{partnerFormik.values?.attachmentIstupnicaDoc ? partnerFormik.values?.attachmentIstupnicaDoc?.name : LANG.APPLICATION_ATTACHMENT_ISTUPNICA}
                          </span>
                          <span className="iconWrap"><UploadIcon /></span>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="my-3 form-control">
                    <label className="d-inline">
                      <div className="fileUpload form-group mb-1" >
                        <input className="d-none" accept={FILE_EXT} id="attachmentBrisovnicaDoc" type="file"
                          name="attachmentBrisovnicaDoc"
                          onChange={(ev: any) => {
                            partnerFormik.setFieldValue("attachmentBrisovnicaDoc", ev.target.files[0]);
                          }}
                        />
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">{partnerFormik.values?.attachmentBrisovnicaDoc ? partnerFormik.values?.attachmentBrisovnicaDoc?.name : LANG.APPLICATION_ATTACHMENT_BRISOVNICA}
                          </span>
                          <span className="iconWrap"><UploadIcon /></span>
                        </div>
                      </div>
                    </label>
                  </div>
                </VisibilityBox>

              </VisibilityBox>
              <VisibilityBox show={sharedActions?.formDetails?._id}>
                <h4>{LANG.DOCUMENTS}</h4>
                <div className='row'>
                  <VisibilityBox show={sharedActions?.formDetails?.matchPermissionDoc}>
                    <div className='col-md-12 mb-2'>
                      <div className="fileUpload form-group mb-2 border rounded" >
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">Erstmalige Spielerlaubnis
                          </span>
                          <span className="iconWrap" onClick={() => download(sharedActions?.formDetails?.matchPermissionDoc)}><DownloadIcon /></span>
                        </div>
                      </div>
                    </div>
                  </VisibilityBox>
                  <VisibilityBox show={sharedActions?.formDetails?.clubTransferDoc}>
                    <div className='col-md-12 mb-2'>
                      <div className="fileUpload form-group mb-2 border rounded" >
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">Vereinswechsel
                          </span>
                          <span className="iconWrap" onClick={() => download(sharedActions?.formDetails?.clubTransferDoc)}><DownloadIcon /></span>
                        </div>
                      </div>
                    </div>
                  </VisibilityBox>
                  <VisibilityBox show={sharedActions?.formDetails?.birthCertificateDoc}>
                    <div className='col-md-12 mb-2'>
                      <div className="fileUpload form-group mb-2 border rounded" >
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">{LANG.BIRTH_CERTIFICATE}
                          </span>
                          <span className="iconWrap" onClick={() => download(sharedActions?.formDetails?.birthCertificateDoc)}><DownloadIcon /></span>
                        </div>
                      </div>
                    </div>
                  </VisibilityBox>
                  <VisibilityBox show={sharedActions?.formDetails?.residenceCertificateDoc}>
                    <div className='col-md-12 mb-2'>
                      <div className="fileUpload form-group mb-2 border rounded" >
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">{LANG.RESIDENCE_CERTIFICATION}
                          </span>
                          <span className="iconWrap" onClick={() => download(sharedActions?.formDetails?.residenceCertificateDoc)} ><DownloadIcon /></span>
                        </div>
                      </div>
                    </div>
                  </VisibilityBox>
                  <VisibilityBox show={sharedActions?.formDetails?.playersParentDeclarationDoc}>
                    <div className='col-md-12 mb-2'>
                      <div className="fileUpload form-group mb-2 border rounded" >
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">{LANG.PLAYER_PARENTS_DECLARATION}
                          </span>
                          <span className="iconWrap" onClick={() => download(sharedActions?.formDetails?.playersParentDeclarationDoc)} ><DownloadIcon /></span>
                        </div>
                      </div>
                    </div>
                  </VisibilityBox>
                  <VisibilityBox show={sharedActions?.formDetails?.copyOfPassportDoc}>
                    <div className='col-md-12 mb-2'>
                      <div className="fileUpload form-group mb-2 border rounded" >
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">{LANG.COPY_OF_PASSPORT}
                          </span>
                          <span className="iconWrap" onClick={() => download(sharedActions?.formDetails?.copyOfPassportDoc)} ><DownloadIcon /></span>
                        </div>
                      </div>
                    </div>
                  </VisibilityBox>
                  <VisibilityBox show={sharedActions?.formDetails?.attachmentArgentinaDoc}>
                    <div className='col-md-12 mb-2'>
                      <div className="fileUpload form-group mb-2 border rounded" >
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">{LANG.APPLICATION_ATTACHMENT_ARGETINA}
                          </span>
                          <span className="iconWrap" onClick={() => download(sharedActions?.formDetails?.attachmentArgentinaDoc)}><DownloadIcon /></span>
                        </div>
                      </div>
                    </div>
                  </VisibilityBox>
                  <VisibilityBox show={sharedActions?.formDetails?.attachmentIstupnicaDoc}>
                    <div className='col-md-12 mb-2'>
                      <div className="fileUpload form-group mb-2 border rounded" >
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">{LANG.APPLICATION_ATTACHMENT_ISTUPNICA}
                          </span>
                          <span className="iconWrap" onClick={() => download(sharedActions?.formDetails?.attachmentIstupnicaDoc)}><DownloadIcon /></span>
                        </div>
                      </div>
                    </div>
                  </VisibilityBox>
                  <VisibilityBox show={sharedActions?.formDetails?.attachmentBrisovnicaDoc}>
                    <div className='col-md-12 mb-2'>
                      <div className="fileUpload form-group mb-2 border rounded" >
                        <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                          <span className="text-black">{LANG.APPLICATION_ATTACHMENT_BRISOVNICA}
                          </span>
                          <span className="iconWrap" onClick={() => download(sharedActions?.formDetails?.attachmentBrisovnicaDoc)}><DownloadIcon /></span>
                        </div>
                      </div>
                    </div>
                  </VisibilityBox>
                  <div className='col-md-12'>
                    <Form.Group className="mb-3">

                    </Form.Group>
                  </div>
                  <div className='col-md-12'>
                    <Form.Group className="mb-3">

                    </Form.Group>
                  </div>
                </div>
              </VisibilityBox>
              <Modal.Footer>
                <Button
                  type="button"
                  variant="secondary"
                  className="primaryBtn"
                  onClick={closeModal}
                >
                  {LANG.CANCEL}
                </Button>
                <Button type="submit" className="primaryBtn active">
                  {LANG.SUBMIT}
                </Button>
              </Modal.Footer>
            </Form>
          </FormikProvider>
        </Modal.Body>
      </Modal>
    </>
  );
}

export { PartnerModal };
