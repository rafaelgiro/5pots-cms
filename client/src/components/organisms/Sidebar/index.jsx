import React from "react";
import ServerStatus from "../../molecules/ServerStatus";
import SkinSlideshow from "../../molecules/SkinSlideshow";
import BCOverview from "../../molecules/BalanceChangesOverview";
import SidebarSocialMedia from "../../molecules/SidebarSocialMedia";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <ServerStatus />
      <SkinSlideshow />
      <BCOverview />
      <SidebarSocialMedia />
    </section>
  );
};

export default Sidebar;
