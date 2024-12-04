/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { conFirmMessage } from "../../../../../../../utils/shared";
import { getParnters, verifyPartner } from "../../../../../../../redux/features/partner/_partnerAction";
import { setFormDetails, setUserModalStatus } from "../../../../../../../redux/features/shared/sharedSlice";
import ThreeDotsIcon from "../../../../../../../_metronic/assets/logo/ThreeDotsIcon";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";


const ActionVerifyCell: FC<any> = ({ user }) => {
  const dispatch: any = useDispatch();
  // const handleDelete = (itemId, status) => {
  //   const values = {
  //     title: 'Are you sure?',
  //     text: 'You won\'t be able to revert this!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: `Yes! Update it.`,
  //   }
  //   conFirmMessage(values).then((result) => {
  //     if (result.isConfirmed) {
  //       if (sharedActions.id === 'PARTNER') {
  //         dispatch(verifyPartner({ id: itemId, verifiedStatus: status }));
  //         setTimeout(() => {
  //           dispatch(getParnters({ page: 1, limit: 10 }));
  //         }, 100);
  //       }
  //     }
  //   });
  // };

  const openVerifyModal = () => {
    dispatch(setUserModalStatus(true))
    dispatch(setFormDetails(user))
  }


  return (
    <>
      <div className="d-flex align-items-center">
        <div className="menu-item me-4">
          <Dropdown className="verifiedOptions">
            <Dropdown.Toggle variant="default" id="dropdown-basic">
              <ThreeDotsIcon />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {/* <Link to={"#"}
                className=" menu-link px-3 btn btn-primary btn-active-light-primary btn-sm"
                data-kt-users-table-filter="delete_row"
                onClick={async () => await handleDelete(user?._id, !user.isVerified)}
              >
                {user?.isVerified ? "Verified" : 'Verify'}
              </Link> */}
              <Link to={"#"}
                type="button"
                className=" menu-link px-3 btn btn-primary btn-active-light-primary btn-sm"
                data-kt-users-table-filter="delete_row"
                onClick={openVerifyModal}
              >
                Update Details
              </Link>
            </Dropdown.Menu>
          </Dropdown>

          {/* <a
            className="dropdown-item menu-link px-3 btn btn-primary btn-active-light-primary btn-sm"
            data-kt-users-table-filter="delete_row"
            onClick={async () => await handleDelete(user?._id, !user.isVerified)}
          >
            {user?.isVerified ? "Verified" : 'Verify'}
          </a> */}
        </div>
        <div className="menu-item">
          {/* <a
            type="button"
            className=" menu-link px-3 btn btn-primary btn-active-light-primary btn-sm"
            data-kt-users-table-filter="delete_row"
            onClick={openVerifyModal}
          >
            Update
          </a> */}
        </div>
      </div>

    </>
  );
};

export { ActionVerifyCell };