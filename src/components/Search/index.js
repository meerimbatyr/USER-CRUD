import { Form } from "react-bootstrap";

const Search = ({ search}) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-start">Search for user</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name..."
          onChange={(e) => search(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default Search;
