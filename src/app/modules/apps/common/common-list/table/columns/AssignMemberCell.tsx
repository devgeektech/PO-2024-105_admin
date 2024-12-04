/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setAssignMembersModalStaus,setMemberAssignedTrainerDetails } from '../../../../../../../redux/features/shared/sharedSlice';
type Props = {
  user: any;
};

const AssignMemberCell: FC<Props> = ({ user }) => {
  const dispatch = useDispatch();
  const openAddUserModal = () => {
    dispatch(setMemberAssignedTrainerDetails(user))
    dispatch(setAssignMembersModalStaus(true))
  }
  return (
    <>
      <div className="d-flex align-items-center">
        <div className="menu-item me-4">
            {user.role.includes('trainer') && <button className="btn assign" onClick={openAddUserModal}>Assign</button>}
        </div>
      </div>

    </>
  );
};

export { AssignMemberCell };
