import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormDetails,
  setWellnessTypesModalStatus,
} from "../../../../redux/features/shared/sharedSlice";
import { Field, FormikProvider, useFormik } from "formik";
import { Form } from "react-bootstrap";
import FieldInputText from "../common/InputFeilds/InputTextField";
import * as Yup from "yup";
import {
  REQUIRED,
} from "../../../../utils/const";
import { useEffect, useState } from "react";
import { LANG } from "../../../constants/language";
import logo from "../../../../_metronic/assets/logo/admin-logo.png";
import { addWellnessType, updateWellnessType } from "../../../../redux/features/wellnessTypes/_wellnessTypesAction";

function WellnessTypesModal() {
  const dispatch: any = useDispatch();
  const sharedActions: any = useSelector((state: any) => state.sharedActions);
  const [imageUrl, setImageUrl] = useState<any>();
  const FormValidation = Yup.object().shape({
    name: Yup.string().required(REQUIRED),
    image: Yup.mixed(),
    description: Yup.string(),
  });

  const formIntialValues = {
    description: sharedActions.formDetails.description || "",
    name: sharedActions.formDetails.name || "",
    image: sharedActions?.formDetails?.image || "",
  };

  const wellnessTypesFormik = useFormik({
    initialValues: formIntialValues,
    validationSchema: FormValidation,
    onSubmit: (values: any, { resetForm }) => {
      values.selectedPage = sharedActions.selectedPage;
      if (sharedActions?.formDetails?._id) {
        dispatch(
          updateWellnessType({
            ...values,
            id: sharedActions.formDetails?._id,
          })
        );
      } else {
        dispatch(
          addWellnessType({ ...values})
        );
      }
      dispatch(setFormDetails({}));
      setTimeout(() => {
        dispatch(setWellnessTypesModalStatus(false));
        resetForm();
      }, 500);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (sharedActions?.formDetails?._id && sharedActions?.formDetails?.avatar) setImageUrl(process.env.REACT_APP_FILE_URL + sharedActions?.formDetails?.avatar)
  }, [])

  const closeModal = () => {
    dispatch(setWellnessTypesModalStatus(false));
    dispatch(setFormDetails({}));
  };

  const handleChangeProfileImage = async (e: any) => {
    const selectedFile = e.target.files[0];
    const url = URL.createObjectURL(selectedFile);
    wellnessTypesFormik.setFieldValue("avatar", selectedFile);
    setImageUrl(url);
  };

  console.log("event formik value", wellnessTypesFormik.values);

  return (
    <>
      <Modal
        backdrop="static"
        size="lg"
        show={sharedActions.subServicesModal}
        onHide={closeModal}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {!sharedActions.formDetails._id ? "Add" : "Update"} Wellness Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormikProvider value={wellnessTypesFormik}>
            <Form onSubmit={wellnessTypesFormik.handleSubmit} method="POST">
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
              <div className="row">
              <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Field
                      name="name"
                      validate={FormValidation}
                      type="text"
                      label={LANG.NAME}
                      isRequired={true}
                      component={FieldInputText}
                      placeholder={LANG.FIRST_NAME}
                      maxLength={25}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-12  col-md-12 mb-6">
                  <Form.Group>
                    <Field
                      as={"textarea"}
                      name="description"
                      validate={FormValidation}
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

export { WellnessTypesModal };
