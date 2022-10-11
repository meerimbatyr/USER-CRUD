import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";

const UpdateBook = ({ modal, setModal, id, book, setBook, updateBook }) => {

  // const initialData = {
  //   id: book.id,
  //   title: book.title,
  //   author: book.author,
  //   genre: book.genre,
  //   cover: book.cover,
  //   description: book.description,
  //   isbn: book.isbn,
  //   edititon: book.edition,
  // };
  
  // const [book, setBook] = useState(initialData);




  const onInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.isbn) return;
    updateBook(id, book)
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{modal.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              onChange={onInputChange}
              defaultValue={book.title}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Author"
              name="author"
              onChange={onInputChange}
              defaultValue={book.author}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Genre"
              name="genre"
              onChange={onInputChange}
              defaultValue={book.genre}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cover URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cover URL"
              name="cover"
              onChange={onInputChange}
              defaultValue={book.cover}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              name="description"
              onChange={onInputChange}
              defaultValue={book.description}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Edition</Form.Label>
            <Form.Control
              type="number"
              placeholder="Edition"
              name="edition"
              onChange={onInputChange}
              defaultValue={book.edition}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="number"
              placeholder="ISBN"
              name="isbn"
              onChange={onInputChange}
              defaultValue={book.isbn}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModal({ active: false })}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>
  );
};
export default UpdateBook;
