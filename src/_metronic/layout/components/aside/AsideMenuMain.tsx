import EventIcon from "../../../../app/icons/EventIcon";
import PartnersIcon from "../../../../app/icons/PartnersIcon";
import { AsideMenuItem } from "./AsideMenuItem";

export function AsideMenuMain() {
  return (
    <>
      {/* <AsideMenuItem to="/users" icon={<PartnersIcon/>} title="Users" />

      <AsideMenuItem to="/events" icon={<EventIcon/>} title="Events" /> */}

      <AsideMenuItem to="/services" icon={<EventIcon/>} title="Services" />
      
      <AsideMenuItem to="/subServices" icon={<EventIcon />} title="Sub Services" />

      <AsideMenuItem to="/wellnessTypes" icon={<EventIcon />} title="Wellness Types" />
      
      <AsideMenuItem to="/partners" icon={<PartnersIcon />} title="Partners" />

      <AsideMenuItem to="/companies" icon={<EventIcon />} title="Companies" />

      {window.location.pathname === '/user/change-password' && <AsideMenuItem to="/user" icon={<PartnersIcon/>} title="Change Password" />}
    </>
  );
}
