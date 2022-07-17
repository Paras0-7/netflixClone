import { useEffect, useState } from "react";
import "./Nav.css";

export const Nav = function () {
  const [show, handleShow] = useState(false);
  useEffect(function () {
    window.addEventListener("scroll", function () {
      if (this.window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });

    // return () => {
    //   window.removeEventListener("scroll");
    // };
  }, []);
  return (
    <div className={`nav ${show && "show"}  `}>
      <img className="nav_logo" src="/netflix.png" alt="logo" />
      <img className="nav_avatar" src="/profile__logo.png" alt="profile" />
    </div>
  );
};
