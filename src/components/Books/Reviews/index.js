import React from "react";
import "./review.css";



const Review = ({ el }) => {
 
  return (
    <>
<section className="review">
        <div className="review-info">
          <div className="review-image">
            <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Translate_logo.max-500x500.png" alt={""} />
            <p>User Name</p>
          </div>
          <div className="rating-info">
           
           
            <p>
              <strong>Rating:</strong> {el.rating}
            </p>
            <p>
              <strong>Review:</strong> {el.text}
            </p>

       
          </div>
        </div>
        </section>
      
    </>
  );
};

export default Review;
