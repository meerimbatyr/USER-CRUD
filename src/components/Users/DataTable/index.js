import { useContext, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalState";
import "./books.css";

const DataTable = ({
  value,
  users,
  deleteUser,
  setModal,
  setUpdateUser,
  filteredUsers,
}) => {
  const { isSubmitted, setIsSubmitted } = useContext(GlobalContext);
  const handleClick = (user) => {
    setModal({ name: "Update User", active: true });
    setUpdateUser(user);
  };

  if (value.length && !filteredUsers.length) {
    return <div className="text-center fs-1">No records found</div>;
  }

  return (
    <Table striped bordered hover className="text-center">
      <thead className="bg-dark text-light">
        <tr>
          <th>Avatar</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Birth date</th>
          <th>Books</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {(filteredUsers.length ? filteredUsers : users).map((user) => (
          <tr key={user.id}>
            <td className="field-avatar">
              <img
                style={{ width: "100px" }}
                src={user.avatar}
                alt={user.firstname}
              />
            </td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.birthdate.split("T")[0]}</td>
            <td>
              <Link to={`/books/${user.id}`}>View books</Link>
            </td>
            <td>
              <Button onClick={() => handleClick(user)} variant="warning">
                Update
              </Button>
              <Button onClick={() => deleteUser(user.id)} variant="danger">
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
