import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Link } from "react-router-dom";

function Header() {
  const { isSubmitted, setIsSubmitted, loggedinUser } =
    useContext(GlobalContext);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand href="/">React Users CRUD</Navbar.Brand>
          {isSubmitted && (
            <>
              <Navbar.Text>
                <p>
                  Signed in as:{" "}
                  <strong>
                    {loggedinUser.firstname} {loggedinUser.lastname}
                  </strong>
                </p>{" "}
                <Link to="/">
                  <Button variant="light" onClick={() => setIsSubmitted(false)}>
                    Logout
                  </Button>
                </Link>
              </Navbar.Text>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
