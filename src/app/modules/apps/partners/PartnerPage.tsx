import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { PartnerList } from "./PartnersList";
import { ChangePasswordWrapper } from "../../changePassword/ChangePasswordWrapper";

const partnerBreadcrumbs: Array<PageLink> = [
  {
    title: "Partner Management",
    path: "/partners/list",
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

const PartnerPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="list"
          element={
            <>
              <PageTitle breadcrumbs={partnerBreadcrumbs}>Partner list</PageTitle>
              <PartnerList/>
            </>
          }
        />
        <Route path="change-password" element={<ChangePasswordWrapper />} />
      </Route>
      <Route index element={<Navigate to="/partners/list" />} />
    </Routes>
  );
};

export default PartnerPage;
