import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


const DataTable = ({
  value,
  users,
  deleteUser,
  setModal,
  setUpdateUser,
  filteredUsers,
}) => {
  const handleClick = (user) => {
    setModal({ name: "Update User", active: true });
    setUpdateUser(user);
  };
  return (
    <Table striped bordered hover>
      <thead className="bg-dark text-light">
        <tr>
          <th>Avatar</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Birth date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {value.length ? (
          filteredUsers.length ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="field-avatar">
                  <img
                    style={{ width: "100px" }}
                    src={user.avatar}
                    alt={user.firstname}
                  />
                </td>
                <td>
                  <Link to={`/books/${user.id}`} state={setModal}>
                    {user.firstname}
                  </Link>
                </td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.birthdate.split("T")[0]}</td>
                <td>
                  <Button onClick={() => handleClick(user)} variant="primary">
                    Update
                  </Button>
                  <Button onClick={() => deleteUser(user.id)} variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No records found</td>
            </tr>
          )
        ) : (
          users.map((user) => (
            <tr key={user.id}>
              <td className="field-avatar">
                <img
                  style={{ width: "100px" }}
                  src={user.avatar}
                  alt={user.firstname}
                />
              </td>
              <td>
                <Link to={`/books/${user.id}`} state={setModal}>
                  {user.firstname}
                </Link>
              </td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.birthdate.split("T")[0]}</td>
              <td>
                
                  <Button onClick={() => handleClick(user)} variant="primary">
                  Update
                </Button>
                <Button onClick={() => deleteUser(user.id)} variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default DataTable;
