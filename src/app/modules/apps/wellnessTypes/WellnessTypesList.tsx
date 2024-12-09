

import { CommonTable } from "../common/common-list/table/Table";
import { KTCard } from "../../../../_metronic/helpers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../common/common-list/components/pagination/Pagination";
import { setId } from "../../../../redux/features/shared/sharedSlice";
import { WellnessTypesModal } from "./WellnessTypesModal";
import './style.scss';
import { UserListHeader } from "../common/common-list/components/header/UserListHeader";
import { getEvents } from "../../../../redux/features/event/_eventAction";
import { eventsColumns } from "../common/common-list/table/columns/_eventColumns";
import { wellnessTypesColumns } from "../common/common-list/table/columns/_wellnessTypesColumns";
import { getWellnessTypes } from "../../../../redux/features/wellnessTypes/_wellnessTypesAction";
const WellnessTypeList = () => {
  const sharedActions = useSelector((state: any) => state.sharedActions);
  const dispatch: any = useDispatch();
  const data: any = useSelector((state: any) => state.wellnessTypesList?.data)||[];
  const totalRecord  = useSelector((state: any) => state.wellnessTypes?.totalRecord);
  
  useEffect(() => {
    dispatch(setId('WellnessTypes'))
    dispatch(getWellnessTypes({ page: 1, limit: 10 }))
  }, [dispatch]);

  const handleClick = (page: number) => {
    dispatch(getWellnessTypes({ page: page, limit: 10 }));
  };

  return (
    <>
      <KTCard>
        <UserListHeader />
        <CommonTable data={data} columns={wellnessTypesColumns} />
        {sharedActions.wellnessTypesModal && <WellnessTypesModal />}
        {totalRecord > 10 && <Pagination
          totalRecord={totalRecord}
          handleClick={handleClick}
        />}
      </KTCard>
    </>
  );
};

export { WellnessTypeList };
