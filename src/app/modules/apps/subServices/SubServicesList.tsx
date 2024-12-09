

import { CommonTable } from "../common/common-list/table/Table";
import { KTCard } from "../../../../_metronic/helpers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../common/common-list/components/pagination/Pagination";
import { setId } from "../../../../redux/features/shared/sharedSlice";
import { SubServicesModal } from "./SubServicesModal";
import './style.scss';
import { UserListHeader } from "../common/common-list/components/header/UserListHeader";
import { subServicesColumns } from "../common/common-list/table/columns/_subServicesColumns";
import { getSubServices } from "../../../../redux/features/subServices/_subServicesAction";
const SubServicesList = () => {
  const sharedActions = useSelector((state: any) => state.sharedActions);
  const dispatch: any = useDispatch();
  const data: any = useSelector((state: any) => state.subServices?.data)||[];
  const totalRecord  = useSelector((state: any) => state.subServices?.totalRecord);
  
  useEffect(() => {
    dispatch(setId('subServices'))
    dispatch(getSubServices({ page: 1, limit: 10 }))
  }, [dispatch]);

  const handleClick = (page: number) => {
    dispatch(getSubServices({ page: page, limit: 10 }));
  };

  return (
    <>
      <KTCard>
        <UserListHeader />
        <CommonTable data={data} columns={subServicesColumns} />
        {sharedActions.subServicesModal && <SubServicesModal />}
        {totalRecord > 10 && <Pagination
          totalRecord={totalRecord}
          handleClick={handleClick}
        />}
      </KTCard>
    </>
  );
};

export { SubServicesList };
