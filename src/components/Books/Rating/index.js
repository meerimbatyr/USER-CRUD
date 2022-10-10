import { FaStar } from "react-icons/fa";
import React from "react";
import { useState } from "react";
import "./rating.css";
import { Link } from "react-router-dom";

const Rating = (props) => {
  const [rating, setRating] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [dropDown, setDropDown] = useState(false);

  const showDropDown = () => {
    setDropDown(true);
  };
  const hideDropDown = () => {
    setDropDown(false);
  };
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
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
      {dropDown ? (
        <div className="review" onMouseOver={showDropDown}>
          <Link to={`/reviews/`}>
            <p>Leave a review...</p>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Rating;
