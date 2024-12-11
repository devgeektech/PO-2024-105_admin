import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setPartnerStatusModalStaus,
  setFiles,
  setPartnerDetails,
  setPartnerShowModalStatus,
} from "../../../../redux/features/shared/sharedSlice";
import { Button } from "react-bootstrap";

function PartnerDetailsModal() {
  const dispatch: any = useDispatch();
  const sharedActions: any = useSelector((state: any) => state.sharedActions);

  const closeModal = () => {
    dispatch(setPartnerShowModalStatus(false));
    dispatch(setPartnerDetails({}));
    dispatch(setFiles([]));
  };

  const updateStatus = (status: string) => {
    let updatedPartnerData = { ...sharedActions.partnerDetails };
    updatedPartnerData.updatedStatus = status;
    dispatch(setPartnerDetails(updatedPartnerData));

    dispatch(setPartnerShowModalStatus(false));
    dispatch(setPartnerStatusModalStaus(true));
  }

  return (
    <>
      <Modal
        className="wrapmodal"
        backdrop="static"
        size="lg"
        show={sharedActions.partnerShowDetailsModal}
        onHide={closeModal}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Partner Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrapmodalInner">
            <div className="row mb-4">
              <div className="col-md-12">
                <div className="half50">
                  <p>
                    <strong>Name:</strong>{" "}
                    {sharedActions.partnerDetails?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {sharedActions.partnerDetails?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Phone Number :</strong>{" "}
                    {sharedActions.partnerDetails?.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Business Name:</strong>{" "}
                    {sharedActions.partnerDetails?.businessName || "N/A"}
                  </p>
                  <p>
                    <strong>Business Website:</strong>{" "}
                    {sharedActions.partnerDetails?.businessWebsite ? <a target="blank" href={sharedActions.partnerDetails?.businessWebsite}> {sharedActions.partnerDetails?.businessWebsite}</a> : "N/A"}
                  </p>
                  <p>
                    <strong>Business Type:</strong>{" "}
                    <span className="textCap">{sharedActions.partnerDetails?.businessType?.name || "N/A"}</span>
                  </p>
                  <p>
                    <strong>Services:</strong>{" "}
                    <span className="textCap">{sharedActions.partnerDetails?.allServiceNames?.join(", ") || "N/A"}</span>
                  </p>
                  <p>
                    <strong>Check-in Rate:</strong>{" "}
                    {sharedActions.partnerDetails?.checkinRate || "N/A"}
                  </p>

                </div>
              </div>
            </div>
          </div>

          <Modal.Footer>
            <Button
              type="button"
              variant="secondary"
              onClick={() => updateStatus("rejected")}
            >
              Reject
            </Button>
            <Button
              type="submit"
              className="primaryBtn active"
              onClick={() => updateStatus("accepted")}
            >
              Accept
            </Button>
          </Modal.Footer>

        </Modal.Body>
      </Modal>
    </>
  );
}

export { PartnerDetailsModal };
