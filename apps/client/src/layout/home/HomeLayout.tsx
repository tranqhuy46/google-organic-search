import React from "react";
import { Outlet } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { Logo } from "../../shared/logo";
import "./HomeLayout.scss";

const HomeLayout: React.FC = () => {
  return (
    <div className="home-layout">
      <aside className="home-layout-aside">
        <div className="home-layout-aside__logo bg-light border-bottom">
          <Logo />
        </div>
        <div className="home-layout-aside__avatar">
          <Image
            roundedCircle
            className="home-layout-aside__avatar__img text-secondary"
            src="https://ui-avatars.com/api/?background=5f0ee1&color=fff"
            alt="user-avatar"
          />
          <span className="home-layout-aside__avatar__name text-primary">
            Johnny Depth
          </span>
        </div>
      </aside>
      <main className="home-layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
