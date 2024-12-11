import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyModalStatus,
  setFiles,
  setFormDetails,
} from "../../../../redux/features/shared/sharedSlice";
import { Field, FormikProvider, useFormik } from "formik";
import { Form } from "react-bootstrap";
import FieldInputText from "../common/InputFeilds/InputTextField";
import * as Yup from "yup";
import { EVENTS_TYPE, REQUIRED } from "../../../../utils/const";
import { toast } from "react-toastify";
import { LANG } from "../../../constants/language";
import {
  addServiceDetails,
  updateServiceDetails,
} from "../../../../redux/features/service/_serviceAction";
import Select from "react-select";
import {
  addCompany,
  updateCompany,
} from "../../../../redux/features/company/_companyAction";

function CompanyModal() {
  const dispatch: any = useDispatch();
  const sharedActions: any = useSelector((state: any) => state.sharedActions);
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const companyFormValidation = Yup.object().shape({
    companyName: Yup.string().required(REQUIRED),
    email: Yup.string().required(REQUIRED),
    description: Yup.string(),
    phone: Yup.string(),
    tax: Yup.string(),
    numberOfEmployees: Yup.number(),
    status: Yup.string(),
  });

  const formIntialValues = {
    companyName: sharedActions.formDetails.companyName || "",
    email: sharedActions.formDetails.email || "",
    description: sharedActions.formDetails.description || "",
    phone: sharedActions.formDetails.phone || "",
    tax: sharedActions.formDetails.numberOfEmployees || "",
    status: sharedActions.formDetails.status || "",
    numberOfEmployees: sharedActions.formDetails.numberOfEmployees,
  };

  const eventFormik = useFormik({
    initialValues: formIntialValues,
    validationSchema: companyFormValidation,
    onSubmit: (values: any, { resetForm }) => {
      if (sharedActions?.formDetails?._id) {
        dispatch(
          updateCompany({
            ...values,
            id: sharedActions.formDetails?._id,
          })
        );
      } else {
        dispatch(addCompany({ ...values }));
      }
      dispatch(setFormDetails({}));
      setTimeout(() => {
        dispatch(setCompanyModalStatus(false));
        resetForm();
      }, 500);
    },
    enableReinitialize: true,
  });

  const closeModal = () => {
    dispatch(setCompanyModalStatus(false));
    dispatch(setFormDetails({}));
    dispatch(setFiles([]));
  };

  return (
    <>
      <Modal
        backdrop="static"
        size="lg"
        show={sharedActions.companyModal}
        onHide={closeModal}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {!sharedActions.formDetails._id ? "Add" : "Update"} Company
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormikProvider value={eventFormik}>
            <Form onSubmit={eventFormik.handleSubmit} method="POST">
              <div className="row">
                <div className="col-sm-6  col-md-6 mb-6">
                  <Form.Group>
                    <Field
                      as={"textarea"}
                      name="companyName"
                      validate={companyFormValidation}
                      label="Company Name"
                      component={FieldInputText}
                      isRequired={true}
                      maxLength={30}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-6  col-md-6 mb-6">
                  <Form.Group>
                    <Field
                      name="email"
                      isRequired={true}
                      validate={companyFormValidation}
                      type="text"
                      label="Email"
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6  col-md-6 mb-6">
                  <Form.Group>
                    <Field
                      as={"textarea"}
                      name="description"
                      validate={companyFormValidation}
                      label="Description"
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
                <div className="col-sm-6  col-md-6 mb-6">
                  <Form.Group>
                    <Field
                      name="phone"
                      isRequired={false}
                      validate={companyFormValidation}
                      type="text"
                      label={"Contact"}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6 col-md-6 mb-6">
                  <Form.Group>
                    <Field
                      name="tax"
                      isRequired={false}
                      validate={companyFormValidation}
                      type="text"
                      label={"Tax"}
                      component={FieldInputText}
                    />
                  </Form.Group>
                </div>

                <div className="col-sm-6 col-md-6 mb-6">
                  <Form.Group>
                    <Field
                      name="numberOfEmployees"
                      isRequired={false}
                      validate={companyFormValidation}
                      min={0}
                      type="number"
                      label={"Number of employees"}
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

export { CompanyModal };
