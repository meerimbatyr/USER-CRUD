import { Form } from "react-bootstrap";
import debounce from "lodash.debounce";
import { useCallback } from "react";

const Search = ({ search }) => {
  const handleSearch = (e) => {
    search(e.target.value);
  };
  const debouncedChangeHandler = useCallback(debounce(handleSearch, 1000), []);
  return (
    <Form className="my-3">
      <Form.Group
        style={{ width: "50vw" }}
        className="mb-3  d-flex justify-content-between align-items-center"
        controlId="user"
      >
        <Form.Label className="text-start fs-3" style={{ width: "50%" }}>
          Search for user
        </Form.Label>
        <Form.Control
          className="py-2 fs-5"
          name="user"
          type="text"
          placeholder="Enter first name, last name or email..."
          onChange={debouncedChangeHandler}
        />
      </Form.Group>
    </Form>
  );
};

export default Search;
