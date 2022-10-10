import React from "react";
import { FormGroup, Label, Input, Form, Modal } from "react-bootstrap";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const Review = ({ props }) => {
  const [review, setReview] = useState("");
  const handleInput = (e) => {
    e.preventDefault();
    setReview(e.target.value);
  };
  return (
    <>
      <Form>
        <div className="container">
          <h1>Reviews</h1>
          <input type="text" />
          <Button onClick={handleInput}>Submit</Button>
        </div>
        <div>
          <p>{review}</p>
        </div>
      </Form>
    </>
  );
};

export default Review;
