import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { CompaniesList } from "./CompaniesList";

const companyBreadcrumbs: Array<PageLink> = [
  {
    title: "Company Management",
    path: "/companies/list",
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

const CompanyPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={companyBreadcrumbs}>Company list</PageTitle>
              <CompaniesList/>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/companies/list" />} />
    </Routes>
  );
};

export default CompanyPage;
