import React from "react";
import "./DarkMode.css";
import sun from "../../img/sun.png";
import moon from "../../img/moon.png";

const DarkMode = () => {
  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(darkTheme);
    theme = darkTheme;
  }

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "dark");
      theme = darkTheme;
    }
  };

  return (
    <div className="container-darkMode">
      <button
        className={theme === "light" ? clickedClass : ""}
        id="darkMode"
        onClick={(e) => switchTheme(e)}
      ></button>
    </div>
  );
};

export default DarkMode;
