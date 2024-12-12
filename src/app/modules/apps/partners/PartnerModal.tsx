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
import Select from "react-select";
import logo from "../../../../_metronic/assets/logo/admin-logo.png";
import {
  // addParnerDetails,
  updatePartnerDetails,
} from "../../../../redux/features/partner/_partnerAction";
import { useEffect, useState } from "react";
import moment from "moment";
import { LANG } from "../../../constants/language";
import {  getFormData } from "../../../../utils";


function PartnerModal() {
  const [imageUrl, setImageUrl] = useState<any>();
  const dispatch: any = useDispatch();
  let sharedActions: any = useSelector((state: any) => state.sharedActions);

  useEffect(() => {
    if (sharedActions?.formDetails?._id && sharedActions?.formDetails?.image) setImageUrl(process.env.REACT_APP_FILE_URL + sharedActions?.formDetails?.image)
  }, []);

  const specialityFormValidation = Yup.object().shape({
    image: Yup.mixed(),
    name: Yup.string().required(REQUIRED),
    email: Yup.string().required(REQUIRED),
    phone: Yup.string().required(REQUIRED),
    gender: Yup.string().required(REQUIRED),
    password: Yup.string().required(REQUIRED),
    checkinRate: Yup.number().required(REQUIRED),
    businessName: Yup.string().required(REQUIRED),
    businessWebsite: Yup.string().required(REQUIRED),
    businessListedDate: Yup.date().required(REQUIRED),
    businessType: Yup.string().required(REQUIRED),
    services: Yup.mixed(),
    status: Yup.string().required(REQUIRED),
    rejectionReason: Yup.string(),
    description: Yup.string(),
  });

  const formIntialValues = {
    image: sharedActions?.formDetails?.image || "",
    name: sharedActions.formDetails.name || "",
    email: sharedActions.formDetails.email || "",
    phone: sharedActions.formDetails.phone || "",
    gender: sharedActions.formDetails.gender || "",
    password: sharedActions.formDetails.password || "",
    checkinRate: sharedActions?.formDetails?.checkinRate || "",
    businessName: sharedActions?.formDetails?.businessName || "",
    businessWebsite: sharedActions?.formDetails?.businessWebsite || "",
    businessListedDate: sharedActions.formDetails.businessListedDate ? moment(sharedActions.formDetails.businessListedDate).format("YYYY-MM-DD") : "",
    businessType: sharedActions?.formDetails?.businessType?.name || "",
    services: sharedActions?.formDetails?.allServiceNames || "",
    status: sharedActions?.formDetails?.status || "",
    rejectionReason: sharedActions?.formDetails?.rejectionReason || "",
    description: sharedActions?.formDetails?.description || "",
  };

  const partnerFormik = useFormik({
    initialValues: formIntialValues,
    validationSchema: specialityFormValidation,
    enableReinitialize: true,
    onSubmit: (values: any, { resetForm }) => {
      const payload = {
        ...values,
        selectedPage: sharedActions.selectedPage
      }
      const formData = getFormData(payload);
      
      if (sharedActions?.formDetails?._id) {
        const partnerId = sharedActions.formDetails._id;

        dispatch(updatePartnerDetails({ formData, id: partnerId }));
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
    partnerFormik.setFieldValue("image", selectedFile);
    setImageUrl(url);
  };

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
                      name="name"
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.NAME}
                      isRequired={true}
                      component={FieldInputText}
                      placeholder={LANG.NAME}
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
                      label={LANG.EMAIL}
                      component={FieldInputText}
                      readOnly={true}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="phone"
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
                      name="checkinRate"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="number"
                      label={LANG.CHECK_IN_RATE}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="businessName"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.BUSINESS_NAME}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="businessWebsite"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.BUSINESS_WEBSITE}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="businessListedDate"
                      validate={specialityFormValidation}
                      type="date"
                      isRequired={true}
                      label={LANG.BUSINESS_LISTED_DATE}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="businessType"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.BUSINESS_TYPE}
                      component={FieldInputText}
                      readOnly={true}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="services"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.SEVICES}
                      component={FieldInputText}
                      readOnly={true}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="status"
                      isRequired={true}
                      validate={specialityFormValidation}
                      type="text"
                      label={LANG.STATUS}
                      component={FieldInputText}
                      readOnly={true}
                    />
                  </Form.Group>
                </div>
                {sharedActions?.formDetails?.status?.toLowerCase() === "rejected" && (
                  <div className="col-sm-12  col-md-12 mb-6">
                    <Form.Group>
                      <Field
                        name="rejectionReason"
                        isRequired={true}
                        validate={specialityFormValidation}
                        type="text"
                        label={LANG.REJECTION_REASON}
                        component={FieldInputText}
                        readOnly={true}
                      />
                    </Form.Group>
                  </div>
                )}
                <div className="col-sm-12  col-md-12 mb-6">
                  <Form.Group>
                    <Field
                      name="description"
                      validate={specialityFormValidation}
                      as={"textarea"}
                      label={LANG.DESCRIPTION}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
              </div>

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
