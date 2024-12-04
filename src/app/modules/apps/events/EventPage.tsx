import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { EventList } from "./EventsList";

const eventBreadcrumbs: Array<PageLink> = [
  {
    title: "Event Management",
    path: "/events/list",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const EventPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={eventBreadcrumbs}>Event list</PageTitle>
              <EventList/>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/events/list" />} />
    </Routes>
  );
};

export default EventPage;
