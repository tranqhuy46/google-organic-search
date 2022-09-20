import React from "react";
import { Outlet } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Logo } from "../../shared/logo";
import "./HomeLayout.scss";

const HomeLayout: React.FC = () => {
  return (
    <div className="home-layout">
      <aside className="home-layout__aside border-end">
        <div className="home-aside-logo bg-light border-bottom">
          <Logo />
        </div>
        <div className="home-aside-avatar">
          <Image
            className="home-aside-avatar__img text-secondary"
            roundedCircle
            src="https://ui-avatars.com/api/?background=5f0ee1&color=fff"
            alt="user-avatar"
          />
          <span className="home-aside-avatar__name text-primary">
            Johnny Depth
          </span>
        </div>
      </aside>
      <main className="home-layout__main">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
