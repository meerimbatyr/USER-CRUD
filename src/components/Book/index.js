import React from 'react';
import "./Book.css"
import { Button, Table } from "react-bootstrap";

function Book(props) {
    return (

        <div className='book'>
            <div>
                <h2>Title: {}</h2>
                <img src="https://www.imgacademy.com/sites/default/files/2022-07/img-homepage-meta.jpg" alt="" />

            </div>
            <div>
                <p><span>Author:</span> Lorem, ipsum dolor.</p>
                <p><span>Genre:</span> Lorem.</p>
                <p><span>Description:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, porro!</p>
                <Button variant="primary">
                  Update
                </Button>
            </div>
        

            {/* review component */}

            
        </div>
    );
}

export default Book;