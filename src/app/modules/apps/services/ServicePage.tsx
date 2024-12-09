import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { ServiceList } from "./ServicesList";

const serviceBreadcrumbs: Array<PageLink> = [
  {
    title: "Service Management",
    path: "/services/list",
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

const ServicePage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={serviceBreadcrumbs}>Service list</PageTitle>
              <ServiceList/>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/services/list" />} />
    </Routes>
  );
};

export default ServicePage;
