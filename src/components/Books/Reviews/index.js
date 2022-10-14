import React, { useState } from "react";
import "./review.css";
import { FaStar } from "react-icons/fa";
import Loader from "../../Loader";
import { nanoid } from "nanoid";



const Review = ({ el, deleteReview, loading, setLoading }) => {


  const helperFn =(num) => {
    const arr = []
    while (num > 0 ) {
    arr.push(1)
    num --;
}
    return arr
} 

  return (
    <>
<section className="review" key={el.id} >
        <div className="review-info">
          <div className="review-image">
            <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Translate_logo.max-500x500.png" alt={""} />
            <p>User Name</p>
          </div>
          <div className="rating-info">
           
           
            <p>
              <strong>Rating:</strong> {helperFn(el.rating).map(el => <FaStar color={"darkorange"} />) }
            </p>
            <p>
              <strong>Review:</strong> {el.text}
            </p>

       
          </div>
        </div>
          <button onClick={() => deleteReview(el.id)} className='deleteBtn'>x</button>
        </section>
      
    </>
  );
};

export default Review;
