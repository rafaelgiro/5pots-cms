import React from "react";
import { FaGithub } from "react-icons/fa";

import Logo from "../../atoms/Logo";
import Typography from "../../atoms/Typography";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo-container">
        <Logo className="footer__logo" />
        <Typography className="footer__5pots" component="p" variant="h1">
          5POTS
        </Typography>
      </div>
      <div className="footer__links">
        <a href="https://git.io/5pots">
          <Typography className="footer__link" component="p" variant="p">
            A 5Pots é open-source!
          </Typography>
          <Typography className="footer__link" component="p" variant="p">
            https://git.io/5pots <FaGithub />
          </Typography>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
