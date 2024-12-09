import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import EventPage from "../modules/apps/events/EventPage";
import ServicePage from "../modules/apps/services/ServicePage";
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
