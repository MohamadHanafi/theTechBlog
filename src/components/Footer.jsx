import React from "react";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-primary">
      <p>&copy; {new Date().getFullYear()} The Tech Blog</p>
    </footer>
  );
};

export default Footer;
