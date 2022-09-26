import React from "react";
import { Outlet } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { Logo } from "../../shared/logo";
import "./ApplicationLayout.scss";

const ApplicationLayout: React.FC = () => {
  return (
    <div className="application-layout">
      <aside className="application-layout-aside">
        <div className="application-layout-aside__logo bg-light border-bottom">
          <Logo />
        </div>
        <div className="application-layout-aside__avatar">
          <Image
            roundedCircle
            className="application-layout-aside__avatar__img text-secondary"
            src="https://ui-avatars.com/api/?background=5f0ee1&color=fff"
            alt="user-avatar"
          />
          <span className="application-layout-aside__avatar__name text-primary">
            Johnny Depth
          </span>
        </div>
      </aside>
      <main className="application-layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default ApplicationLayout;
