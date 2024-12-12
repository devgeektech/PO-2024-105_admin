import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { FormikProvider, useFormik } from "formik";
import { Form } from "react-bootstrap";
import {
  setPartnerStatusModalStaus,
} from "../../../../redux/features/shared/sharedSlice";
import { updatePartnerStatus } from "../../../../redux/features/partner/_partnerAction";
import * as Yup from "yup";
import { REQUIRED } from "../../../../utils/const";
import { toast } from "react-toastify";
import { LANG } from "../../../constants/language";


function PartnerStatusModal() {
  const dispatch: any = useDispatch();
  const sharedActions: any = useSelector((state: any) => state.sharedActions);
  const status = sharedActions.partnerDetails.updatedStatus;

  const formInitialValues = {
    checkinRate: sharedActions.partnerDetails.checkinRate || "0",
    rejectionReason: sharedActions.partnerDetails.rejectionReason,
    status: status?.toLowerCase(),
  };
  const eventFormValidation = Yup.object().shape({
    checkinRate: Yup.string().required(REQUIRED),
    rejectionReason: Yup.string().test(
      REQUIRED,
      function (value) {
        return this.parent.status?.toLowerCase() === 'rejected' ? !!value : true;
      }
    )
  });

  const assignFormik = useFormik({
    initialValues: formInitialValues,
    validationSchema: eventFormValidation,
    onSubmit: async (values, { resetForm }) => {
      console.log('Form submitted with values:', values, typeof values.checkinRate);

      if (assignFormik.isValid) {
        const partnerId = sharedActions.partnerDetails?._id;
        dispatch(updatePartnerStatus({ id: partnerId, ...values, selectedPage: sharedActions.selectedPage }));

        dispatch(setPartnerStatusModalStaus(false));
        resetForm();
      } else {
        toast.error(LANG.CHECKIN_RATE_REQUIRED);
      }
    },
  });

  const closeModal = () => {
    dispatch(setPartnerStatusModalStaus(false));
  };

  return (
    <Modal
      backdrop="static"
      show={sharedActions.partnerStatusModal}
      onHide={closeModal}
      animation
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {(status?.toLowerCase() === "accepted") ? 'Accept' : 'Reject'} Partner
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormikProvider value={assignFormik}>
          <Form onSubmit={assignFormik.handleSubmit} method="POST">

            {(status?.toLowerCase() === "accepted") && (
              <div className="form-group">
                <label htmlFor="checkinRate">Check-in Rate</label>
                <input
                  type="number"
                  id="checkinRate"
                  name="checkinRate"
                  className="form-control"
                  value={assignFormik.values.checkinRate}
                  onChange={assignFormik.handleChange}
                  onBlur={assignFormik.handleBlur}
                />
                {assignFormik.touched.checkinRate && assignFormik.errors.checkinRate && (
                  <div className="text-danger">
                    {typeof assignFormik.errors.checkinRate === "string"
                      ? assignFormik.errors.checkinRate
                      : "Invalid input"}
                  </div>
                )}
              </div>
            )}

            {status?.toLowerCase() !== "accepted" && (
              <div className="form-group">
                <label htmlFor="rejectionReason">Reason of Rejection</label>
                <input
                  type="text"
                  id="rejectionReason"
                  name="rejectionReason"
                  className="form-control"
                  value={assignFormik.values.rejectionReason}
                  onChange={assignFormik.handleChange}
                  onBlur={assignFormik.handleBlur}
                />
                {assignFormik.touched.rejectionReason && assignFormik.errors.rejectionReason && (
                  <div className="text-danger">
                    {typeof assignFormik.errors.rejectionReason === "string"
                      ? "Field is required."
                      : "Invalid input."}
                  </div>
                )}
              </div>
            )}

            <Modal.Footer>
              <Button variant="secondary"
                className="primaryBtn" onClick={closeModal}>
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
  );
}

export { PartnerStatusModal };
