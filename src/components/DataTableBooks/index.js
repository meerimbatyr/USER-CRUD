import { Button, Table } from "react-bootstrap";
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";



const DataTableBooks = (props)=>{

 const [books, setBooks] = useState([]);
 const [loading, setLoading] = useState(false);

const {id} = useParams()

 const fetchbooks = async () => {
   setLoading(true);
    try {
      const res = await axios.get(
        `https://6300279d34344b643105731e.mockapi.io/api/v1/users/${id}/books`
      );
      setBooks(res.data);
      console.log(books)
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

    useEffect(() => {
    fetchbooks();

  }, []);

return(
    <>
     <Table striped bordered hover>
      <thead className="bg-dark text-light">
        <tr>
          <th>Cover</th>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Description</th>
          <th>ISBN</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {books.length ? (
          books.map((book) => (
            <tr key={book.userId}>
              <td className="field-avatar">
                <img
                  style={{ width: "100px" }}
                  src={book.cover}
                  alt={book.title}
                />
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.description}</td>
              <td>{book.isbn}</td>
              <td>
                <Button variant="primary">
                  Update
                </Button>
                <Button variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No Record Found!</td>
          </tr>
        )}
      </tbody>
    </Table>
    </>
)
}
export default DataTableBooks;