import React from 'react';
import "./Book.css"
import { Button, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

function Book(props) {

    
    const { state } = useLocation();
    useEffect=(() => {
        console.log(state)


    },[])

    return (

        <div className='book'>
            <div>
                <h2>Title: {state.title}</h2>
                <img src={state.cover} alt="" />

            </div>
            <div>
                <p><span>Author:</span> {state.author}</p>
                <p><span>Genre:</span> {state.genre}</p>
                <p><span>Description:</span>{state.description}</p>
                <Button variant="primary">
                  Update
                </Button>
            </div>
        

            {/* review component */}

            
        </div>
    );
}

export default Book;