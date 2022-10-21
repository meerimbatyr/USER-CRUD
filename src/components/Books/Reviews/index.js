import React, { useContext } from "react";
import "./review.css";
import { FaStar } from "react-icons/fa";
import Loader from "../../Loader";
import { nanoid } from "nanoid";
import { GlobalContext } from "../../../context/GlobalState" 


const Review = ({ el, deleteReview, loading, setLoading }) => {

  const { loggedinUser } = useContext(GlobalContext);

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
            <img src={el.fromUser.avatar} alt="user-avatar" />
            <p>{el.fromUser.firstname + " " + el.fromUser.lastname }</p>
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
         {(loggedinUser.firstname === "Meerim" &&
        loggedinUser.lastname === "Batyrkanova") && <button onClick={() => deleteReview(el.id)} className='deleteBtn'>x</button> } 
        </section>
      
    </>
  );
};

export default Review;
