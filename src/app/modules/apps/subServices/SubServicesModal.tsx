import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormDetails,
  setSubservicesModalStatus
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
import Select from "react-select"
import { addSubService, getSubServices, updateSubService } from "../../../../redux/features/subServices/_subServicesAction";
function SubServicesModal() {
  const dispatch: any = useDispatch();
  const sharedActions: any = useSelector((state: any) => state.sharedActions);
  const subServices: any = useSelector((state: any) => state.subServices?.data) || [];
  const [imageUrl, setImageUrl] = useState<any>();
  const FormValidation = Yup.object().shape({
    name: Yup.string().required(REQUIRED),
    description: Yup.string(),
    serviceId: Yup.string()
  });

  const formIntialValues = {
    description: sharedActions.formDetails.description || "",
    name: sharedActions.formDetails.name || "",
    serviceId: sharedActions.formDetails.serviceId
  };

  const subServicesFormik = useFormik({
    initialValues: formIntialValues,
    validationSchema: FormValidation,
    onSubmit: (values: any, { resetForm }) => {
      values.selectedPage = sharedActions.selectedPage;
      if (sharedActions?.formDetails?._id) {
        dispatch(
          updateSubService({
            ...values,
            id: sharedActions.formDetails?._id,
          })
        );
      } else {
        dispatch(
          addSubService({ ...values})
        );
      }
      dispatch(setFormDetails({}));
      setTimeout(() => {
        dispatch(setSubservicesModalStatus(false));
        resetForm();
      }, 500);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (sharedActions?.formDetails?._id && sharedActions?.formDetails?.image) setImageUrl(process.env.REACT_APP_FILE_URL + sharedActions?.formDetails?.image)
    dispatch(getSubServices({ page: 1, limit: 10 }))
    }, [])


  
  const closeModal = () => {
    dispatch(setSubservicesModalStatus(false));
    dispatch(setFormDetails({}));
  };

  const handleChangeProfileImage = async (e: any) => {
    const selectedFile = e.target.files[0];
    const url = URL.createObjectURL(selectedFile);
    subServicesFormik.setFieldValue("image", selectedFile);
    setImageUrl(url);
  };

  console.log("event formik value", subServicesFormik.values);

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
            {!sharedActions.formDetails._id ? "Add" : "Update"} Sub Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormikProvider value={subServicesFormik}>
            <Form onSubmit={subServicesFormik.handleSubmit} method="POST">
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
                <div className="col-sm-12  col-md-4 mb-6">
                  <Form.Group>
                    <Form.Label>
                      Services <span>*</span>
                    </Form.Label>
                    <Select
                      className="custom-select-box"
                      value={subServices?.find(
                        (g) => g._id === subServicesFormik.values?.serviceId
                      )}
                      name="services"
                      placeholder="Select Service"
                      getOptionLabel={(o: any) => o?.name}
                      getOptionValue={(o: any) => o?._id}
                      onChange={(v) => {
                        subServicesFormik.setFieldValue("serviceId", v?._id);
                      }}
                      options={subServices}
                    />
                  </Form.Group>
                  {subServicesFormik.errors.serviceId && subServicesFormik.touched.serviceId && (
                    <div className="formik-errors text-danger">{`${subServicesFormik.errors.serviceId}`}</div>
                  )}
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

export { SubServicesModal };
