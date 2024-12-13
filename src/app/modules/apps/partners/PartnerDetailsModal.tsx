import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setPartnerStatusModalStaus,
  setFiles,
  setPartnerDetails,
  setPartnerShowModalStatus,
} from "../../../../redux/features/shared/sharedSlice";
import { Button } from "react-bootstrap";
import { LANG } from "../../../constants/language";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
  };

  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
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
                    <strong>Name:</strong>{" "}
                    {sharedActions.partnerDetails?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {sharedActions.partnerDetails?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>{" "}
                    {sharedActions.partnerDetails?.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="textCap">{sharedActions.partnerDetails?.status || "N/A"}</span>
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
                    <strong>Check-in Rate:</strong>{" "}
                    {sharedActions.partnerDetails?.checkinRate || "N/A"}
                  </p>

                  <h4>{LANG.LOCATIONS}</h4>
                  {sharedActions.partnerDetails?.locations?.length ? (
                    sharedActions.partnerDetails.locations.map((location, index) => (
                      <div key={index} className="location-section">
                        <p>
                          <strong>{LANG.ADDRESS}:</strong> {location.address || "N/A"}
                        </p>
                        <p>
                          <strong>{LANG.CITY}:</strong> {location.city || "N/A"}
                        </p>
                        <p>
                          <strong>{LANG.STATE}:</strong> {location.state || "N/A"}
                        </p>
                        <p>
                          <strong>{LANG.ZIP_CODE}:</strong> {location.zipCode || "N/A"}
                        </p>
                        <p>
                          <strong>{LANG.PHONE}:</strong> {location.phone || "N/A"}
                        </p>
                        <p>
                          <strong>{LANG.BUSINESS_START_TIME}:</strong> {location.startTime || "N/A"}
                        </p>
                        <p>
                          <strong>{LANG.BUSINESS_END_TIME}:</strong> {location.endTime || "N/A"}
                        </p>
                        <p>
                          <strong>{LANG.SERVICES}:</strong>
                          <span className="textCap">{location.serviceNames?.join(", ") || "N/A"}</span>
                        </p>

                        <div
                          style={{
                            background: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "100%",
                          }}
                        >
                          <Slider {...settings} ref={sliderRef}>
                            {location?.images?.length ? (
                              location.images
                                .filter((imgSrc) => imgSrc.trim() !== "") // Filter out empty strings
                                .map((imgSrc, index) => (
                                  <div key={index} className="location-section">

                                    <div>
                                      <img
                                        src={imgSrc}
                                        alt={`Slide ${index + 1}`}
                                        style={{
                                          width: "95px",
                                          height: "100px",
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))
                            ) : (
                              <p>{LANG.NO_LOCATION_IMAGES}</p> // Fallback message if no locations
                            )}
                          </Slider>
                        </div>

                      </div>
                    ))
                  ) : (
                    <p>{LANG.NO_LOCATIONS_AVAILABLE}</p> // Fallback message if no locations
                  )}

                </div>
              </div>
            </div>
          </div>

          <Modal.Footer>
            <Button
              type="button"
              variant="secondary"
              className="primaryBtn"
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
