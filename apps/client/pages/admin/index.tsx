import { useContext } from "react";

import BateuNaPortaDaPortaErrada from "../404";

import AuthContext from "../../core/contexts/AuthContext";

import styles from "./styles.module.scss";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);

  if (user?.isAdmin)
    return (
      <div className={styles["admin-page"]}>
        Jandão não para de me morder meu Deus do céu
      </div>
    );

  return <BateuNaPortaDaPortaErrada />;
};

export default AdminPanel;
