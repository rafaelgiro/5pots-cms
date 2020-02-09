import React from "react";

import PostFeatured from "../../organisms/PostFeatured";
import StoriesCards from "../../organisms/StoriesCards";
import PostList from "../../organisms/PostList";
import Sidebar from "../../organisms/Sidebar";
import Footer from "../../organisms/Footer";


const renderHome = () => {
  return (
    <main className="homepage">
      <PostFeatured />
      <StoriesCards />
      <div className="main-content">
        <Sidebar />
        <PostList />
      </div>
      <Footer />
    </main>
  );
};

const Homepage = () => {
  return <>{renderHome()}</>;
};

export default Homepage;
