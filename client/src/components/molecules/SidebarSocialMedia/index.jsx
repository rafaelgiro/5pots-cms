import React from "react";
import { FaTwitterSquare, FaFacebookSquare, FaDiscord } from "react-icons/fa";

import Typography from "../../atoms/Typography";

const SidebarSocialMedia = () => {
  return (
    <div className="sidebar-social">
      <Typography className="sidebar__title" component="h4" variant="h4">
        REDES SOCIAIS
      </Typography>
      <div className="sidebar-social__icons">
        <a href="https://www.facebook.com/5pots/">
          <FaFacebookSquare className="sidebar-social__icons--facebook" />
        </a>
        <a href="https://twitter.com/datFranky">
          <FaTwitterSquare className="sidebar-social__icons--twitter" />
        </a>
        <a href="https://discord.gg/W4uBUns">
          <FaDiscord className="sidebar-social__icons--discord" />
        </a>
      </div>
      <Typography className="sidebar-beta" component="p" variant="p">
        Me mandem sugestões do que mais colocar aqui na sidebar :D
      </Typography>
    </div>
  );
};

export default SidebarSocialMedia;
