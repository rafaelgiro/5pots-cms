import React from "react";

import { MdArrowDropDown } from "react-icons/md";
import Typography from "../../atoms/Typography";

const StoriesController = () => {
  return (
    <div className="stories__controller">
      <div>
        <Typography
          className="stories__controller__sub-title"
          component="p"
          variant="p"
        >
          Últimas
        </Typography>
        <Typography
          className="stories__controller__title"
          component="p"
          variant="p"
        >
          Notícias <MdArrowDropDown />
        </Typography>
      </div>
      <Typography
        className="stories__controller__desc"
        component="p"
        variant="p"
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. A similique,
        odit sit explicabo tempora inventore asperiores non molestias mollitia.
      </Typography>
    </div>
  );
};

export default StoriesController;
