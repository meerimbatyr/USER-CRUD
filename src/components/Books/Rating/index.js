import { FaStar } from "react-icons/fa";
import React from "react";
import { useState, useEffect, useRef } from "react";
import "./rating.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader";
import { nanoid } from "nanoid";

const Rating = ( {book, loading, setLoading, setReviews, reviews, setReviewSent} ) => {
  const [rating, setRating] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [text, setText] = useState('');
  const [review, setReview] = useState({})
  const ref = useRef()

  // useEffect(() => {
  //   console.log(rating, text)
  // },[text])

  const showDropDown = () => {
    setDropDown(true);
  };
  const hideDropDown = () => {
    setDropDown(false);
  };

  const onSubmit = () => {
    let newText = ref.current.value
    // let newRating = ref.current.value
    setReview({text: newText, rating: rating})
    postReview(review);
    setText("")
    setRating(null)
    setReviewSent(true)
    
  };


  useEffect(() => {
    setReview({text:text, rating:rating})

  },[text, rating])



const postReview = async (obj) => {
  setLoading(true);
  try {
    const res = await axios.post(
      `https://6300279d34344b643105731e.mockapi.io/api/v1/users/${book.userId}/books/${book.id}/reviews`,
      obj
    );
    console.log(res);
    setReviews([...reviews, obj])
  } catch (err) {
    console.log("Something went wrong with posting review", err.message);
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

}







  return (
    
     
      
        <div className="review" >

{[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
           
          <label key={nanoid()}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              key={nanoid()}
            />
            <FaStar
            key={nanoid()}
              size={25}
              color={
                ratingValue <= (hovered || rating) ? "darkorange" : "lightgrey"
              }
              className="star"
              onMouseEnter={() => setHovered(ratingValue)}
              onMouseLeave={() => setHovered(null)}
              onMouseOver={showDropDown}
              onMouseOut={hideDropDown}
            />
          </label>
          
        );
      })}
         
          <p>Leave a review...</p>
          <textarea ref={ref} value={text} onChange={(e) => setText(e.target.value)} placeholder="What's your feedback?" />
          <br />
          <button className="btn-submit" onClick={onSubmit}>Submit</button>
          
        </div>
    
  );
};

export default Rating;
