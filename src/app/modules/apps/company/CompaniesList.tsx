

import { CommonTable } from "../common/common-list/table/Table";
import { KTCard } from "../../../../_metronic/helpers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../common/common-list/components/pagination/Pagination";
import { setId } from "../../../../redux/features/shared/sharedSlice";
import { CompanyModal } from "./CompanyModal";
import './style.scss';
import { UserListHeader } from "../common/common-list/components/header/UserListHeader";
import { getServices } from "../../../../redux/features/service/_serviceAction";
import { servicesColumns } from "../common/common-list/table/columns/_serviceColumns";
import { getCompanies } from "../../../../redux/features/company/_companyAction";
import { companyColumns } from "../common/common-list/table/columns/_companyColumns";

const CompaniesList = () => {
  const sharedActions = useSelector((state: any) => state.sharedActions);
  const dispatch: any = useDispatch();
  const data: any = useSelector((state: any) => state.companyList?.data)||[];
  const totalRecord  = useSelector((state: any) => state.serviceList?.totalRecord);

  useEffect(() => {
    dispatch(setId('Company'))
    dispatch(getCompanies({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleClick = (page: number) => {
    dispatch(getCompanies({ page: page, limit: 10 }));
  };


  return (
    <>
      <KTCard>
        <UserListHeader />
        <CommonTable data={data} columns={companyColumns} />
        {sharedActions.companyModal && <CompanyModal />}
        {totalRecord > 10 && <Pagination
          totalRecord={totalRecord}
          handleClick={handleClick}
        />}
      </KTCard>
    </>
  );
};

export { CompaniesList };
