import React, { ReactElement } from "react";
import style from "./navbar.module.scss";

export const NavBar = (): ReactElement => {
  return (
    <div className={style.navHeader}>
      <label style={{ fontSize: "xx-large", color: "white" }}>Hello!</label>
    </div>
  );
};
