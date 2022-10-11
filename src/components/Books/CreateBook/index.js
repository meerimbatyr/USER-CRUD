import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";

const CreateBook = ({ modal, setModal, createBook }) => {
  const [validated, setValidated] = useState(false);
  const initialData = {
    id: null,
    title: "",
    author: "",
    genre: "",
    cover: "",
    description: "",
    isbn: "",
    ediiton: "",
  };
  const [book, setBook] = useState(initialData);
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const onSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    //  if (
    //    !book.title ||
    //    book.isbn.length > 8 ||
    //    !book.edition ||
    //    !book.description
    //  )
    //    return;
    createBook(book);
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{modal.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Modal.Footer>
    </>
  );
};
export default CreateBook;