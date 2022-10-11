import React, { useState, useEffect } from "react";
import "./Book.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Rating from "../Rating";
import Review from "../Reviews";
import axios from "axios";
import Loader from "../../Loader";

function Book(props) {

  const [loading, setLoading] = useState([])
  const [reviews, setReviews] = useState([])
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

            <Button variant="primary btn-lg">Update</Button>
          </div>
        </div>
      </section>
            <div>
              <Rating book={state} fetchReviews={fetchReviews}/>
            </div>
            <div className="review-section">
              <h2>Reviews: </h2>
              {reviews.map((el) => <Review el = {el} key={el.id}/> )}
             </div>
             
            
    </div>
  );
}

export default Book;
