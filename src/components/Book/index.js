import React from 'react';
import "./Book.css"
import { Button, Table } from "react-bootstrap";

function Book(props) {

    
  

    return (

        <div className='book'>
            <div>
                <h2>Title: {}</h2>
                <img src={""} alt="" />

            </div>
            <div>
                <p><span>Author:</span> {}</p>
                <p><span>Genre:</span> {}</p>
                <p><span>Description:</span>{}</p>
                <Button variant="primary">
                  Update
                </Button>
            </div>
        

            {/* review component */}

            
        </div>
    );
}

export default Book;