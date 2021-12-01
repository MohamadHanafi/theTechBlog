import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import "./BackToTop.css";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  window.onscroll = () => {
    if (window.pageYOffset > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <Button
      variant="outline-primary"
      className="back-to-top"
      style={{ display: show ? "block" : "none" }}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      Back to Top <FontAwesomeIcon icon={faArrowUp} />
    </Button>
  );
};

export default BackToTop;
