import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import {FaStar} from 'react-icons/fa'

function New(props){

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  

  return(
    <>
      {[...Array(5)].map((star,index)=>{
        const currentRating = index+1;
        return(
          <label>
            <input
            type="ratio"
            name="rating"
            onClick={()=>setRating(currentRating)}
            />
        <FaStar 
        className="star" 
        size={50}
        color={currentRating<=(hover||rating)?"#ffc107":"#e4e5e9"}
        onMouseEnter={()=>setHover(currentRating)}
        onMouseLeave={()=>setHover(null)}
        />
        </label>
        )
      })}
      <h5>Your rating is {rating}</h5>
    </>
  )
}

export default New;