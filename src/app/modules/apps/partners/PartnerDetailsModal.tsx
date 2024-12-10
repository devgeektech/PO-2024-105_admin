import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setFiles,
  setPartnerDetails,
  setPartnerShowModalStatus,
} from "../../../../redux/features/shared/sharedSlice";

function PartnerDetailsModal() {
  const dispatch: any = useDispatch();
  const sharedActions: any = useSelector((state: any) => state.sharedActions);
  console.log('sharedActions ========== ', sharedActions);
  

  const download = (filename: any) => {
    const a = document.createElement("a");
    a.href = process.env.REACT_APP_FILE_URL + filename;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const closeModal = () => {
    dispatch(setPartnerShowModalStatus(false));
    dispatch(setPartnerDetails({}));
    dispatch(setFiles([]));
  };

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
                    <strong>Name des Kontoinhabers:</strong>{" "}
                    {sharedActions.partnerDetails?.accountHolder || "N/A"}
                  </p>
                  <p>
                    <strong>Bankverbindung:</strong>{" "}
                    {sharedActions.partnerDetails?.bankName || "N/A"}
                  </p>
                  <p>
                    <strong>BIC:</strong>{" "}
                    {sharedActions.partnerDetails?.bic || "N/A"}
                  </p>
                  <p>
                    <strong>IBAN:</strong>{" "}
                    {sharedActions.partnerDetails?.iban || "N/A"}
                  </p>
                  <p>
                    <strong>Approved:</strong>{" "}
                    {sharedActions.partnerDetails?.approved ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>On Vocation:</strong>{" "}
                    {sharedActions.partnerDetails?.onVocation ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Vorname:</strong>{" "}
                    {sharedActions.partnerDetails?.firstName || "N/A"}
                  </p>
                  <p>
                    <strong>Nachname:</strong>{" "}
                    {sharedActions.partnerDetails?.lastName || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {sharedActions.partnerDetails?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Telefon:</strong>{" "}
                    {sharedActions.partnerDetails?.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Geschlecht:</strong>{" "}
                    {sharedActions.partnerDetails?.gender || "N/A"}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(
                      sharedActions.partnerDetails?.dob
                    ).toLocaleDateString() || "N/A"}
                  </p>
                  <p>
                    <strong>Stadt:</strong>{" "}
                    {sharedActions.partnerDetails?.city || "N/A"}
                  </p>
                  <p>
                    <strong>Straße:</strong>{" "}
                    {sharedActions.partnerDetails?.street || "N/A"}
                  </p>
                  <p>
                    <strong>Hausnummer:</strong>{" "}
                    {sharedActions.partnerDetails?.houseNumber || "N/A"}
                  </p>
                  <p>
                    <strong>PLZ:</strong>{" "}
                    {sharedActions.partnerDetails?.zipCode || "N/A"}
                  </p>
                  <p>
                    <strong>Nationalität:</strong>{" "}
                    {sharedActions.partnerDetails?.nationality || "N/A"}
                  </p>
                  <p>
                    <strong>Abonnement:</strong>{" "}
                    {sharedActions.partnerDetails?.subscription || "N/A"}
                  </p>
                  <p>
                    <strong>Type:</strong>{" "}
                    {sharedActions.partnerDetails?.type || "N/A"}
                  </p>
                  <p>
                    <strong>Vorname (Erziehungsberechtigter / Eltern):</strong>{" "}
                    {sharedActions.partnerDetails?.parentFirstName || "N/A"}
                  </p>
                  <p>
                    <strong>Nachname (Erziehungsberechtigter / Eltern):</strong>{" "}
                    {sharedActions.partnerDetails?.parentLastName || "N/A"}
                  </p>
                  <p>
                    <strong>Email (Erziehungsberechtigter / Eltern):</strong>{" "}
                    {sharedActions.partnerDetails?.parentEmail || "N/A"}
                  </p>
                  <p>
                    <strong>Telefon (Erziehungsberechtigter / Eltern):</strong>{" "}
                    {sharedActions.partnerDetails?.parentPhone || "N/A"}
                  </p>
                  <p>
                    <strong>Geburtsort:</strong>{" "}
                    {sharedActions.partnerDetails?.birthPlaceCity || "N/A"}
                  </p>
                  <p>
                    <strong>Geburtsland:</strong>{" "}
                    {sharedActions.partnerDetails?.birthPlaceCountry || "N/A"}
                  </p>

                  {sharedActions.partnerDetails?.birthCertificateDoc && (
                    <p>
                      <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                        <strong>Kopie der Geburtsurkunde:</strong>
                        <span
                          className="iconWrap"
                          onClick={() =>
                            download(
                              sharedActions.partnerDetails?.birthCertificateDoc
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-download fw-bold cursor-pointer"
                            viewBox="0 0 16 16"
                          >
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                          </svg>
                        </span>
                      </div>
                    </p>
                  )}

                  {sharedActions.partnerDetails?.matchPermissionDoc && (
                    <p>
                      <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                        <strong>
                          Antrag auf Spielerlaubnis (Bitte Anfrag auf
                          Spielerlaubnis, downloaden, ausfüllen und hochladen):
                        </strong>
                        <span
                          className="iconWrap"
                          onClick={() =>
                            download(
                              sharedActions.partnerDetails?.matchPermissionDoc
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-download fw-bold cursor-pointer"
                            viewBox="0 0 16 16"
                          >
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                          </svg>
                        </span>
                      </div>
                    </p>
                  )}
                  {sharedActions.partnerDetails?.doctorCerificateDoc && (
                    <p>
                      <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                        <strong>Ärztliches Attest:</strong>
                        <span
                          className="iconWrap"
                          onClick={() =>
                            download(
                              sharedActions.partnerDetails?.doctorCerificateDoc
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-download fw-bold cursor-pointer"
                            viewBox="0 0 16 16"
                          >
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                          </svg>
                        </span>
                      </div>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export { PartnerDetailsModal };
