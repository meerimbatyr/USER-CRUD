import { Button, Table, Modal } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../../Loader";
import UpdateBook from "../UpdateBook";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import CreateBook from "../CreateBook";
import { GlobalContext } from "../../../context/GlobalState";

const DataTableBooks = (props) => {
  const { loggedinUser } = useContext(GlobalContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ name: "", active: false });
  const [book, setBook] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  console.log(state);

  const handleBook = (book) => {
    setModal({ name: "Update Book", active: true });
    setBook(book);
  };

  const fetchbooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://6300279d34344b643105731e.mockapi.io/api/v1/users/${id}/books`
      );
      // console.log(res.data);
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const createBook = async (book) => {
    setLoading(true);
    setModal({ active: false });
    try {
      const res = await axios.post(
        `https://6300279d34344b643105731e.mockapi.io/api/v1/users/${id}/books`,
        book
      );
      console.log(res);
      setBooks([...books, res.data]);
    } catch (err) {
      console.log("Something went wrong with posting book", err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchbooks();
  }, []);

  const deleteBook = async (bookID) => {
    setLoading(true);

    try {
      await axios.delete(
        `https://6300279d34344b643105731e.mockapi.io/api/v1/users/${id}/books/${bookID}`
      );
      const filteredBooks = books.filter((book) => book.id !== bookID);
      setBooks(filteredBooks);
    } catch {
      console.log("some error with deleting a book");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const updateBook = async (userID, book) => {
    setModal({ active: false });
    setLoading(true);
    try {
      const res = await axios.put(
        `https://6300279d34344b643105731e.mockapi.io/api/v1/users/${userID}/books/${book.id}`,
        book
      );
      fetchbooks();
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        className="btn my-3 float-start mx-5"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>

      {((loggedinUser.firstname === "Meerim" &&
        loggedinUser.lastname === "Batyrkanova") ||
        loggedinUser.id === book.id) && (
        <Button
          variant="primary"
          className="btn my-3 float-start mx-5"
          onClick={() => setModal({ name: "Create Book", active: true })}
        >
          Create book
        </Button>
      )}

      {loading ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead className="bg-dark text-light">
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.length ? (
              books.map((book) => (
                <tr key={book.id}>
                  <td className="field-avatar">
                    <img
                      style={{ width: "100px", height: "auto" }}
                      src={book.cover}
                      alt={book.title}
                    />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>

                  <td>{book.isbn}</td>
                  <td>
                    {" "}
                    <Link to={`/books/details/${book.id}`} state={book}>
                      View details
                    </Link>
                  </td>

                  {((loggedinUser.firstname === "Meerim" &&
                    loggedinUser.lastname === "Batyrkanova") ||
                    (loggedinUser.firtsname === state.firstname &&
                      loggedinUser.lastsname === state.lastname)) && (
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleBook(book)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteBook(book.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Record Found!</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
      {modal.active && (
        <Modal show={modal.active} onHide={() => setModal({ active: false })}>
          {modal.name === "Create Book" ? (
            <CreateBook
              modal={modal}
              setModal={setModal}
              createBook={createBook}
            />
          ) : (
            <UpdateBook
              modal={modal}
              setModal={setModal}
              id={id}
              book={book}
              setBook={setBook}
              updateBook={updateBook}
            />
          )}
        </Modal>
      )}
    </>
  );
};
export default DataTableBooks;
