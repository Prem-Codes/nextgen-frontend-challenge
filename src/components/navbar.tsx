import React from "react";
import style from "./navbar.module.scss";

export const NavBar = () => {
  return (
    <div className={style.navHeader}>
      <label style={{ fontSize: "xx-large", color: "white" }}>Hello!</label>
    </div>
  );
};
