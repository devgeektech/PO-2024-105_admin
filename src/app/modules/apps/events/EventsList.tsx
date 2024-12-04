

import { CommonTable } from "../common/common-list/table/Table";
import { KTCard } from "../../../../_metronic/helpers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../common/common-list/components/pagination/Pagination";
import { setId } from "../../../../redux/features/shared/sharedSlice";
import { EventModal } from "./EventModal";
import './style.scss';
import { UserListHeader } from "../common/common-list/components/header/UserListHeader";
import { getEvents } from "../../../../redux/features/event/_eventAction";
import { eventsColumns } from "../common/common-list/table/columns/_eventColumns";

const EventList = () => {
  const sharedActions = useSelector((state: any) => state.sharedActions);
  const dispatch: any = useDispatch();
  const data: any = useSelector((state: any) => state.eventList?.data)||[];
  const totalRecord  = useSelector((state: any) => state.eventList?.totalRecord);

  useEffect(() => {
    dispatch(setId('Event'))
    dispatch(getEvents({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleClick = (page: number) => {
    dispatch(getEvents({ page: page, limit: 10 }));
  };


  return (
    <>
      <KTCard>
        <UserListHeader />
        <CommonTable data={data} columns={eventsColumns} />
        {sharedActions.eventDetailsModal && <EventModal />}
        {totalRecord > 10 && <Pagination
          totalRecord={totalRecord}
          handleClick={handleClick}
        />}
      </KTCard>
    </>
  );
};

export { EventList };
