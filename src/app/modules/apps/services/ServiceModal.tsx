import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setFiles,
  setFormDetails,
  setServiceModalStatus,
} from "../../../../redux/features/shared/sharedSlice";
import { Field, FormikProvider, useFormik } from "formik";
import { Form } from "react-bootstrap";
import FieldInputText from "../common/InputFeilds/InputTextField";
import * as Yup from "yup";
import { REQUIRED } from "../../../../utils/const";
import { toast } from "react-toastify";
import { LANG } from "../../../constants/language";
import { addServiceDetails, updateServiceDetails } from "../../../../redux/features/service/_serviceAction";

function ServiceModal() {
  const dispatch: any = useDispatch();
  const sharedActions: any = useSelector((state: any) => state.sharedActions);
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const serviceFormValidation = Yup.object().shape({
    name: Yup.string().required(REQUIRED),
    description: Yup.string(),
  });

  const formIntialValues = {
    name: sharedActions.formDetails.name || "",
    description: sharedActions.formDetails.description || "",
  };

  const eventFormik = useFormik({
    initialValues: formIntialValues,
    validationSchema: serviceFormValidation,
    onSubmit: (values: any, { resetForm }) => {
      if (isInvalidForm()) {
        toast.error(LANG.SERVICE_NAME_REQUIRED);
        return;
      }
      values.selectedPage = sharedActions.selectedPage;

      if (sharedActions?.formDetails?._id) {
        dispatch(
          updateServiceDetails({
            ...values,
            id: sharedActions.formDetails?._id,
          })
        );
      } else {
        dispatch(
          addServiceDetails({ ...values })
        );
      }
      dispatch(setFormDetails({}));
      setTimeout(() => {
        dispatch(setServiceModalStatus(false));
        resetForm();
      }, 500);
    },
    enableReinitialize: true,
  });

  const closeModal = () => {
    dispatch(setServiceModalStatus(false));
    dispatch(setFormDetails({}));
    dispatch(setFiles([]));
  };

  const isInvalidForm = () => {
    if (eventFormik.values.name) {
      return eventFormik.values.name?.length < 1;
    } else {
      return true;
    }
  };

  return (
    <>
      <Modal
        backdrop="static"
        size="lg"
        show={sharedActions.serviceDetailsModal}
        onHide={closeModal}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {!sharedActions.formDetails._id ? "Add" : "Update"} Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormikProvider value={eventFormik}>
            <Form onSubmit={eventFormik.handleSubmit} method="POST">
              <div className="row">
                <div className="col-sm-12  col-md-12 mb-6">
                  <Form.Group>
                    <Field
                      as={"textarea"}
                      name="name"
                      validate={serviceFormValidation}
                      label="Name"
                      component={FieldInputText}
                      isRequired={true}
                      maxLength={30}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12  col-md-12 mb-6">
                  <Form.Group>
                    <Field
                      as={"textarea"}
                      name="description"
                      validate={serviceFormValidation}
                      label="Description"
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

export { ServiceModal };
