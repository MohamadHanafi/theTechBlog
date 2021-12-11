import React, { useEffect, useState } from "react";
import { Button, Container, Table, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { deleteUser, getUsersList } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const UserListScreen = () => {
  const [role, setRole] = useState("");

  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.userList);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.userDelete);

  useEffect(() => {
    setRole("");
    dispatch(getUsersList());
  }, [dispatch, successDelete, role]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleUserRoleChange = async (role, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      if (window.confirm("Are you sure?")) {
        setRole(role);
        await axios.put(`/api/users/${id}`, { role }, config);
      } else {
        setRole(role);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderUserListTable = () => {
    return (
      <Table striped bordered hover responsive className="table-sm mt-3">
        <thead>
          <th>User</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {" "}
                  <div className="d-flex">
                    <Form.Select
                      aria-label="User's Role"
                      className="d-inline"
                      name="role"
                      size="sm"
                      onChange={(e) => {
                        handleUserRoleChange(e.target.value, user._id);
                      }}
                    >
                      <option value="" selected disabled hidden>
                        Select Role
                      </option>
                      <option value="admin">Admin</option>
                      <option value="publisher">Publisher</option>
                      <option value="user">User</option>
                    </Form.Select>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="mx-1"
                      onClick={() => deleteHandler(user._id)}
                    >
                      {loadingDelete
                        ? "loading..."
                        : errorDelete
                        ? "error"
                        : "Delete"}
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  return (
    <Container className="mt-3">
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : users ? (
        renderUserListTable()
      ) : (
        <></>
      )}
    </Container>
  );
};

export default UserListScreen;
