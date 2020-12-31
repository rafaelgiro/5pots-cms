import ServerStatus from "../../molecules/ServerStatus";
import SkinSlideshow from "../../molecules/SkinSlideshow";
import BCOverview from "../../molecules/BalanceChangesOverview";
import SidebarSocialMedia from "./Social";

import styles from "./styles.module.scss";

const Sidebar = () => {
  return (
    <section className={styles.sidebar}>
      <ServerStatus />
      <SkinSlideshow />
      <BCOverview />
      <SidebarSocialMedia />
    </section>
  );
};

export default Sidebar;
