import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import EventPage from "../modules/apps/events/EventPage";
import ServicePage from "../modules/apps/services/ServicePage";
import WellnessTypesPage from "../modules/apps/wellnessTypes/WellnessTypesPage";
import SubServicesPage from "../modules/apps/subServices/SubServicesPage";
import CompanyPage from "../modules/apps/company/CompanyPage";
import PartnerPage from "../modules/apps/partners/PartnerPage";
const PrivateRoutes = () => {
  const UserPage = lazy(() => import("../modules/apps/users/UserPage"));
  return (
    <>
      <Routes>
        <Route element={<MasterLayout />}>
          <Route path="auth/*" element={<Navigate to="/users" />} />
          <Route
            path="users/*"
            element={
              <SuspensedView>
                <UserPage />
              </SuspensedView>
            }
          />
          <Route path="*" element={<Navigate to="/users/list" />} />

          <Route
            path="wellnessTypes/*"
            element={
              <SuspensedView>
                <WellnessTypesPage />
              </SuspensedView>
            }
          />
          <Route path="*" element={<Navigate to="/wellnessTypes/list" />} />

          <Route path="*" element={<Navigate to="/users/list" />} />

          <Route
            path="subServices/*"
            element={
              <SuspensedView>
                <SubServicesPage />
              </SuspensedView>
            }
          />
          <Route path="*" element={<Navigate to="/subServices/list" />} />

          <Route
            path="events/*"
            element={
              <SuspensedView>
                <EventPage />
              </SuspensedView>
            }
          />
          <Route path="*" element={<Navigate to="/events/list" />} />

          <Route
            path="services/*"
            element={
              <SuspensedView>
                <ServicePage />
              </SuspensedView>
            }
          />
          <Route path="*" element={<Navigate to="/services/list" />} />

          <Route
            path="companies/*"
            element={
              <SuspensedView>
                <CompanyPage />
              </SuspensedView>
            }
          />
          <Route path="*" element={<Navigate to="/companies/list" />} />

          <Route
            path="partners/*"
            element={
              <SuspensedView>
                <PartnerPage />
              </SuspensedView>
            }
          />
          <Route path="*" element={<Navigate to="/partners/list" />} />

        </Route>
      </Routes>
    </>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
