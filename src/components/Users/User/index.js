import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import CreateUser from "../CreateUser";
import DataTable from "../DataTable";
import Loader from "../../Loader";
import Pagination1 from "../../Pagination";
import Search from "../../Search";
import UpdateUser from "../UpdateUser";
import InputLoadingSpiner from "../../Input-loader";

import { GlobalContext } from "../../../context/GlobalState";

const User = () => {
  const {
    loggedinUser,
    users,
    setUsers,
    loading,
    setLoading,
    fetchUsers,
    isSubmitted,
  } = useContext(GlobalContext);

  console.log(isSubmitted);

  // Local State

  const [user, setUser] = useState("");
  const [value, setValue] = useState("");
  const [inputLoading, setInputLoading] = useState(false);
  const [modal, setModal] = useState({ name: "", active: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Constants
  const itemPerPage = 10;
  const maxPages = Math.ceil(users.length / itemPerPage);
  const indexOfLasPost = currentPage * itemPerPage;
  const indexOfFirst = indexOfLasPost - itemPerPage;
  const totalUsers = filteredUsers.length ? filteredUsers.length : users.length;
  const currentUsers = filteredUsers.length
    ? filteredUsers.slice(indexOfFirst, indexOfLasPost)
    : users.slice(indexOfFirst, indexOfLasPost);

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
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const deleteUser = async (id) => {
    setModal({ active: false });
    setLoading(true);

    try {
      await axios.delete(
        `https://6300279d34344b643105731e.mockapi.io/api/v1/users/${id}`
      );
      const filterUsers = users.filter((user) => user.id !== id);
      setUsers(filterUsers);
    } catch {
      console.log("some error with deleting");
    } finally {
      setLoading(false);
    }
  };

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

  const search = (searchValue) => {
    setInputLoading(true);
    setCurrentPage(1);
    setValue(searchValue);
    setFilteredUsers([]);
    const keys = ["firstname", "lastname", "email"];
    if (searchValue.length > 0) {
      let filteredData = [];
      filteredData = users.filter((user) => {
        return keys.some((key) =>
          user[key].toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      filteredData.length
        ? setFilteredUsers(filteredData)
        : setFilteredUsers([]);
    }
    setTimeout(() => {
      setInputLoading(false);
    }, 400);
  };

  const pagination = (pageNumber) => {
    setValue("");
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      {loading ? (
        <div className="mx-auto fs-3" style={{ width: "80px" }}>
          <Loader />
        </div>
      ) : (
        <>
          <Row className="mb-3">
            <Col className="col-sm-9 col-md-6 col-lg-4 ">
              <Search setValue={setValue} search={search} />
              {inputLoading && <InputLoadingSpiner />}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="col-md-6 text-start">
              <Pagination1
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                maxPages={maxPages}
                pagination={pagination}
                totalUsers={totalUsers}
                itemPerPage={itemPerPage}
              />
            </Col>

            {(loggedinUser.firstname === "Meerim") &
              (loggedinUser.lastname === "Batyrkanova") && (
              <Col className="text-end">
                <Button
                  variant="success"
                  onClick={() =>
                    setModal({ name: "Create User", active: true })
                  }
                >
                  Create New User
                </Button>
              </Col>
            )}
          </Row>
          <DataTable
            users={currentUsers}
            filteredUsers={filteredUsers}
            deleteUser={deleteUser}
            setModal={setModal}
            setUpdateUser={setUpdateUser}
            value={value}
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
