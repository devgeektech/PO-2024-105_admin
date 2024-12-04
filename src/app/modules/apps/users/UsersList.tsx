

import { CommonTable } from "../common/common-list/table/Table";
import { KTCard } from "../../../../_metronic/helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../common/common-list/components/pagination/Pagination";
import { setId } from "../../../../redux/features/shared/sharedSlice";
import { UserModal } from "./UserModal";
import './style.scss'
import { getUsers } from "../../../../redux/features/user/_userAction";
import { UserListHeader } from "../common/common-list/components/header/UserListHeader";
import { usersColumns } from "../common/common-list/table/columns/_userColumns";
import { getAllUserToExport } from "../../../../services/user.service";
import { UserDetailsModal } from "./UserDetailsModal";
import { AssignMemberModal } from "./AssignMembersModal";

const UserList = () => {
  const headers= [
    { label: "Name", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "email" },
    { label: "Gender", key: "gender" }
  ];
  const [exportData,setExportData]= useState({
    headers,
    data:[],
    fileName:"KVM_USERS"
  });
  const sharedActions = useSelector((state: any) => state.sharedActions);
  const dispatch: any = useDispatch();
  const data: any = useSelector((state: any) => state.userList?.data)||[];
  const totalRecord  = useSelector((state: any) => state.userList?.totalRecord);
  useEffect(() => {
    dispatch(setId('User'))
    dispatch(getUsers({ page: 1, limit: 10 }));
    getExportsDat()
  }, [dispatch]);

  const getExportsDat=async ()=>{
       const result:any= await getAllUserToExport();
       setExportData({
        ...exportData,
        data: result?.data||[]
       })
  }

  const handleClick = (page: number) => {
    dispatch(getUsers({ page: page, limit: 10 }));
  };
  
  return (
    <>
      <KTCard>
        <UserListHeader exportObject={exportData} />
        <CommonTable data={data} columns={usersColumns} />
        {sharedActions.userDetailsModal && <UserModal />}
        {sharedActions.userShowDetailsModal && <UserDetailsModal /> }
        {sharedActions.assignMemberModal&& <AssignMemberModal /> }
        {totalRecord > 10 && <Pagination
          totalRecord={totalRecord}
          handleClick={handleClick}
        />}
      </KTCard>
    </>
  );
};

export { UserList };
