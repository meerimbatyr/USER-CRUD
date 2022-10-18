import React, { useState, useEffect, useContext } from "react";
import "./Book.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Rating from "../Rating";
import Review from "../Reviews";
import axios from "axios";
import Loader from "../../Loader";
import ThankYouMsg from "../ThankYouMsg";

import { GlobalContext } from "../../../context/GlobalState";

function Book(props) {
  const { isSubmitted } = useContext(GlobalContext);
  const [loading, setLoading] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isReviewSent, setReviewSent] = useState(false);
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://6300279d34344b643105731e.mockapi.io/api/v1/users/${state.userId}/books/${state.id}/reviews`
      );
      // console.log(res.data);
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const deleteReview = async (reviewID) => {
    setLoading(true);

    try {
      await axios.delete(
        `https://6300279d34344b643105731e.mockapi.io/api/v1/users/${state.userId}/books/${state.id}/reviews/${reviewID}`
      );
      const filteredReviews = reviews.filter(
        (review) => review.id !== reviewID
      );
      setReviews(filteredReviews);
    } catch (err) {
      console.log("some error with deleting a book", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto fs-3" style={{ width: "80px" }}>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <section className="book">
        <header>
          <h2>Title: {state.title}</h2>
        </header>
        <div className="book-info">
          <div className="image">
            <img src={state.cover} alt={state.title} />
          </div>
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
          </div>
        </div>
      </section>
      <div>
        {isReviewSent ? (
          <ThankYouMsg />
        ) : (
          <Rating
            book={state}
            fetchReviews={fetchReviews}
            reviews={reviews}
            setReviews={setReviews}
            loading={loading}
            setLoading={setLoading}
            setReviewSent={setReviewSent}
          />
        )}
      </div>
      <div className="review-section">
        <h2>Reviews: </h2>
        {loading ? (
          <Loader />
        ) : (
          reviews.map((el) => (
            <Review
              el={el}
              key={el.id}
              deleteReview={deleteReview}
              loading={loading}
              setLoading={setLoading}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Book;
