/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import {
  setBookingModalStatus,
  setCategoryModalStatus,
  setEventModalStatus,
  setFormDetails,
  setForumModalStatus,
  setModalStatus,
  setRoomModalStatus,
  setTaskModalStatus,
  setUserModalStatus,
  setUserShowModalStatus,
} from "../../../../../../../redux/features/shared/sharedSlice";
import { useDispatch, useSelector } from "react-redux";
import { conFirmMessage } from "../../../../../../../utils/shared";


import { Dropdown } from "react-bootstrap";
import ThreeDotsIcon from "../../../../../../../_metronic/assets/logo/ThreeDotsIcon";
import { Link } from "react-router-dom";
import { deleteUser } from "../../../../../../../redux/features/user/_userAction";
import { deleteEvent } from "../../../../../../../redux/features/event/_eventAction";
import { KTIcon, toAbsoluteUrl } from "../../../../../../../_metronic/helpers";

type Props = {
  user: any;
};

const ActionCell: FC<Props> = ({ user }) => {
  const dispatch: any = useDispatch();
  const sharedActions = useSelector((state: any) => state.sharedActions);

  const openEditModal = () => {
    dispatch(setFormDetails(user));
    switch (sharedActions.id) {
      case "User":
        dispatch(setUserModalStatus(true));
        break;
      case "Event":
        dispatch(setEventModalStatus(true));
        break;
      case "Booking":
        dispatch(setBookingModalStatus(true));
        break;
      case "Room":
        dispatch(setRoomModalStatus(true));
        break;
      case "Task":
        dispatch(setTaskModalStatus(true));
        break;
      case "Forum":
        dispatch(setForumModalStatus(true));
        break;
      default:
    }
  };
  const openUserDetailsModal = () => {
    dispatch(setFormDetails(user));
    dispatch(setUserShowModalStatus(true));
  };

  const handleDelete = (itemId) => {
    const values = {
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    };
    conFirmMessage(values).then((result) => {
      if (result.isConfirmed) {
        if (sharedActions.id === "Event") {
          setTimeout(() => {
            dispatch(deleteEvent({ id: user?._id, selectedPage: sharedActions.selectedPage }));
          }, 100);
        } else if (sharedActions.id === "User") {
          setTimeout(() => {
            dispatch(deleteUser({ id: user?._id, selectedPage: sharedActions.selectedPage }));
          }, 100);
        }  
      }
    });
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="menu-item me-4">
          <Dropdown className="verifiedOptions">
            <Dropdown.Toggle variant="default" id="dropdown-basic">
              <ThreeDotsIcon />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {user?.role?.includes("member") && (
                <Link
                  to={"#"}
                  className="menu-link justify-content-start px-3 btn  btn-active-light-primary btn-sm"
                  onClick={openUserDetailsModal}
                >
                  <img src={toAbsoluteUrl('/media/avatars/detailIcon.png')} className="img-class" alt='img' />
                  Details
                </Link>
              )}
              {(sharedActions.id !== "Task" || (sharedActions.id === "Task" && user.status != 'completed')) && (<Link
                to={"#"}
                className="menu-link justify-content-start px-3 btn  btn-active-light-primary btn-sm"
                onClick={openEditModal}
              >
                <KTIcon iconName="pencil" className="fs-2" /> Edit
              </Link>)}
              <Link
                to={"#"}
                className="menu-link px-3 btn justify-content-start  btn-active-light-primary btn-sm"
                data-kt-users-table-filter="delete_row"
                onClick={async () => await handleDelete(user._id)}
              >
                <KTIcon iconName="trash" className="fs-2 text-danger" /> Delete
              </Link>
            </Dropdown.Menu>
          </Dropdown>

          {/* <a
            className="menu-link px-3 btn btn-secondary btn-active-light-primary btn-sm"
            onClick={openEditModal}
          >
            Edit
          </a> */}
          {/* </div> */}
          {/* <div className="menu-item">
          <a
            className="menu-link px-3 btn btn-danger btn-active-light-primary btn-sm"
            data-kt-users-table-filter="delete_row"
            onClick={async () => await handleDelete(user._id)}
          >
            Delete
          </a>
        </div> */}
        </div>
      </div>
    </>
  );
};

export { ActionCell };