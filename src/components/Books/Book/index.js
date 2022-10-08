import React from "react";
import "./Book.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Book(props) {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  return (
    <section className="book">
      <header>
        <h2>Title: {state.title}</h2>
      </header>
      <div className="book-info">
        <img src={state.cover} alt={state.title} />
        <div>
          <p>
            <strong>Author:</strong> {state.author}
          </p>
          <p>
            <strong>Genre:</strong> {state.genre}
          </p>
          <p>
            <strong>Edition:</strong> {state.edition}
          </p>
          <p>
            <strong>ISBN:</strong> {state.isbn}
          </p>
          <p>
            <strong>Description:</strong> {state.description}
          </p>

          <Button
            variant="secondary"
            className="btn btn-lg"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <Button variant="primary btn-lg">Update</Button>
        </div>
      </div>
    </section>
  );
}

export default Book;
