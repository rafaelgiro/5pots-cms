import React from "react";

import PostFeatured from "../../organisms/PostFeatured";
import StoriesCards from "../../organisms/StoriesCards";
import PostList from "../../organisms/PostList";
import Sidebar from "../../organisms/Sidebar";
import Footer from "../../organisms/Footer";

const renderHome = () => {
  if (window.innerWidth < 900) {
    return (
      <div className="homepage--mobile">
        <p>Hey! A 5pots não está pronta no mobile ainda >:(</p>
        <p>Acesse o site pelo seu computador que já temos coisa por lá.</p>
        <p>
          Entre no <a href="https://discord.gg/9TmwGMs">nosso Discord</a> se
          quiser ajudar no desenvolvimento :D
        </p>
      </div>
    );
  } else {
    return (
      <div className="homepage">
        <PostFeatured />
        <StoriesCards />
        <div className="main-content">
          <Sidebar />
          <PostList />
        </div>
        <Footer />
      </div>
    );
  }
};

const Homepage = () => {
  return <>{renderHome()}</>;
};

export default Homepage;
