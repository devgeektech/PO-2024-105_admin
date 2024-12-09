import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { WellnessTypeList } from "./WellnessTypesList";

const eventBreadcrumbs: Array<PageLink> = [
  {
    title: "Event Management",
    path: "/wellnessTypes/list",
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

const  WellnessTypesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={eventBreadcrumbs}>Event list</PageTitle>
              <WellnessTypeList/>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/wellnessTypes/list" />} />
    </Routes>
  );
};

export default WellnessTypesPage;
