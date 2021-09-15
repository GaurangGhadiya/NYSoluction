import React from "react";
import NotFound from "../assets/404.svg";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

const NotFoundPage = () => {
  let history = useHistory();

  return (
    <div className="d-flex justify-content-center">
      <div>
        <img src={NotFound} alt="notFound" />
        <br />
        <Button
          type="primary"
          onClick={() => history.push("/")}
          className="m-auto mt-5"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
