import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import CreateUser from "../CreateUser";
import DataTable from "../DataTable";
import Loader from "../Loader";
import Pagination1 from "../Pagination";
import Search from "../Search";
import UpdateUser from "../UpdateUser";

const User = () => {
  // Local State
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ name: "", active: false });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);



  // Constants
  const itemPerPage = 10;
  const maxPages = Math.ceil(users.length / itemPerPage);

  // Fetching Users API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://6300279d34344b643105731e.mockapi.io/api/v1/users"
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const createUser = async (user) => {
    setModal({ active: false });
    setLoading(true);
    try {
      const res = await axios.post(
        "https://6300279d34344b643105731e.mockapi.io/api/v1/users",
        user
      );
      setUsers([...users, res.data]);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };
  

  const deleteUser = async (id) =>{
    setModal({ active: false });
    setLoading(true);

    try{
        await axios.delete(`https://6300279d34344b643105731e.mockapi.io/api/v1/users/${id}`)
        const filterUsers = users.filter((user) => user.id !== id)
        setUsers(filterUsers)
    }catch{
        console.log("some error with deleting")
    }finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
  }

  const setUpdateUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const updateUser = async (id, user) => {
    setModal({ active: false });
    setLoading(true);
    try {
      const res = await axios.put(
        `https://6300279d34344b643105731e.mockapi.io/api/v1/users/${id}`,
        user
      );
      fetchUsers();
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  const search = (users) => {
    const keys = ["firstname", "lastname", "email"];
    return users.filter((user) => {
      return keys.some((key) =>
        user[key].toLowerCase().includes(value.toLowerCase())
      );
    });
  };

  const paginatedUsers = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return users.slice(startIndex, endIndex);
  };



  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className="mb-3">
            <Col className="col-sm-9 col-md-6 col-lg-4 ">
              <Search setValue={setValue} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="col-md-6 text-start">
              <Pagination1
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                maxPages={maxPages}
              />
            </Col>
            <Col className="text-end">
              <Button
                onClick={() => setModal({ name: "Create User", active: true })}
              >
                Create New User
              </Button>
            </Col>
          </Row>
          <DataTable
            users={search(paginatedUsers())}
            deleteUser={deleteUser}
            setModal={setModal}
            setUpdateUser={setUpdateUser}
          />
        </>
      )}
      {modal.active && (
        <Modal show={modal.active} onHide={() => setModal({ active: false })}>
          {modal.name === "Create User" ? (
            <CreateUser
              modal={modal}
              createUser={createUser}
              setModal={setModal}
            />
          ) : (
            <UpdateUser
              modal={modal}
              updateUser={updateUser}
              setModal={setModal}
              user={user}
              setUser={setUser}
            />
          )}
        </Modal>
      )}
    </Container>
  );
};
export default User;
