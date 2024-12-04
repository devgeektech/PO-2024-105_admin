import CalendarIcon from "../../../../app/icons/CalendarIcon";
import EventIcon from "../../../../app/icons/EventIcon";
import ForumIcon from "../../../../app/icons/ForumIcon";
import PartnersIcon from "../../../../app/icons/PartnersIcon";
import RoomIcon from "../../../../app/icons/RoomIcon";
import TaskIcon from "../../../../app/icons/TaskIcon";
import { AsideMenuItem } from "./AsideMenuItem";

export function AsideMenuMain() {
  return (
    <>
      <AsideMenuItem to="/users" icon={<PartnersIcon/>} title="Users" />

      <AsideMenuItem to="/events" icon={<EventIcon/>} title="Events" />
      
      {window.location.pathname === '/user/change-password' && <AsideMenuItem to="/user" icon={<PartnersIcon/>} title="Change Password" />}
    </>
  );
}
