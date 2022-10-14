import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Search from "../Search";

function Header() {
  const { isSubmitted, setIsSubmitted } = useContext(GlobalContext);
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand href="/">React Users CRUD</Navbar.Brand>
          {isSubmitted && (
            <>
              <Navbar.Text>
                <p>
                  Signed in as: <strong>Admin</strong>
                </p>{" "}
                <Button variant="light" onClick={() => setIsSubmitted(false)}>
                  Logout
                </Button>
              </Navbar.Text>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
