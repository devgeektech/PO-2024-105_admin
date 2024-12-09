import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { SubServicesList } from "./SubServicesList";

const eventBreadcrumbs: Array<PageLink> = [
  {
    title: "Subservices Management",
    path: "/subServices/list",
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

const SubServicesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={eventBreadcrumbs}>Sub Services list</PageTitle>
              <SubServicesList/>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/subServices/list" />} />
    </Routes>
  );
};

export default SubServicesPage;
