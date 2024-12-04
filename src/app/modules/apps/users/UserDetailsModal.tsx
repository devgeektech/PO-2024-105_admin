import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setFiles,
  setFormDetails,
  setUserShowModalStatus,
} from "../../../../redux/features/shared/sharedSlice";

function UserDetailsModal() {
  const dispatch: any = useDispatch();
  const sharedActions: any = useSelector((state: any) => state.sharedActions);

  const download = (filename: any) => {
    const a = document.createElement("a");
    a.href = process.env.REACT_APP_FILE_URL + filename;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const closeModal = () => {
    dispatch(setUserShowModalStatus(false));
    dispatch(setFormDetails({}));
    dispatch(setFiles([]));
  };

  return (
    <>
      <Modal
        className="wrapmodal"
        backdrop="static"
        size="lg"
        show={sharedActions.userShowDetailsModal}
        onHide={closeModal}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrapmodalInner">
            <div className="row mb-4">
              <div className="col-md-12">
                <div className="half50">
                  <p>
                    <strong>Name des Kontoinhabers:</strong>{" "}
                    {sharedActions.formDetails?.accountHolder || "N/A"}
                  </p>
                  <p>
                    <strong>Bankverbindung:</strong>{" "}
                    {sharedActions.formDetails?.bankName || "N/A"}
                  </p>
                  <p>
                    <strong>BIC:</strong>{" "}
                    {sharedActions.formDetails?.bic || "N/A"}
                  </p>
                  <p>
                    <strong>IBAN:</strong>{" "}
                    {sharedActions.formDetails?.iban || "N/A"}
                  </p>
                  <p>
                    <strong>Approved:</strong>{" "}
                    {sharedActions.formDetails?.approved ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>On Vocation:</strong>{" "}
                    {sharedActions.formDetails?.onVocation ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Vorname:</strong>{" "}
                    {sharedActions.formDetails?.firstName || "N/A"}
                  </p>
                  <p>
                    <strong>Nachname:</strong>{" "}
                    {sharedActions.formDetails?.lastName || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {sharedActions.formDetails?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Telefon:</strong>{" "}
                    {sharedActions.formDetails?.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Geschlecht:</strong>{" "}
                    {sharedActions.formDetails?.gender || "N/A"}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(
                      sharedActions.formDetails?.dob
                    ).toLocaleDateString() || "N/A"}
                  </p>
                  <p>
                    <strong>Stadt:</strong>{" "}
                    {sharedActions.formDetails?.city || "N/A"}
                  </p>
                  <p>
                    <strong>Straße:</strong>{" "}
                    {sharedActions.formDetails?.street || "N/A"}
                  </p>
                  <p>
                    <strong>Hausnummer:</strong>{" "}
                    {sharedActions.formDetails?.houseNumber || "N/A"}
                  </p>
                  <p>
                    <strong>PLZ:</strong>{" "}
                    {sharedActions.formDetails?.zipCode || "N/A"}
                  </p>
                  <p>
                    <strong>Nationalität:</strong>{" "}
                    {sharedActions.formDetails?.nationality || "N/A"}
                  </p>
                  <p>
                    <strong>Abonnement:</strong>{" "}
                    {sharedActions.formDetails?.subscription || "N/A"}
                  </p>
                  <p>
                    <strong>Type:</strong>{" "}
                    {sharedActions.formDetails?.type || "N/A"}
                  </p>
                  <p>
                    <strong>Vorname (Erziehungsberechtigter / Eltern):</strong>{" "}
                    {sharedActions.formDetails?.parentFirstName || "N/A"}
                  </p>
                  <p>
                    <strong>Nachname (Erziehungsberechtigter / Eltern):</strong>{" "}
                    {sharedActions.formDetails?.parentLastName || "N/A"}
                  </p>
                  <p>
                    <strong>Email (Erziehungsberechtigter / Eltern):</strong>{" "}
                    {sharedActions.formDetails?.parentEmail || "N/A"}
                  </p>
                  <p>
                    <strong>Telefon (Erziehungsberechtigter / Eltern):</strong>{" "}
                    {sharedActions.formDetails?.parentPhone || "N/A"}
                  </p>
                  <p>
                    <strong>Geburtsort:</strong>{" "}
                    {sharedActions.formDetails?.birthPlaceCity || "N/A"}
                  </p>
                  <p>
                    <strong>Geburtsland:</strong>{" "}
                    {sharedActions.formDetails?.birthPlaceCountry || "N/A"}
                  </p>

                  {sharedActions.formDetails?.birthCertificateDoc && (
                    <p>
                      <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                        <strong>Kopie der Geburtsurkunde:</strong>
                        <span
                          className="iconWrap"
                          onClick={() =>
                            download(
                              sharedActions.formDetails?.birthCertificateDoc
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

                  {sharedActions.formDetails?.matchPermissionDoc && (
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
                              sharedActions.formDetails?.matchPermissionDoc
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
                  {sharedActions.formDetails?.doctorCerificateDoc && (
                    <p>
                      <div className="p-2 d-flex justify-content-between w-100 align-items-center">
                        <strong>Ärztliches Attest:</strong>
                        <span
                          className="iconWrap"
                          onClick={() =>
                            download(
                              sharedActions.formDetails?.doctorCerificateDoc
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

export { UserDetailsModal };
