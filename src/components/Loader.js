import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  const style = {
    width: "150px",
    height: "150px",
    margin: "auto",
    display: "block",
  };
  return (
    <Spinner animation="grow" variant="primary" role="status" style={style}>
      <span>Loading ...</span>
    </Spinner>
  );
};

export default Loader;
