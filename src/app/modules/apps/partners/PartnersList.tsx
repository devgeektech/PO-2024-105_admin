

import { CommonTable } from "../common/common-list/table/Table";
import { KTCard } from "../../../../_metronic/helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../common/common-list/components/pagination/Pagination";
import { setId } from "../../../../redux/features/shared/sharedSlice";
import { PartnerModal } from "./PartnerModal";
import './style.scss'
import { getPartners } from "../../../../redux/features/partner/_partnerAction";
import { partnersColumns } from "../common/common-list/table/columns/_partnerColumns";
import { PartnerDetailsModal } from "./PartnerDetailsModal";

const PartnerList = () => {
  const sharedActions = useSelector((state: any) => state.sharedActions);
  const dispatch: any = useDispatch();
  const data: any = useSelector((state: any) => state.partnerList?.data)||[];
  const totalRecord  = useSelector((state: any) => state.partnerList?.totalRecord);
  useEffect(() => {
    dispatch(setId('Partner'))
    dispatch(getPartners({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleClick = (page: number) => {
    dispatch(getPartners({ page: page, limit: 10 }));
  };  
  
  return (
    <>
      <KTCard>
        <CommonTable data={data} columns={partnersColumns} />
        {sharedActions.partnerDetailsModal && <PartnerModal />}
        {sharedActions.partnerShowDetailsModal && <PartnerDetailsModal /> }
        {totalRecord > 10 && <Pagination
          totalRecord={totalRecord}
          handleClick={handleClick}
        />}
      </KTCard>
    </>
  );
};

export { PartnerList };
